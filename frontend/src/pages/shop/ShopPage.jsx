import { useState } from "react";
import products from "../../data/products.json";
import RatingStars from "../../components/RatingStars";
import ProductCards from "./ProductCards";
import { RiPlantFill } from "react-icons/ri";

const ShopPage = () => {
  // Initial filter values
  const initialFilters = {
    selectedCategory: "All",
    selectedPriceRange: null,
    selectedRating: null,
  };

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

  // State for selected filters
  const [selectedCategory, setSelectedCategory] = useState(
    initialFilters.selectedCategory
  );
  const [selectedPriceRange, setSelectedPriceRange] = useState(
    initialFilters.selectedPriceRange
  );
  const [selectedRating, setSelectedRating] = useState(
    initialFilters.selectedRating
  );

  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    const matchesPrice =
      !selectedPriceRange ||
      (product.price >= selectedPriceRange.min &&
        product.price <= selectedPriceRange.max);

    const matchesRating =
      !selectedRating || Math.floor(product.rating) === selectedRating;

    return matchesCategory && matchesPrice && matchesRating;
  });

  // Clear all filters and reset them to initial state
  const clearFilter = () => {
    setSelectedCategory(initialFilters.selectedCategory);
    setSelectedPriceRange(initialFilters.selectedPriceRange);
    setSelectedRating(initialFilters.selectedRating);
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
          <div className="filters w-full md:w-1/4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium">Filters</h3>
              <RiPlantFill className="ml-2 text-2xl text-green-800" />
            </div>
            <hr />

            {/* Category Filter */}
            <div className="filter-group my-6">
              <h4 className="font-medium mb-2">Category</h4>
              <select
                className="border p-2 w-full"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {filters.categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            {/* Price Filter */}
            <div className="filter-group mb-6">
              <h4 className="font-medium mb-2">Price</h4>
              {filters.price.map((priceRange, index) => (
                <label key={index} className="block">
                  <input
                    type="radio"
                    name="price"
                    value={priceRange.label}
                    className="mr-2"
                    checked={selectedPriceRange?.label === priceRange.label}
                    onChange={() => setSelectedPriceRange(priceRange)}
                  />
                  {priceRange.label}
                </label>
              ))}
            </div>
            {/* Rating Filter */}
            <div className="filter-group">
              <h4 className="font-medium mb-2">Rating</h4>
              {filters.ratings.map((rating, index) => (
                <label key={index} className="flex items-center">
                  <input
                    type="radio"
                    name="rating"
                    value={rating}
                    className="mr-2"
                    checked={selectedRating === rating}
                    onChange={() => setSelectedRating(rating)}
                  />
                  <RatingStars rating={rating} />
                </label>
              ))}
            </div>
            {/* Clear Filters Button */}
            <button
              className="mt-4 p-2 bg-red-500 text-white rounded"
              onClick={clearFilter}
            >
              Clear Filters
            </button>
          </div>

          {/* Products Display */}
          <div className="products w-full md:w-3/4">
            <h3 className="text-xl font-medium mb-4">
              Products Available: {filteredProducts.length}
            </h3>
            <ProductCards products={filteredProducts} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;
