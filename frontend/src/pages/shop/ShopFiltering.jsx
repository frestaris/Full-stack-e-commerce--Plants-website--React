import RatingStars from "../../components/RatingStars";
import { RiPlantFill } from "react-icons/ri";

const ShopFiltering = ({
  filters,
  filtersState,
  setFiltersState,
  clearFilters,
}) => {
  const handleCategoryChange = (category) => {
    setFiltersState((prev) => ({ ...prev, category }));
  };

  const handlePriceChange = (priceRange) => {
    setFiltersState((prev) => ({ ...prev, priceRange }));
  };

  const handleRatingChange = (rating) => {
    setFiltersState((prev) => ({ ...prev, rating }));
  };

  return (
    <div className="filters w-full md:w-1/4 border p-4 rounded-lg shadow-md bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-medium">Filters</h3>
        <RiPlantFill className="ml-2 text-2xl text-green-800" />
      </div>
      <hr className="mb-4" />

      {/* Category Filter */}
      <div className="filter-group mb-6">
        <h4 className="font-medium mb-2">Category</h4>
        <select
          className="border p-2 w-full rounded"
          value={filtersState.category}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          {filters.categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <hr className="mb-4" />

      {/* Price Filter */}
      <div className="filter-group mb-6">
        <h4 className="font-medium mb-2">Price</h4>
        {filters.price.map((range, index) => (
          <label key={index} className="block mb-2">
            <input
              type="radio"
              name="priceRange"
              value={`${range.min}-${range.max}`}
              className="mr-2"
              checked={filtersState.priceRange === `${range.min}-${range.max}`}
              onChange={(e) => handlePriceChange(e.target.value)}
            />
            {range.label}
          </label>
        ))}
      </div>
      <hr className="mb-4" />

      {/* Rating Filter */}
      <div className="filter-group mb-6">
        <h4 className="font-medium mb-2">Rating</h4>
        {filters.ratings.map((rating, index) => (
          <label key={index} className="flex items-center mb-2">
            <input
              type="radio"
              name="rating"
              value={rating}
              className="mr-2"
              checked={filtersState.rating === rating}
              onChange={(e) => handleRatingChange(Number(e.target.value))}
            />
            <RatingStars rating={rating} />
          </label>
        ))}
      </div>
      <hr className="mb-4" />

      {/* Clear Filters Button */}
      <button
        className="mt-4 p-2 bg-red-500 text-white rounded w-full hover:bg-red-600"
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default ShopFiltering;
