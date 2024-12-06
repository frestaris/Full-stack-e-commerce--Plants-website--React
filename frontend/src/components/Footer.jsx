import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <>
      <footer className="section__container footer__container">
        <div className="footer__col">
          <h4>CONTACT INFO</h4>
          <div className="flex flex-col space-y-4">
            <span className="flex items-center">
              <FaMapMarkerAlt className="mr-2 text-green-800" /> 123 Greenhouse
              Lane, Plant City, FL 12345
            </span>
            <span className="flex items-center">
              <MdEmail className="mr-2 text-green-800" /> support@plantstore.com
            </span>
            <span className="flex items-center">
              <FaPhoneAlt className="mr-2 text-green-800" /> +1 (234) 567-890
            </span>
          </div>
        </div>
        <div className="footer__col">
          <h4>COMPANY</h4>
          <a href="/">Home</a>
          <a href="/">About Us</a>
          <a href="/">Work With Us</a>
          <a href="/">Our Blogs</a>
          <a href="/">Terms & Conditions</a>
        </div>
        <div className="footer__col">
          <h4>USEFUL LINKS</h4>
          <a href="/">Help</a>
          <a href="/">Track My Order</a>
          <a href="/">Indoor Plants</a>
          <a href="/">Outdoor Plants</a>
          <a href="/">Plant Accessories</a>
        </div>
        <div className="footer__col">
          <h4>SOCIALS</h4>
          <div className="flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook className="text-2xl" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter className="text-2xl" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram className="text-2xl" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="text-2xl" />
            </a>
          </div>
        </div>
      </footer>
      <div className="footer__bar">
        Copyright © {new Date().getFullYear()}. All rights reserved.
      </div>
    </>
  );
};

export default Footer;
