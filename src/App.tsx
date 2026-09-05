import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import { ReactLenis } from "@studio-freight/react-lenis";
import AOS from "aos";
import "aos/dist/aos.css";
import { Toaster } from "sonner";
import { Check } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";

import Home from "@/pages/Home";
import About from "@/pages/About";
import Cart from "@/pages/Cart";
import Checkout from "@/pages/Checkout";
import Orders from "@/pages/Orders";
import Shop from "@/pages/Shop";
import Wishlist from "@/pages/Wishlist";
import ProductDetails from "@/pages/ProductDetails";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import OrderSuccess from "@/pages/OrderSuccess";
import NotFound from "@/pages/NotFound";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import AdminProducts from "@/pages/admin/AdminProducts";
import AdminOrders from "@/pages/admin/AdminOrders";

/**
 * Root application component — sets up global providers, routing, and layout.
 * Initializes global libraries (AOS for scroll animations) in a safe, non-fatal way.
 */
export default function App() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      AOS.init({
        duration: 800,
        once: true,
        easing: "ease-out",
        disable: "mobile",
      });
    } catch (err) {
      // AOS failure is non-fatal — avoid surfacing initialization errors to users.
      // Intentionally not logging here to keep console output clean for production.
    }
  }, []);

  return (
    <Router>
      <ReactLenis
        root
        options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}
      >
        <ScrollToTop />

        <Toaster
          position="bottom-right"
          icons={{
            success: (
              <Check
                className="h-4 w-4"
                style={{ color: "var(--color-nordic-terracotta)" }}
              />
            ),
          }}
          toastOptions={{
            style: {
              background: "var(--color-nordic-charcoal)",
              color: "var(--color-nordic-bg)",
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

        <div className="min-h-screen w-full overflow-x-hidden flex flex-col bg-nordic-bg font-sans text-nordic-charcoal">
          <Navbar />

          <main className="flex-1 w-full overflow-x-hidden pt-20 md:pt-0">
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/about" element={<About />} />
                <Route path="/cart" element={<Cart />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/products" element={<AdminProducts />} />
                  <Route path="/admin/orders" element={<AdminOrders />} />
                </Route>
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/product/:slug" element={<ProductDetails />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
          </main>

          <Footer />
        </div>
      </ReactLenis>
    </Router>
  );
}
