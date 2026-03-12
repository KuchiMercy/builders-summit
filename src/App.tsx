import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import PartnerWithUs from "./pages/PartnerWithUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Analytics from "./pages/Analytics";
import "./App.css";

// ScrollToTop component to handle scrolling on route change
const ScrollToTop = () => {
  const { pathname, state } = useLocation();

  useEffect(() => {
    if (state && (state as any).scrollTo) {
      const element = document.getElementById((state as any).scrollTo);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, state]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/partner-with-us" element={<PartnerWithUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </Router>
  );
}

export default App;
