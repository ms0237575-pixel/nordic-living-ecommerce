import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Orders from "@/pages/Orders";
import { Shop } from "@/pages/Shop";
import { Wishlist } from "@/pages/Wishlist";
import ProductDetails from "@/pages/ProductDetails";

export default function App() {
  return (
    <Router>
      <ScrollToTop />

      <div className="min-h-screen flex flex-col bg-nordic-bg font-sans text-nordic-charcoal">
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/about" element={<About />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/product/:slug" element={<ProductDetails />} />
            <Route path="/wishlist" element={<Wishlist />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
