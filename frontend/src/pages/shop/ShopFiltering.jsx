import RatingStars from "../../components/RatingStars";
import { RiPlantFill } from "react-icons/ri";

const ShopFiltering = ({
  filters,
  filtersState,
  setFiltersState,
  clearFilters,
}) => {
  return (
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
          value={filtersState.category}
          onChange={(e) =>
            setFiltersState({ ...filtersState, category: e.target.value })
          }
        >
          {filters.categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <hr />
      {/* Price Filter */}
      <div className="filter-group mb-6 mt-2">
        <h4 className="font-medium mb-2">Price</h4>
        {filters.price.map((range) => (
          <label key={range.label} className="block">
            <input
              type="radio"
              name="priceRange"
              id="priceRange"
              value={`${range.min}-${range.max}`}
              className="mr-2"
              checked={filtersState.priceRange === `${range.min}-${range.max}`}
              onChange={(e) =>
                setFiltersState({
                  ...filtersState,
                  priceRange: e.target.value,
                })
              }
            />
            {range.label}
          </label>
        ))}
      </div>

      <hr />
      {/* Rating Filter */}
      <div className="filter-group mb-5">
        <h4 className="font-medium mb-2 mt-2">Rating</h4>
        {filters.ratings.map((rating) => (
          <label key={rating} className="flex items-center">
            <input
              type="radio"
              name="rating"
              value={rating}
              className="mr-2"
              checked={filtersState.rating === rating}
              onChange={(e) =>
                setFiltersState({
                  ...filtersState,
                  rating: Number(e.target.value),
                })
              }
            />
            <RatingStars rating={rating} />
          </label>
        ))}
      </div>
      <hr />
      {/* Clear Filters Button */}
      <button
        className="mt-4 p-2 bg-red-500 text-white rounded"
        onClick={clearFilters}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default ShopFiltering;
