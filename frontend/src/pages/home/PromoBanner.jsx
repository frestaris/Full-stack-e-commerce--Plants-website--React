import { FaTruck } from "react-icons/fa";
import { AiFillDollarCircle } from "react-icons/ai";
import { RiUserVoiceFill } from "react-icons/ri";

const PromoBanner = () => {
  return (
    <section className="section__container banner__container">
      <div className="banner__card flex flex-col items-center justify-center text-center">
        <FaTruck className="text-green-800 text-2xl mb-4" />
        <h4>Free Delivery</h4>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div className="banner__card flex flex-col items-center justify-center text-center">
        <AiFillDollarCircle className="text-green-800 text-2xl mb-4" />
        <h4>100% Money Back Guarantee</h4>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div className="banner__card flex flex-col items-center justify-center text-center">
        <RiUserVoiceFill className="text-green-800 text-2xl mb-4" />
        <h4>Strong Support</h4>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
    </section>
  );
};

export default PromoBanner;
