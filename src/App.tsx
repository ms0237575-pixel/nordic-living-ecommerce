import React, { Suspense, lazy, useEffect } from "react";
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

const Home = lazy(() => import("@/pages/Home"));
const About = lazy(() => import("@/pages/About"));
const Cart = lazy(() => import("@/pages/Cart"));
const Checkout = lazy(() => import("@/pages/Checkout"));
const Orders = lazy(() => import("@/pages/Orders"));
const Shop = lazy(() => import("@/pages/Shop"));
const Wishlist = lazy(() => import("@/pages/Wishlist"));
const ProductDetails = lazy(() => import("@/pages/ProductDetails"));
const Login = lazy(() => import("@/pages/Login"));
const Register = lazy(() => import("@/pages/Register"));
const OrderSuccess = lazy(() => import("@/pages/OrderSuccess"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const AdminDashboard = lazy(() => import("@/pages/admin/AdminDashboard"));
const AdminProducts = lazy(() => import("@/pages/admin/AdminProducts"));
const AdminOrders = lazy(() => import("@/pages/admin/AdminOrders"));

export default function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out",
      disable: "mobile",
    });
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
              <Suspense
                fallback={
                  <div className="flex min-h-screen items-center justify-center font-sans text-sm tracking-widest uppercase">
                    Loading...
                  </div>
                }
              >
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
              </Suspense>
            </ErrorBoundary>
          </main>

          <Footer />
        </div>
      </ReactLenis>
    </Router>
  );
}
