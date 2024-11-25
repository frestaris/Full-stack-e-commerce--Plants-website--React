import { Link } from "react-router-dom";
import { FaSearch, FaShoppingBasket, FaUser } from "react-icons/fa";

const Navbar = () => {
  return (
    <header className="fixed-nav-bar w-nav">
      <nav className="max-w-screen-2xl mx-auto px-4 flex justify-between items-center">
        <ul className="nav__links">
          <li className="link">
            <Link to="/">Home</Link>
          </li>
          <li className="link">
            <Link to="/shop">Shop</Link>
          </li>
          <li className="link">
            <Link to="/pages">Pages</Link>
          </li>
          <li className="link">
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
        <div className="nav__logo">
          <Link to="/">Logo</Link>
        </div>

        <div className="nav__icons relative">
          <span>
            <Link to="/search">
              <FaSearch />
            </Link>
          </span>
          <span className="relative">
            <button className="hover:text-green-800 relative mt-2">
              <FaShoppingBasket className="text-xl" />
              <sup className="absolute -top-2 -right-2 text-xs px-1.5 bg-red-500 text-white rounded-full">
                0
              </sup>
            </button>
          </span>
          <span>
            <Link to="/login">
              <FaUser />
            </Link>
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
