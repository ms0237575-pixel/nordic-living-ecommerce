import { useEffect } from "react";
import { useLocation } from "react-router";
/**
 * ScrollToTop helper — resets scroll position when the route pathname changes.
 * Used to ensure navigation jumps to top for new pages.
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });
  }, [pathname]);

  return null;
}

export default ScrollToTop;
