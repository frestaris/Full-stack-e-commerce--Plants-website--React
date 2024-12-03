import { useSelector } from "react-redux";
import { useGetReviewsByUserIdQuery } from "../../../../redux/features/reviews/reviewsApi";
import { useNavigate } from "react-router-dom";
import RatingStars from "../../../../components/RatingStars";

const UserReviews = () => {
  const { user } = useSelector((state) => state.auth);
  const {
    data: reviews,
    error,
    isLoading,
  } = useGetReviewsByUserIdQuery(user?._id);
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (error || !reviews?.length) return <div>No reviews found!</div>;

  const handleCardClick = (productId) => {
    navigate(`/shop/${productId}`);
  };

  return (
    <div className="py-6">
      <h2 className="text-2xl font-bold mb-8">Your Given Reviews</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {reviews.map((review, index) => (
          <div
            key={index}
            onClick={() => handleCardClick(review.productId)}
            className="bg-white shadow-md rounded-lg p-4 border-gray-200 cursor-pointer hover:scale-105 transition-all duration-200"
          >
            <div className="text-lg font-semibold mb-2">
              <RatingStars rating={review?.rating} />
            </div>
            <p className="mb-2">
              <strong>Comment:</strong> {review?.comment}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Product ID:</strong> {review?.productId}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Date:</strong>{" "}
              {new Date(review?.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
        <div
          onClick={() => navigate("/shop")}
          className="bg-gray-100 text-black flex flex-col items-center justify-center rounded-lg p-6 border cursor-pointer hover:bg-green-100 transition-all duration-200"
        >
          <span className="text-2xl font-bold">+</span>
          <p>Add New Review</p>
        </div>
      </div>
    </div>
  );
};

export default UserReviews;
