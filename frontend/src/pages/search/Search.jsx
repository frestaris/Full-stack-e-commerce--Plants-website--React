import { useEffect, useState } from "react";
import ProductCards from "../shop/ProductCards";
import { useFetchAllProductsQuery } from "../../redux/features/products/productApi.js";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [initialProducts, setInitialProducts] = useState([]);

  const {
    data: { products = [] } = {},
    error,
    isLoading,
  } = useFetchAllProductsQuery({
    category: "",
    minPrice: "",
    maxPrice: "",
    rating: "",
    limit: 8,
  });

  useEffect(() => {
    if (products.length > 0) {
      setInitialProducts(products);
      setFilteredProducts(products);
    }
  }, [products]);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredProducts(initialProducts);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = initialProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, initialProducts]);

  if (isLoading)
    return (
      <div className="loader-container flex justify-center items-center h-screen w-full">
        <div className="loader"></div>
      </div>
    );
  if (error) return <div>No order found!</div>;

  return (
    <>
      <section className="section__container bg-green-200">
        <h2 className="section__header capitalize">Search Products</h2>
        <p className="section__subheader">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>
      </section>

      <section className="section__container">
        <div className="w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for products..."
            className="search-bar w-full max-w-4xl p-2 border rounded"
          />
        </div>
      </section>
      <div className="section__container">
        <ProductCards products={filteredProducts} />
      </div>
    </>
  );
};

export default Search;
