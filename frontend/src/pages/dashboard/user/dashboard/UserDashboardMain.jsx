import { useSelector } from "react-redux";
import { useGetUserStatsQuery } from "../../../../redux/features/stats/statsApi";
import UserStats from "./UserStats";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UserDashboardMain = () => {
  const { user } = useSelector((state) => state.auth);
  const { data: stats, error, isLoading } = useGetUserStatsQuery(user?.email);

  const data = stats
    ? {
        labels: ["Total Payments", "Total Reviews", "Total Purchased Products"],
        datasets: [
          {
            label: "User Stats",
            data: [
              stats.totalPayments || 0,
              (stats.totalReviews || 0) * 100,
              (stats.totalPurchasedProducts || 0) * 100,
            ],
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      }
    : null;

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  if (isLoading)
    return (
      <div className="loader-container flex justify-center items-center h-screen w-full">
        <div className="loader"></div>
      </div>
    );

  if (error) return <div>Failed to load stats!</div>;

  if (!stats) return <div>No stats found!</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">User Dashboard</h1>
      <p className="text-gray-500">
        Hi, {user?.username}! Welcome to the user dashboard.
      </p>
      <UserStats stats={stats} />
      {data && <Bar data={data} options={options} />}
    </div>
  );
};

export default UserDashboardMain;
