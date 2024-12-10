import { useSelector } from "react-redux";
import { useGetOrdersByEmailQuery } from "../../../redux/features/orders/orderApi";
import { Link } from "react-router-dom";

const UserOrdersMain = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    data: orderdata,
    error,
    isLoading,
  } = useGetOrdersByEmailQuery(user?.email);

  const orders = orderdata?.orders || [];

  if (isLoading)
    return (
      <div className="loader-container flex justify-center items-center h-screen w-full">
        <div className="loader"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500">
        Something went wrong! Please try again later.
      </div>
    );

  if (orders.length === 0)
    return <div className="text-center text-gray-500">No orders yet!</div>;

  return (
    <section className="w-full mb-12 xl:mb-0 px-4 mx-auto">
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Your Orders
              </h3>
            </div>
          </div>
        </div>

        <div className="block w-full overflow-x-auto">
          <table className="items-center bg-transparent w-full border-collapse">
            <thead>
              <tr>
                <th className="px-6 bg-blue-50 text-blue-500 align-middle border border-solid border-blue-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  #
                </th>
                <th className="px-6 bg-blue-50 text-blue-500 align-middle border border-solid border-blue-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Order ID
                </th>
                <th className="px-6 bg-blue-50 text-blue-500 align-middle border border-solid border-blue-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Date
                </th>
                <th className="px-6 bg-blue-50 text-blue-500 align-middle border border-solid border-blue-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Status
                </th>
                <th className="px-6 bg-blue-50 text-blue-500 align-middle border border-solid border-blue-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  Total
                </th>
                <th className="px-6 bg-blue-50 text-blue-500 align-middle border border-solid border-blue-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                  View Order
                </th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blue-700">
                    {index + 1}
                  </th>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {order?.orderId || "N/A"}
                  </td>
                  <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    {order?.createdAt
                      ? new Date(order?.createdAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <span
                      className={`p-1 rounded ${
                        order?.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : order?.status === "pending"
                          ? "bg-red-100 text-red-700"
                          : order?.status === "processing"
                          ? "bg-yellow-100 text-yellow-600"
                          : order?.status === "shipped"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-indigo-100 text-indigo-600"
                      }`}
                    >
                      {order?.status}
                    </span>
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    ${order?.amount.toFixed(2) || "N/A"}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                    <Link
                      to={`/orders/${order?.orderId}`}
                      className="underline hover:text-green-700"
                    >
                      View order
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default UserOrdersMain;
