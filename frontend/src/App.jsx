import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/home/Home";
import Footer from "./components/Footer";
import CategoryPage from "./pages/category/CategoryPage";
import Search from "./pages/search/Search";
import ShopPage from "./pages/shop/ShopPage";
import SingleProduct from "./pages/shop/productDetails/SingleProduct";

function App() {
  return (
    <BrowserRouter
      future={{ v7_startTransition: true, v7_relativeSplatPath: true }}
    >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories/:categoryName" element={<CategoryPage />} />
        <Route path="/search" element={<Search />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:id" element={<SingleProduct />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
