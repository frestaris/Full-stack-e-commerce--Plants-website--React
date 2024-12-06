import { useState } from "react";
import { useUpdateOrderStatusMutation } from "../../../../redux/features/orders/orderApi";
import { RxCross1 } from "react-icons/rx";

const UpdateOrderModal = ({ order, onClose, isOpen }) => {
  const [status, setStatus] = useState(order?.status || "pending");
  const [updateOrderStatus, { isLoading }] = useUpdateOrderStatusMutation();

  const handleUpdateOrderStatus = async () => {
    try {
      await updateOrderStatus({ id: order?._id, status }).unwrap();
      alert("Order status updated successfully!");
      onClose();
    } catch (error) {
      console.error("Failed to update order status", error);
      alert("An error occurred. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <div className="bg-white p-4 rounded shadow-lg w-1/3 relative">
        <h2 className="text-xl mb-4">Update Order Status</h2>
        <div className="mb-4 space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="block w-full shadow-sm sm:text-sm bg-gray-100 border-gray-300 rounded-md py-2.5 px-5 focus:outline-none"
          >
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-600"
        >
          <RxCross1 className="text-2xl" />
        </button>

        <div className="mt-auto flex justify-end">
          <button
            onClick={handleUpdateOrderStatus}
            className="bg-green-800 px-3 py-1.5 text-white rounded-md hover:bg-green-900"
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrderModal;
