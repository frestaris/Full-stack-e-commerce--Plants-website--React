import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div className="section__container header__container">
      <div className="header__content z-30">
        <h4 className="uppercase">UP TO 20% Discount on</h4>
        <h1>Best Deals</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
          cum eligendi commodi eum. Fugit nihil ratione ullam consequatur itaque
          adipisci, est suscipit deleniti quas perspiciatis quibusdam,
          dignissimos dolor qui nostrum.
        </p>
        <button className="btn">
          <Link to="/shop">EXPLORE NOW</Link>
        </button>
      </div>
      <div>
        <img
          className="header__image"
          src="https://aquafy.com.au/cdn/shop/files/53536B3B-6954-4076-97C8-D78DDF37D34E_1024x1024.jpg?v=1721908348"
        />
      </div>
    </div>
  );
};

export default Banner;
