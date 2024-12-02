import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import UserDashboard from "./user/dashboard/UserDashboard";
import AdminDashboard from "./AdminDashboard";
import UserDashboardMain from "./user/dashboard/UserDashboardMain";

const DashboardLayout = () => {
  const { user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const isAdminPath = location.pathname === "/dashboard/admin";
  const isUserPath = location.pathname === "/dashboard";

  return (
    <div className="container mx-auto flex flex-col md:flex-row gap-4 items-start justify-start">
      <header className="lg:w-1/5 sm:w-2/5 w-full border">
        {user.role === "admin" ? <AdminDashboard /> : <UserDashboard />}
      </header>
      <main className="p-8 bg-white w-full border mt-5">
        {isAdminPath && <h2>Admin Dashboard</h2>}
        {isUserPath && <UserDashboardMain />}
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
