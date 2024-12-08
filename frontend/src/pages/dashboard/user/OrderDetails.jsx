import { useGetOrderByIdQuery } from "../../../redux/features/orders/orderApi";
import { useParams } from "react-router-dom";
import TimelineStep from "../../../components/TimelineStep";

const OrderDetails = () => {
  const { orderId } = useParams();

  const { data: order, error, isLoading } = useGetOrderByIdQuery(orderId);
  if (isLoading)
    return (
      <div className="loader-container flex justify-center items-center h-screen w-full">
        <div className="loader"></div>
      </div>
    );
  if (error) return <div>Something went wrong! Please try again later.</div>;

  const isCompleted = (status) => {
    const statuses = ["pending", "processing", "shipped", "completed"];
    return statuses.indexOf(status) < statuses.indexOf(order.status);
  };
  const isCurrent = (status) => order.status === status;
  const steps = [
    {
      status: "pending",
      label: "Pending",
      description: "Your order has been created and is awaiting processing.",
      icon: {
        iconName: "time-line",
        bgColor: "red-500",
        textColor: "gray-800",
      },
    },
    {
      status: "processing",
      label: "Processing",
      description: "Your order is currently being processed.",
      icon: {
        iconName: "loader-line",
        bgColor: "yellow-800",
        textColor: "yellow-800",
      },
    },
    {
      status: "shipped",
      label: "Shipped",
      description: "Your order has been shipped.",
      icon: {
        iconName: "truck-line",
        bgColor: "blue-800",
        textColor: "blue-800",
      },
    },
    {
      status: "completed",
      label: "Completed",
      description: "Your order has been successfully completed.",
      icon: {
        iconName: "check-line",
        bgColor: "green-800",
        textColor: "green-900",
      },
    },
  ];

  return (
    <section className="section__container rounded p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Payment Status: {order?.status}
      </h2>
      <p className="mb-4">Order id: {order?.orderId}</p>
      {/* Product Details */}
      <div className="mb-6">
        {order?.products && order.products.length > 0 && (
          <div>
            {order.products.map((product) => (
              <div
                key={product.productId}
                className="flex items-center justify-between p-4 border-b border-gray-200"
              >
                <div className="flex items-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-cover mr-4"
                  />
                  <div className="flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Qty:{" "}
                      <span className="font-medium">{product.quantity}</span>
                    </p>
                  </div>
                </div>
                <p className="font-bold text-lg">${product.price}</p>
              </div>
            ))}

            {/* Subtotal and GST in the same div */}
            <div className="subtotal-gst mt-4 p-4 flex justify-between items-start border-t border-gray-200 rounded-lg">
              <div className="flex flex-col">
                <span className="text-lg font-semibold text-gray-700">
                  Subtotal:
                </span>
                <span className="text-sm text-gray-500">GST (5%):</span>
              </div>

              <div className="flex flex-col items-end">
                <span className="font-bold text-xl text-blue-800">
                  $
                  {order.products
                    .reduce(
                      (total, product) =>
                        total + product.price * product.quantity,
                      0
                    )
                    .toFixed(2)}
                </span>
                <span className="font-medium text-blue-800">
                  ${order.tax.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Total Amount with Tax */}
            <div className="total-amount-with-tax mt-2 p-4 flex justify-between items-center bg-gray-50 border-t border-gray-200 rounded-lg">
              <span className="text-lg font-semibold text-gray-700">
                Total:
              </span>
              <span className="font-bold text-xl text-blue-900">
                $
                {(
                  order.tax +
                  order.products.reduce(
                    (total, product) =>
                      total + product.price * product.quantity,
                    0
                  )
                ).toFixed(2)}
              </span>
            </div>
          </div>
        )}
      </div>

      <ol className="sm:flex items-center relative">
        {steps.map((step, index) => (
          <TimelineStep
            key={index}
            step={step}
            order={order}
            isCompleted={isCompleted(step.status)}
            isCurrent={isCurrent(step.status)}
            isLastStep={index === steps.length - 1}
            icon={step.icon}
            description={step.description}
          />
        ))}
      </ol>
    </section>
  );
};

export default OrderDetails;
