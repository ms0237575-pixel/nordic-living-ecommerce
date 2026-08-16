import { BrowserRouter as Router, Routes, Route } from "react-router";
import { Toaster } from "sonner";
import { Check } from "lucide-react";
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
import { ProductDetails } from "@/pages/ProductDetails";
import { Login } from "@/pages/Login";
import { Register } from "@/pages/Register";
import { OrderSuccess } from "@/pages/OrderSuccess";
import { NotFound } from "@/pages/NotFound";

export default function App() {
  return (
    <Router>
      <ScrollToTop />

      <Toaster
        position="bottom-right"
        icons={{
          success: <Check className="h-4 w-4" style={{ color: "#A56B57" }} />,
        }}
        toastOptions={{
          style: {
            background: "#1E1E1C",
            color: "#F7F5F0",
            border: "none",
            borderRadius: "0px",
            fontFamily: "inherit",
            fontSize: "13px",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            padding: "16px 24px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
          },
        }}
      />

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
            <Route path="/order-success" element={<OrderSuccess />} />
            <Route path="/product/:slug" element={<ProductDetails />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}
