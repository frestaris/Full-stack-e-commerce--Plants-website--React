import { useSelector } from "react-redux";
import moment from "moment";
import RatingStars from "../../../components/RatingStars";
import { useState } from "react";
import PostAReview from "./PostAReview";
import { Link } from "react-router-dom";

const ReviewsCard = ({ productReviews }) => {
  const { user } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const reviews = productReviews || [];

  const userReview = user
    ? reviews.find((review) => review?.userId?._id === user._id)
    : null;

  const handleOpenReviewModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="my-6 bg-white p-8">
      <div>
        {reviews.length > 0 ? (
          <div>
            <h3 className="text-lg font-medium">
              ({productReviews.length}) Reviews...
            </h3>
            <div>
              {reviews.map((review, index) => (
                <div key={index} className="mt-4">
                  <div className="flex flex-wrap justify-between items-start">
                    <div className="flex gap-4 items-center w-full sm:w-auto">
                      <img
                        className="size-10 rounded-full"
                        src={
                          review?.userId?.profileImage ||
                          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                        }
                        alt="user picture"
                      />
                      <div className="space-y-1">
                        <p className="text-lg font-medium underline capitalize underline-offset-4 text-blue-400">
                          {review?.userId?.username}
                        </p>
                        <p className="text-[12px] italic block sm:hidden">
                          {moment(review?.updatedAt).fromNow()}
                        </p>
                        <RatingStars rating={review?.rating} />
                      </div>
                    </div>
                    <div className="flex-col justify-between items-end hidden sm:block">
                      <p className="text-[12px] italic">
                        {moment(review?.updatedAt).fromNow()}
                      </p>
                    </div>
                  </div>
                  <div className="text-gray-600 mt-5 border p-4">
                    <p className="w-full">{review?.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>No reviews for this product yet!</p>
        )}
      </div>

      {/* Add review button */}
      {user ? (
        <div className="mt-12">
          <button
            onClick={handleOpenReviewModal}
            className="px-6 py-3 bg-green-800 text-white rounded-md"
          >
            {userReview ? "Edit Review" : "Add a Review"}
          </button>
        </div>
      ) : (
        <p className="my-5 italic text-md">
          Please
          <Link className="text-blue-700 underline px-1" to="/register">
            Log in
          </Link>
          here to add a review
        </p>
      )}

      {/* Review modal */}
      <PostAReview
        isModalOpen={isModalOpen}
        handleClose={handleCloseReviewModal}
      />
    </div>
  );
};

export default ReviewsCard;
