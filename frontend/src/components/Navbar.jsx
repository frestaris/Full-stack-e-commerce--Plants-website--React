import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingBasket, FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import CartModal from "../pages/shop/CartModal";
import { useLogoutUserMutation } from "../redux/features/auth/authApi";
import { logout } from "../redux/features/auth/authSlice";

const Navbar = () => {
  const products = useSelector((state) => state.cart.products);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const [logoutUser] = useLogoutUserMutation();

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // admin dropdown menus
  const adminDropdownMenus = [
    {
      label: "Dashboard",
      path: "/dashboard/admin",
    },
    {
      label: "Manage Items",
      path: "/dashboard/admin/manage-products",
    },
    {
      label: "All Orders",
      path: "/dashboard/admin/manage-orders",
    },
    {
      label: "Add New Post",
      path: "/dashboard/admin/add-new-post",
    },
  ];

  // user dropdown menus
  const userDropdownMenus = [
    {
      label: "Dashboard",
      path: "/dashboard",
    },
    {
      label: "Profile",
      path: "/dashboard/profile",
    },
    {
      label: "Payments",
      path: "/dashboard/payments",
    },
    {
      label: "Orders",
      path: "/dashboard/orders",
    },
  ];

  const dropdownMenus =
    user?.role === "admin" ? [...adminDropdownMenus] : [...userDropdownMenus];

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Failed to logout", error);
    }
  };

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
          <Link to="/">
            <img
              className=""
              src="https://static.vecteezy.com/system/resources/thumbnails/012/578/976/small/leaf-and-pot-icon-potted-plant-icon-trendy-design-leaf-on-pot-icon-garden-logo-illustration-vector.jpg"
              alt="logo image"
            />
          </Link>
        </div>

        <div className="nav__icons relative">
          <span>
            <Link to="/search">
              <FaSearch />
            </Link>
          </span>
          <span className="relative">
            <button
              onClick={handleCartToggle}
              className="hover:text-green-800 relative mt-2"
            >
              <FaShoppingBasket className="text-xl" />
              <sup className="absolute -top-2 -right-2 text-xs px-1.5 bg-red-500 text-white rounded-full">
                {products.length}
              </sup>
            </button>
          </span>
          <span>
            {user ? (
              <>
                <img
                  onClick={handleDropdownToggle}
                  src={
                    user.profileImage ||
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  alt="profile picture"
                  className="size-8 rounded-full cursor-pointer"
                />
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-3 p-4 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <ul className="font-medium space-y-4 p-2">
                      {dropdownMenus.map((menu, index) => (
                        <li key={index}>
                          <Link
                            onClick={() => setIsDropdownOpen(false)}
                            className="dropdown-items"
                            to={menu.path}
                          >
                            {menu.label}
                          </Link>
                        </li>
                      ))}
                      <hr />
                      <li>
                        <Link className="dropdown-items" onClick={handleLogout}>
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </div>
                )}
              </>
            ) : (
              <Link to="/login">
                <FaUser />
              </Link>
            )}
          </span>
        </div>
      </nav>
      {isCartOpen && (
        <CartModal
          products={products}
          isOpen={isCartOpen}
          onClose={handleCartToggle}
        />
      )}
    </header>
  );
};

export default Navbar;
