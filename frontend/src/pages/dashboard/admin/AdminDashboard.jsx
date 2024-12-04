import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useLogoutUserMutation } from "../../../redux/features/auth/authApi";
import { logout } from "../../../redux/features/auth/authSlice";

const navItems = [
  { path: "/dashboard/admin", label: "Dashboard" },
  { path: "/dashboard/admin/add-new-post", label: "Add New Product" },
  { path: "/dashboard/admin/manage-products", label: "Manage products" },
  { path: "/dashboard/admin/manage-orders", label: "Manage Orders" },
  { path: "/dashboard/admin/users", label: "Users" },
];

const AdminDashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();

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
    <div className="space-y-5 bg-white p-8 md:h-screen flex flex-col justify-between">
      <div>
        <div>
          <p className="text-md italic">
            {user.username.charAt(0).toUpperCase() + user.username.slice(1)}'s
            dashboard
          </p>
        </div>
        <hr className="mt-5" />
        <ul className="space-y-5 pt-5">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "text-green-500 font-bold" : "text-black"
                }
                end
                to={item.path}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-3">
        <hr className="mb-3" />
        <button
          onClick={handleLogout}
          className="text-white bg-primary font-medium px-5 py-1 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
