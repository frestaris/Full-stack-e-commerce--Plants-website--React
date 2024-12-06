import { useState } from "react";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
} from "../../../../redux/features/orders/orderApi";
import moment from "moment";
import { Link } from "react-router-dom";
import UpdateOrderModal from "./UpdateOrderModal";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

const ManageOrders = () => {
  const {
    data: ordersData,
    error,
    isLoading,
    refetch,
  } = useGetAllOrdersQuery();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteOrder] = useDeleteOrderMutation();
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 12;

  const orders = ordersData?.orders || [];

  // Pagination logic
  // Pagination logic
  const totalOrders = orders?.length || 0;
  const totalPages = Math.ceil(totalOrders / ordersPerPage);
  const startOrder = (currentPage - 1) * ordersPerPage + 1;
  const endOrder = Math.min(startOrder + ordersPerPage - 1, totalOrders);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Slice orders for the current page
  const currentPageOrders = orders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const handleEditOrder = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setIsModalOpen(false);
    refetch();
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await deleteOrder(orderId).unwrap();
      alert("Order deleted successfully!");
      refetch();
    } catch (error) {
      console.error("Failed to delete order", error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "processing":
        return "bg-blue-500";
      case "shipped":
        return "bg-green-500";
      case "completed":
        return "bg-gray-500";
      default:
        return "bg-gray-300";
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong! Please try again later.</div>;

  return (
    <section className="w-full mb-12 xl:mb-0 px-4 mx-auto">
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <div className="rounded-t mb-0 px-4 py-3 border-0">
          <div className="flex flex-wrap items-center">
            <div className="relative w-full px-4 max-w-full flex-grow flex-1">
              <h3 className="font-semibold text-base text-blueGray-700">
                Manage Orders
              </h3>
            </div>
          </div>
          <h3 className="my-4 text-sm">
            Showing {startOrder} to {endOrder} of {totalOrders}
          </h3>
        </div>

        <div className="block w-full overflow-x-auto">
          <table className="items-center bg-transparent w-full border-collapse">
            <thead>
              <tr>
                <th className="px-6 bg-blue-50 text-blue-500 py-3 text-xs uppercase border border-blue-100 font-semibold text-left">
                  Order ID
                </th>
                <th className="px-6 bg-blue-50 text-blue-500 py-3 text-xs uppercase border border-blue-100 font-semibold text-left">
                  Customer
                </th>
                <th className="px-6 bg-blue-50 text-blue-500 py-3 text-xs uppercase border border-blue-100 font-semibold text-left">
                  Status
                </th>
                <th className="px-6 bg-blue-50 text-blue-500 py-3 text-xs uppercase border border-blue-100 font-semibold text-left">
                  Date
                </th>
                <th className="px-6 bg-blue-50 text-blue-500 py-3 text-xs uppercase border border-blue-100 font-semibold text-left">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPageOrders.map((order) => (
                <tr key={order._id} className="border-b border-gray-200">
                  <th className="border-t-0 px-6 py-4 text-left text-blue-700">
                    {order?.orderId || "N/A"}
                  </th>
                  <td className="border-t-0 px-6 py-4">
                    {order?.email || "N/A"}
                  </td>
                  <td className="border-t-0 px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 text-xs text-white rounded-full ${getStatusColor(
                        order?.status
                      )}`}
                    >
                      {order?.status || "Unknown"}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {moment(order?.updatedAt).format("D MMMM, YYYY") || "N/A"}
                  </td>
                  <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-sm whitespace-nowrap p-4 items-center space-x-2">
                    <Link
                      to={`/orders/${order?.orderId}`}
                      className="text-blue-500 hover:underline"
                    >
                      View
                    </Link>
                    <button
                      className="text-green-500 hover:underline"
                      onClick={() => handleEditOrder(order)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDeleteOrder(order?._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isModalOpen && selectedOrder && (
            <UpdateOrderModal
              order={selectedOrder}
              isOpen={isModalOpen}
              onClose={handleCloseModal}
            />
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <IoIosArrowDropleftCircle className="text-4xl" />
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-300 text-gray-700"
            } rounded-full mx-1`}
            key={index}
          >
            {index + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <IoIosArrowDroprightCircle className="text-4xl" />
        </button>
      </div>
    </section>
  );
};

export default ManageOrders;
