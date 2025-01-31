import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import Footer from "./components/Footer";
import CategoryPage from "./pages/category/CategoryPage";
import Search from "./pages/search/Search";
import ShopPage from "./pages/shop/ShopPage";
import SingleProduct from "./pages/shop/productDetails/SingleProduct";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Login from "./components/Login";
import Register from "./components/Register";
import PaymentSuccess from "./components/PaymentSuccess";
import PrivateRoute from "./components/PrivateRoute";
import DashboardLayout from "./pages/dashboard/DashboardLayout";
import UserOrders from "./pages/dashboard/user/UserOrders";
import OrderDetails from "./pages/dashboard/user/OrderDetails";
import UserPayments from "./pages/dashboard/user/dashboard/UserPayments";
import UserReviews from "./pages/dashboard/user/dashboard/UserReviews";
import UserProfile from "./pages/dashboard/user/dashboard/UserProfile";
import AddProduct from "./pages/dashboard/admin/addProduct/AddProduct";
import ManageProduct from "./pages/dashboard/admin/manageProducts/ManageProduct";
import UpdateProduct from "./pages/dashboard/admin/manageProducts/UpdateProduct";
import ManageUser from "./pages/dashboard/admin/users/ManageUser";
import ManageOrders from "./pages/dashboard/admin/manageOrders/ManageOrders";
import Contact from "./pages/contact/Contact";

function App() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      {" "}
      <ToastContainer position="top-center" autoClose={2000} />
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/categories/:categoryName" element={<CategoryPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop/:id" element={<SingleProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/success" element={<PaymentSuccess />} />
        <Route path="/cancel" element={<ShopPage />} />
        <Route path="/orders/:orderId" element={<OrderDetails />} />

        {/* User Dashboard */}
        <Route
          path="/dashboard/*"
          element={
            <PrivateRoute role="user">
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route path="orders" element={<UserOrders />} />
          <Route path="payments" element={<UserPayments />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="reviews" element={<UserReviews />} />
        </Route>

        {/* Admin Dashboard */}
        <Route
          path="/dashboard/admin/*"
          element={
            <PrivateRoute role="admin">
              <DashboardLayout />
            </PrivateRoute>
          }
        >
          <Route path="add-product" element={<AddProduct />} />
          <Route path="manage-products" element={<ManageProduct />} />
          <Route path="update-product/:id" element={<UpdateProduct />} />
          <Route path="users" element={<ManageUser />} />
          <Route path="manage-orders" element={<ManageOrders />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
