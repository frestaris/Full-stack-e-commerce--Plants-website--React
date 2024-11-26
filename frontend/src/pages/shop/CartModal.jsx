import { RxCross1 } from "react-icons/rx";
import OrderSummary from "./OrderSummary";
import { useEffect } from "react";

const CartModal = ({ products, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <div
      className={`fixed z-[1000] inset-0 bg-black bg-opacity-80 transition-opacity ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ transition: "opacity 300ms" }}
    >
      <div
        className={`fixed right-0 top-0 md:w-1/3 w-full bg-white h-full overflow-y-auto transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          transition: "transform 300ms cubic-bezier(0.25, 0.46, 0.45,0.94)",
        }}
      >
        <div className="p-4 mt-4">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-xl font-semibold">Your Cart</h4>
            <button
              onClick={() => onClose()}
              className="text-gray-600 hover:text-red-600"
            >
              <RxCross1 className="text-2xl" />
            </button>
          </div>
          <div className="cart-items">
            {products.length === 0 ? (
              <div>Your cart is empty</div>
            ) : (
              products.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between shadow-md md:p-5 p-2 mb-4"
                >
                  {/* Left section */}
                  <div className="flex items-center">
                    <img
                      src={item.image}
                      alt="item image"
                      className="size-10 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h5>
                        <strong>{item.name}</strong>
                      </h5>
                      <p>${Number(item.price).toFixed(2)}</p>
                    </div>
                  </div>

                  {/* Right section */}
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <button className="w-6 h-6 flex items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-green-800 hover:text-white ml-8">
                        -
                      </button>
                      <span className="px-2 text-center mx-1">
                        {item.quantity}
                      </span>
                      <button className="w-6 h-6 flex items-center justify-center px-1.5 rounded-full bg-gray-200 text-gray-700 hover:bg-green-800 hover:text-white ">
                        +
                      </button>
                    </div>
                    <div className="ml-5">
                      <button className="bg-red-500 w-5 h-5 flex items-center justify-center rounded text-white hover:bg-red-600">
                        <RxCross1 className="text-xs" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
          {products.length > 0 && <OrderSummary />}
        </div>
      </div>
    </div>
  );
};

export default CartModal;
