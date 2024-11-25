import { useState } from "react";
import ProductCards from "./ProductCards";

import product from "../../data/products.json";

const TrendingProducts = () => {
  const [visibleProducts, setVisibleProducts] = useState(8);

  const loadMoreProdcuts = () => {
    setVisibleProducts((prevCount) => prevCount + 4);
  };

  return (
    <section className="section__container product__container">
      <h2 className="section__header">Trending Plants</h2>
      <p className="section__subheader">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi ad
        necessitatibus dignissimos esse? Modi delectus sequi explicabo
        blanditiis numquam. Delectus quas eos reiciendis doloremque autem
        tempora iure, ducimus est quaerat.
      </p>
      <div className="mt-12">
        <ProductCards products={product.slice(0, visibleProducts)} />
      </div>
      <div className="product__btn">
        {visibleProducts < product.length && (
          <button className="btn mt-4" onClick={loadMoreProdcuts}>
            Load More
          </button>
        )}
      </div>
    </section>
  );
};

export default TrendingProducts;
