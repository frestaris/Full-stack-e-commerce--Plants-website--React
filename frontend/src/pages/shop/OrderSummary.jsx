import { useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoBagCheckOutline } from "react-icons/io5";

const OrderSummary = () => {
  const { tax, taxRate, totalPrice, grandTotal, selectedItems } = useSelector(
    (state) => state.cart
  );
  return (
    <div className="bg-green-200 mt-5 rounded text-base">
      <div className="px-6 py-4 space-y-5">
        <h2 className="text-xl text-text-dark">OrderSummary</h2>
        <p className="text-text-dark mt-2">Selected Items {selectedItems}</p>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
        <p>
          Tax: ${tax.toFixed(2)} ({taxRate * 100}%)
        </p>
        <h3 className="font-bold">Grand Total: ${grandTotal.toFixed(2)}</h3>
        <div className=" mb-6">
          <button className="bg-red-500 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4">
            <span className="mr-2">Clear cart</span> <RiDeleteBin6Line />
          </button>
          <button className="bg-green-800 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4">
            <span className="mr-2">Checkout</span> <IoBagCheckOutline />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
