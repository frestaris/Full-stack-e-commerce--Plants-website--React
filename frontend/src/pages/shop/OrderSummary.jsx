import { useDispatch, useSelector } from "react-redux";
import { RiDeleteBin6Line } from "react-icons/ri";
import { IoBagCheckOutline } from "react-icons/io5";
import { clearCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { getBaseUrl } from "../../utils/baseUrl";

const OrderSummary = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const products = useSelector((store) => store.cart.products);
  const { tax, taxRate, totalPrice, grandTotal, selectedItems } = useSelector(
    (state) => state.cart
  );

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // payment integration
  const makePayment = async () => {
    const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PK);

    const body = {
      products: products.map((product) => ({
        productId: product.id,
        name: product.name,
        image: product.image,
        price: product.price,
        quantity: product.quantity,
        tax: taxRate,
      })),
      userId: user?._id,
      email: user?.email,
    };

    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(
      `${getBaseUrl()}api/orders/create-checkout-session`,
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );
    if (!response.ok) {
      toast.error("Failed to initiate payment. Please try again.");
      return;
    }

    const session = await response.json();
    console.log("session:", session);

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });
    console.log("result", result);
    if (result.error) {
      console.log("Error", result.error);
    }
  };

  return (
    <div className="bg-green-200 mt-5 rounded text-base">
      <div className="px-6 py-4 space-y-5">
        <h2 className="text-xl text-text-dark">OrderSummary</h2>
        <p className="text-text-dark mt-2">Selected Items: {selectedItems}</p>
        <p>Total Price: ${totalPrice.toFixed(2)}</p>
        <p>
          GST: ${tax.toFixed(2)} ({taxRate * 100}%)
        </p>
        <h3 className="font-bold">Grand Total: ${grandTotal.toFixed(2)}</h3>
        <div className=" mb-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleClearCart();
            }}
            className="bg-red-500 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4"
          >
            <span className="mr-2">Clear cart</span> <RiDeleteBin6Line />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              makePayment(e);
              handleClearCart();
            }}
            className="bg-green-800 px-3 py-1.5 text-white mt-2 rounded-md flex justify-between items-center mb-4"
          >
            <span className="mr-2">Checkout</span> <IoBagCheckOutline />
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
