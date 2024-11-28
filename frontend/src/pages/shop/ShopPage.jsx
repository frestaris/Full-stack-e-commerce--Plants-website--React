import { useState } from "react";

import ProductCards from "./ProductCards";
import productsData from "../../data/products.json";
import ShopFiltering from "../shop/ShopFiltering";
import { useEffect } from "react";

const filters = {
  categories: [
    "All",
    "Indoor Plants",
    "Outdoor Plants",
    "Succulents & Cacti",
    "Plant Accessories",
  ],
  ratings: [1, 2, 3, 4, 5],
  price: [
    {
      label: "Under $50",
      min: 0,
      max: 50,
    },
    {
      label: "$50 - $100",
      min: 50,
      max: 100,
    },
    {
      label: "$100 - $200",
      min: 100,
      max: 200,
    },
    {
      label: "$200 and above",
      min: 200,
      max: Infinity,
    },
  ],
};

const ShopPage = () => {
  const [products, setProducts] = useState(productsData);
  const [filtersState, setFiltersState] = useState({
    category: "all",
    priceRange: "",
    rating: 0,
  });

  // filtering functions
  const applyFilters = () => {
    let filteredProducts = productsData;

    // Filter by category
    if (filtersState.category && filtersState.category !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === filtersState.category
      );
    }

    // Filter by price range
    if (filtersState.priceRange) {
      const [minPrice, maxPrice] = filtersState.priceRange
        .split("-")
        .map((value) => (value === "Infinity" ? Infinity : parseFloat(value)));
      filteredProducts = filteredProducts.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
    }

    // Filter by rating range
    if (filtersState.rating) {
      const minRating = filtersState.rating;
      const maxRating = filtersState.rating + 0.9;
      filteredProducts = filteredProducts.filter(
        (product) => product.rating >= minRating && product.rating <= maxRating
      );
    }
    setProducts(filteredProducts);
  };

  useEffect(() => {
    applyFilters();
  }, [filtersState]);

  const clearFilters = () => {
    setFiltersState({
      category: "all",
      priceRange: "",
      rating: 0,
    });
  };

  return (
    <>
      {/* Header Section */}
      <section className="section__container bg-green-200">
        <h2 className="section__header capitalize">Shop Page</h2>
        <p className="section__subheader">
          Browse our wide selection of plants and accessories!
        </p>
      </section>

      {/* Filter and Product Section */}
      <section className="section__container">
        <div className="flex flex-col md:flex-row md:gap-12 gap-8">
          {/* Filter Sidebar */}
          <ShopFiltering
            filters={filters}
            filtersState={filtersState}
            setFiltersState={setFiltersState}
            clearFilters={clearFilters}
          />

          {/* Products Display */}
          <div className="products w-full md:w-3/4">
            <h3 className="text-xl font-medium mb-4">
              Products Available: {products.length}
            </h3>
            <ProductCards products={products} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;

// const { min: minPrice = 0, max: maxPrice = Infinity } =
//   selectedPriceRange || {};

// const [currentPage, setCurrentPage] = useState(1);
// const [ProductsPerPage, setProductsPerPage] = useState(8);

// const { category, ratings, priceRange } = initialFilters;

// const {
//   data: { products = [], totalProducts, totalPages } = {},
//   error,
//   loading,
// } = useFetchAllProductsQuery({
//   category: category !== "all" ? category : "",
//   minPrice,
//   maxPrice,
//   page: currentPage,
//   limit: ProductsPerPage,
// });

// const filteredProducts = products.filter((product) => {
//   const matchesCategory =
//     selectedCategory === "All" || product.category === selectedCategory;

//   const matchesPrice =
//     !selectedPriceRange ||
//     (product.price >= selectedPriceRange.min &&
//       product.price <= selectedPriceRange.max);

//   const matchesRating =
//     !selectedRating || Math.floor(product.rating) === selectedRating;

//   return matchesCategory && matchesPrice && matchesRating;
// });

// if (loading) return <div>Loading...</div>;
// if (error) return <div>Error loading products...</div>;
