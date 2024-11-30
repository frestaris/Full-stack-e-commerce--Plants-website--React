import { FaStar, FaRegStar } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useFetchProductByIdQuery } from "../../../redux/features/products/productApi";
import { usePostReviewMutation } from "../../../redux/features/reviews/reviewsApi";
import { toast } from "react-toastify";

const PostAReview = ({ isModalOpen, handleClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const { id } = useParams();
  const { user } = useSelector((state) => state.auth);

  const { data: product, refetch } = useFetchProductByIdQuery(id, {
    skip: !id,
  });
  const [postReview] = usePostReviewMutation();

  useEffect(() => {
    if (product && product.reviews && user?._id) {
      const existingReview = product.reviews.find(
        (review) => review.userId._id === user._id
      );

      if (existingReview) {
        setRating(existingReview.rating);
        setComment(existingReview.comment);
      } else {
        setRating(0);
        setComment("");
      }
    }
  }, [product, user, id]);

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newComment = {
      comment,
      rating,
      userId: user?._id,
      productId: id,
    };

    try {
      const response = await postReview(newComment).unwrap();
      toast.success("Review added!");

      setComment("");
      setRating(0);

      if (refetch) {
        refetch();
      }

      handleClose();
    } catch (error) {
      console.error("Error occurred:", error);
      if (error.status === 404) {
        alert("Endpoint not found. Please check the API URL.");
      } else if (error.status === "PARSING_ERROR") {
        alert("The response is not in JSON format.");
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-black/90 flex items-center justify-center z-40 px-2 ${
        isModalOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white p-6 rounded-md shadow-lg w-96 z-50">
        <h2 className="text-lg font-medium mb-4">Write a Review</h2>
        <div className="flex items-center mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className="cursor-pointer text-lg text-yellow-500"
              onClick={() => handleRating(star)}
            >
              {rating >= star ? <FaStar /> : <FaRegStar />}
            </span>
          ))}
        </div>
        <textarea
          className="w-full p-2 border rounded-md mb-4"
          placeholder="Write your comment here..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostAReview;
