import { IoIosArrowForward } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import RatingStars from "../../../components/RatingStars";
import products from "../../../data/products.json";

const SingleProduct = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <p>Product not found</p>;
  }

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
          <span className="flex items-center">{id}</span>
        </div>
      </section>

      {/* PRODUCT DETAILS */}
      <section className="section__container mt-8">
        <div className="flex flex-col items-center md:flex-row gap-8">
          <div className="md:w-1/2 w-full">
            <img
              src={product.image}
              alt={product.name}
              className="rounded-md w-full h-auto"
            />
          </div>
          <div className="md:w-1/2 w-full">
            <h3 className="text-2xl font-semibold mb-4">{product.name}</h3>
            <p className="text-xl text-primary mb-4">
              ${product.price}
              <s className="text-slate-500">${product.oldPrice}</s>
            </p>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <div>
              <p>
                <strong>Category:</strong> {product.category}
              </p>
              <div className="flex items-center gap-1">
                <strong>Rating:</strong>
                <RatingStars rating={product.rating} />
              </div>
            </div>
            <button className="mt-6 px-6 py-3 bg-green-800 rounded-md text-white">
              Add to Cart
            </button>
          </div>
        </div>
      </section>
      <section className="section__container mt-8">Reviews here</section>
    </>
  );
};

export default SingleProduct;
