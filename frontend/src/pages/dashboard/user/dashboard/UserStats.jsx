import { Link } from "react-router-dom";

const UserStats = ({ stats }) => {
  return (
    <div className="my-5 space-y-4">
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1">
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 min-h-[100px] flex flex-col justify-between">
          <h2 className="text-xl font-semibold mb-2">Total Payments</h2>
          <p className="text-2xl font-bold">${stats?.totalPayments}</p>
        </div>
        <Link to="/dashboard/reviews">
          <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:scale-105 transition-all duration-200 min-h-[100px] flex flex-col justify-between">
            <h2 className="text-xl font-semibold mb-2">Total Reviews</h2>
            <p className="text-2xl font-bold">{stats?.totalReviews}</p>
          </div>
        </Link>
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200 hover:scale-105 transition-all duration-200 min-h-[100px] flex flex-col justify-between">
          <h2 className="text-xl font-semibold mb-2">Total Products</h2>
          <p className="text-2xl font-bold">{stats?.totalPurchasedProducts}</p>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
