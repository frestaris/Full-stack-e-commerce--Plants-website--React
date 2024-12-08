import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchAllProductsQuery } from "../../redux/features/products/productApi";
import ProductCards from "../shop/ProductCards";

const CategoryPage = () => {
  const { categoryName } = useParams();

  const { data, isLoading, error } = useFetchAllProductsQuery({
    category: categoryName,
    limit: 100,
  });

  const filteredProducts =
    data?.products?.filter((product) => product.category === categoryName) ||
    [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) return <div>Loading products...</div>;
  if (error) return <div>Error loading products...</div>;

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
