import { useState } from "react";
import ProductCards from "./ProductCards";
import ShopFiltering from "../shop/ShopFiltering";
import { useFetchAllProductsQuery } from "../../redux/features/products/productApi";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

const filters = {
  categories: [
    "All",
    "indoor plants",
    "outdoor plants",
    "succulents & cacti",
    "plant accessories",
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
  const [filtersState, setFiltersState] = useState({
    category: "All",
    priceRange: "",
    rating: 0,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [ProductsPerPage] = useState(8);

  const { category, rating, priceRange } = filtersState;

  const [minPrice, maxPrice] = priceRange
    ? priceRange.split("-").map(Number)
    : [0, Infinity];

  const {
    data: { products = [], totalProducts = 0, totalPages = 0 } = {},
    error,
    isLoading: loading,
  } = useFetchAllProductsQuery({
    category: category !== "All" ? category : "",
    minPrice,
    maxPrice,
    rating,
    page: currentPage,
    limit: ProductsPerPage,
  });

  const clearFilters = () => {
    setFiltersState({
      category: "All",
      priceRange: "",
      rating: 0,
    });
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFiltersState(newFilters);
    setCurrentPage(1);
  };

  if (loading)
    return (
      <div className="loader-container flex justify-center items-center h-screen w-full">
        <div className="loader"></div>
      </div>
    );
  if (error) return <div>Error loading products...</div>;

  const startProduct = (currentPage - 1) * ProductsPerPage + 1;
  const endProduct = startProduct + products.length - 1;

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
            setFiltersState={handleFilterChange}
            clearFilters={clearFilters}
          />

          {/* Products Display */}
          <div className="products w-full md:w-3/4">
            <h3 className="text-xl font-medium mb-4">
              Showing {startProduct} to {endProduct} of {totalProducts} products
            </h3>
            {products.length === 0 ? (
              <p>No products available in this category.</p>
            ) : (
              <ProductCards products={products} />
            )}

            {/* Pagination */}
            <div className="mt-6 flex justify-center items-center">
              {/* Previous Page Button */}
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <IoIosArrowDropleftCircle className="text-4xl text-gray-400" />
              </button>

              {/* First Page + Ellipsis */}
              <button
                onClick={() => handlePageChange(1)}
                className={`px-4 py-2 ${
                  currentPage === 1
                    ? "bg-green-700 text-white"
                    : "bg-gray-300 text-gray-700"
                } rounded-full mx-1`}
              >
                1
              </button>
              {currentPage > 3 && <span className="px-2">...</span>}

              {/* Middle Pages */}
              {Array.from({ length: 3 }, (_, index) => {
                const page = currentPage - 1 + index;
                if (page > 1 && page < totalPages) {
                  return (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-4 py-2 ${
                        currentPage === page
                          ? "bg-green-700 text-white"
                          : "bg-gray-300 text-gray-700"
                      } rounded-full mx-1`}
                    >
                      {page}
                    </button>
                  );
                }
                return null;
              })}

              {/* Last Page + Ellipsis */}
              {currentPage < totalPages - 2 && (
                <span className="px-2">...</span>
              )}
              {totalPages > 1 && (
                <button
                  onClick={() => handlePageChange(totalPages)}
                  className={`px-4 py-2 ${
                    currentPage === totalPages
                      ? "bg-green-700 text-white"
                      : "bg-gray-300 text-gray-700"
                  } rounded-full mx-1`}
                >
                  {totalPages}
                </button>
              )}

              {/* Next Page Button */}
              <button
                disabled={currentPage === totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <IoIosArrowDroprightCircle className="text-4xl text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
