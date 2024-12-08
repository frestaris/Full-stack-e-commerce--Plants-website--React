import { IoIosArrowForward } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import RatingStars from "../../../components/RatingStars";
import { useDispatch, useSelector } from "react-redux";
import { useFetchProductByIdQuery } from "../../../redux/features/products/productApi";
import { addToCart } from "../../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import ReviewsCard from "../reviews/ReviewsCard";

const SingleProduct = () => {
  const { id } = useParams();
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const { data, error, isLoading } = useFetchProductByIdQuery(id);

  const singleProduct = data?.product || {};
  const productReviews = data?.reviews || [];

  const handleAddToCart = (product) => {
    const isExists = cart.products.find((item) => item._id === product._id);

    if (isExists) {
      toast.info("Item already in the cart");
    } else {
      dispatch(addToCart(product));
      toast.success("Item added to the cart");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Product not found</p>;

  return (
    <>
      {/* BREADCRUMBS */}
      <section className="section__container bg-green-200">
        <h2 className="section__header capitalize text-center">
          Single Product Page
        </h2>
        <div className="section__subheader flex items-center justify-center space-x-2 mt-2">
          <span className="flex items-center">
            <Link to="/" className="hover:text-primary">
              Home
            </Link>
            <IoIosArrowForward className="mx-2" />
          </span>
          <span className="flex items-center">
            <Link to="/shop" className="hover:text-primary">
              Shop
            </Link>
            <IoIosArrowForward className="mx-2" />
          </span>
          <span className="flex items-center">{singleProduct.name}</span>
        </div>
      </section>

      {/* PRODUCT DETAILS */}
      <section className="section__container mt-8">
        <div className="flex flex-col items-center md:flex-row gap-8">
          <div className="md:w-1/2 w-full">
            <img
              src={singleProduct?.image}
              alt={singleProduct?.name}
              className="rounded-md w-full h-auto"
            />
          </div>
          <div className="md:w-1/2 w-full">
            <h3 className="text-2xl font-semibold mb-4">
              {singleProduct?.name}
            </h3>
            <p className="text-xl text-primary mb-4">
              ${singleProduct?.price}{" "}
              {singleProduct?.oldPrice && (
                <s className="text-slate-500">
                  ${singleProduct?.oldPrice.toFixed(2)}
                </s>
              )}{" "}
            </p>
            <p className="text-gray-700 mb-4">{singleProduct?.description}</p>
            <div>
              <p>
                <strong>Category:</strong> {singleProduct?.category}
              </p>
              <div className="flex items-center gap-1 mt-3">
                <strong>Rating:</strong>
                {singleProduct.rating > 0 ? (
                  <RatingStars rating={singleProduct?.rating} />
                ) : (
                  <p className="text-gray-500">No rating yet!</p>
                )}
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(singleProduct);
              }}
              className="mt-6 px-6 py-3 bg-green-800 rounded-md text-white"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>
      <section className="section__container mt-8">
        <ReviewsCard productReviews={productReviews} />
      </section>
    </>
  );
};

export default SingleProduct;
