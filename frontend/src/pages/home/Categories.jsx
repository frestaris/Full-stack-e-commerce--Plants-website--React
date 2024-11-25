import { Link } from "react-router-dom";

const Categories = () => {
  const categories = [
    {
      name: "Indoor Plants",
      path: "/indoor-plants",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6lzzlPTBp1vjyjT5Vf0xGEgAvcNPPRxGo0A&s",
    },
    {
      name: "Outdoor Plants",
      path: "/outdoor-plants",
      image:
        "https://api.photon.aremedia.net.au/wp-content/uploads/sites/9/2021/01/potted-peace-lily-scaled.jpg?fit=650%2C975&resize=650%2C975",
    },
    {
      name: "Succulents & Cacti",
      path: "/succulents-cacti",
      image:
        "https://hicksnurseries.com/wp-content/uploads/2019/04/succulents_shutterstock_286576340-copy.jpg",
    },
    {
      name: "Plant Accessories",
      path: "/plant-accessories",
      image:
        "https://www.thejunglecollective.com.au/wp-content/uploads/2023/08/Plant-Pots-Accessories-Online.webp",
    },
  ];

  return (
    <>
      <div className="product__grid px-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="category-card bg-gray-100 rounded-lg overflow-hidden shadow-lg"
          >
            <Link to={category.path}>
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold">{category.name}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Categories;
