import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import products from "../../data/products.json";
import ProductCards from "../shop/ProductCards";

const normalizeCategory = (category) =>
  category.toLowerCase().replace(/\s+/g, "-");

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const filtered = products.filter(
      (product) => normalizeCategory(product.category) === categoryName
    );
    setFilteredProducts(filtered);
  }, [categoryName]);

  useEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <>
      <section className="section__container bg-green-200">
        <h2 className="section__header capitalize">
          {categoryName.replace(/-/g, " ")}
        </h2>
        <p className="section__subheader">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>
      </section>
      <div className="section__container">
        <ProductCards products={filteredProducts} />
      </div>
    </>
  );
};

export default CategoryPage;
