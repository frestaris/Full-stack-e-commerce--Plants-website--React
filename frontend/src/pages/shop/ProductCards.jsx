import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import RatingStars from "../../components/RatingStars";

const ProductCards = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-5">
      {products.map((product, index) => (
        <div key={index} className="product__card relative">
          <div className="relative">
            <Link to={`/shop/${product._id}`}>
              <img
                src={product.image}
                alt="product image"
                className="max-h-96 md:h-64 w-full object-cover hover:scale-105 transition-all duration-300"
              />
            </Link>
            <div className="absolute top-3 right-3">
              <button className="p-2 bg-green-800 text-white hover:bg-green-700 focus:outline-none">
                <FaShoppingCart className="text-xl" />
              </button>
            </div>
          </div>
          <div className="product__card__content">
            <h4>{product.name}</h4>
            <p>
              ${product.price}{" "}
              {product.oldPrice ? <s>${product?.oldPrice}</s> : null}
            </p>
            <RatingStars rating={product.rating} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;
