import { Link } from "react-router-dom";
import heroPic from "../../assets/hero-img.png";
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
        <img className="header__image" src={heroPic} />
      </div>
    </div>
  );
};

export default Banner;
