import { useState } from "react";
import ProductCards from "./ProductCards";
import { useFetchAllProductsQuery } from "../../redux/features/products/productApi.js";

const TrendingProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(8);
  const {
    data: { products = [], totalProducts } = {},
    error,
    isLoading,
  } = useFetchAllProductsQuery({
    category: "",
    minPrice: "",
    maxPrice: "",
    rating: "",
    limit: visibleProducts,
  });

  const loadMoreProdcuts = () => {
    setVisibleProducts((prevCount) => prevCount + 4);
  };

  return (
    <>
      {isLoading && (
        <div className="loader-container flex justify-center items-center">
          <div className="loader"></div>
        </div>
      )}
      {error && <div>Error loading products.</div>}
      <section className="section__container product__container">
        <h2 className="section__header">Trending Plants</h2>
        <p className="section__subheader">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi ad
          necessitatibus dignissimos esse? Modi delectus sequi explicabo
          blanditiis numquam. Delectus quas eos reiciendis doloremque autem
          tempora iure, ducimus est quaerat.
        </p>
        <div className="mt-12">
          <ProductCards products={products.slice(0, visibleProducts)} />
        </div>
        <div className="product__btn">
          {visibleProducts < totalProducts && (
            <button className="btn mt-4" onClick={loadMoreProdcuts}>
              Load More
            </button>
          )}
        </div>
      </section>
    </>
  );
};

export default TrendingProducts;
