import { FaRegClock, FaCog, FaTruck, FaCheckCircle } from "react-icons/fa";

const TimelineStep = ({
  step,
  order,
  isCompleted,
  isCurrent,
  isLastStep,
  icon,
  description,
}) => {
  const iconBgColor =
    isCompleted || isCurrent ? `bg-${icon.bgColor}` : "bg-gray-100";
  const iconTextColor =
    isCompleted || isCurrent ? "text-white" : `text-${icon.textColor}`;
  const labelTextColor =
    isCompleted || isCurrent ? "text-gray-900" : "text-gray-500";
  const descriptionTextColor =
    isCompleted || isCurrent ? "text-gray-900" : "text-gray-500";

  const renderIcon = () => {
    switch (step.icon.iconName) {
      case "time-line":
        return <FaRegClock />;
      case "loader-line":
        return <FaCog />;
      case "truck-line":
        return <FaTruck />;
      case "check-line":
        return <FaCheckCircle />;
      default:
        return null;
    }
  };

  return (
    <li className="relative mb-6 sm:mb-0 sm:pl-10">
      <div className="flex items-center">
        {!isLastStep && (
          <div
            className={`absolute sm:flex w-full h-0.5 ${
              isCompleted ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        )}
        <div
          className={`relative z-10 flex items-center justify-center w-12 h-12 ${iconBgColor} ${iconTextColor} rounded-full ring-0 ring-white shrink-0`}
        >
          {renderIcon()}
        </div>
      </div>
      <div className="mt-3 sm:pe-8">
        <h3 className={`text-base font-semibold ${labelTextColor}`}>
          {step.label}
        </h3>
        <time className="block mb-2 text-sm font-normal leading-none text-gray-400">
          {order.updatedAt
            ? new Date(order.updatedAt).toLocaleString()
            : "Time"}
        </time>
        <p className={`text-base font-normal ${descriptionTextColor}`}>
          {description}
        </p>
      </div>
    </li>
  );
};

export default TimelineStep;