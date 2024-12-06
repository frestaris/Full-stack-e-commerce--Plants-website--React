import { useSelector } from "react-redux";
import { useGetAdminStatsQuery } from "../../../../redux/features/stats/statsApi";
import AdminStats from "./AdminStats";
import AdminStatsChart from "./AdminStatsChart";

const AdminDashboardMain = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: stats, error, isLoading } = useGetAdminStatsQuery();

  if (isLoading)
    return (
      <div className="loader-container flex justify-center items-center h-screen w-full">
        <div className="loader"></div>
      </div>
    );
  if (!stats) return <div>No stats found!</div>;
  if (error) return <div>Failed to load stats!</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin Dashboard</h1>
      <p className="text-gray500">
        Hi, {user?.username}! Welcome to the admin dashboard.
      </p>
      <AdminStats stats={stats} />
      <AdminStatsChart stats={stats} />
    </div>
  );
};

export default AdminDashboardMain;
