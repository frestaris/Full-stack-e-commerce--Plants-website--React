import { Link } from "react-router-dom";

const Categories = () => {
  const categories = [
    {
      name: "Indoor Plants",
      path: "categories/indoor plants",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6lzzlPTBp1vjyjT5Vf0xGEgAvcNPPRxGo0A&s",
      webp: "https://example.com/indoor-plants.webp",
      avif: "https://example.com/indoor-plants.avif",
    },
    {
      name: "Outdoor Plants",
      path: "categories/outdoor plants",
      image:
        "https://api.photon.aremedia.net.au/wp-content/uploads/sites/9/2021/01/potted-peace-lily-scaled.jpg?fit=650%2C975&resize=650%2C975",
      webp: "https://example.com/outdoor-plants.webp",
      avif: "https://example.com/outdoor-plants.avif",
    },
    {
      name: "Succulents & Cacti",
      path: "categories/succulents & cacti",
      image:
        "https://hicksnurseries.com/wp-content/uploads/2019/04/succulents_shutterstock_286576340-copy.jpg",
      webp: "https://example.com/succulents-cacti.webp",
      avif: "https://example.com/succulents-cacti.avif",
    },
    {
      name: "Plant Accessories",
      path: "categories/plant accessories",
      image:
        "https://www.thejunglecollective.com.au/wp-content/uploads/2023/08/Plant-Pots-Accessories-Online.webp",
      webp: "https://example.com/plant-accessories.webp",
      avif: "https://example.com/plant-accessories.avif",
    },
  ];

  return (
    <>
      <div className="categories__grid px-4">
        {categories.map((category, index) => (
          <div key={index} className="categories__card">
            <Link to={category.path} className="categories__link">
              <picture>
                {/* WebP Image */}
                <source
                  srcSet={category.webp}
                  type="image/webp"
                  media="(max-width: 768px)"
                />
                {/* AVIF Image */}
                <source
                  srcSet={category.avif}
                  type="image/avif"
                  media="(max-width: 768px)"
                />
                {/* Fallback Image */}
                <img
                  src={category.image}
                  alt={category.name}
                  className="rounded-full w-40 h-40 object-cover border-4 border-green-800"
                />
              </picture>
              <h4 className="mt-4">{category.name}</h4>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Categories;
