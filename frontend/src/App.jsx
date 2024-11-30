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

function App() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <ToastContainer position="top-center" autoClose={2000} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories/:categoryName" element={<CategoryPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:id" element={<SingleProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/success" element={<div>When payment is succeed</div>} />
        <Route path="/cancel" element={<ShopPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
