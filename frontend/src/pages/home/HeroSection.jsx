const HeroSection = () => {
  const cards = [
    {
      id: 1,
      image:
        "https://static01.nyt.com/images/2021/02/26/realestate/02fix1/oakImage-1614375232368-superJumbo.jpg",
      title: "Best Indoor Plants",
      trend: "Bring Nature Inside",
    },
    {
      id: 2,
      image:
        "https://api.photon.aremedia.net.au/wp-content/uploads/sites/9/homes/insideout/image/d3268d584713e49144410157b6b2c57f/d3268d584713e49144410157b6b2c57f.jpeg?resize=720%2C405",
      title: "Outdoor Garden Essentials",
      trend: "Create Your Perfect Garden",
    },
    {
      id: 3,
      image:
        "https://www.smallhomesoul.com/wp-content/uploads/2016/05/Succulent-Garden-Wagon-After.jpg",
      title: "Succulents & Cacti Collection",
      trend: "Low Maintenance & Beautiful",
    },
  ];

  return (
    <section className="section__container hero__container grid grid-cols-1 md:grid-cols-3 gap-6">
      {cards.map((card) => (
        <div
          key={card.id}
          className="hero__card relative overflow-hidden group"
        >
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-48 object-cover group-hover:blur-sm transition-all duration-300"
            loading="lazy"
          />

          <div className="hero__content absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition-all duration-300 p-4">
            <p className="text-white text-lg">{card.trend}</p>
            <h4 className="text-white">{card.title}</h4>
            <a href="#" className="mt-2 hover:underline text-white">
              Discover More
            </a>
          </div>
        </div>
      ))}
    </section>
  );
};

export default HeroSection;
