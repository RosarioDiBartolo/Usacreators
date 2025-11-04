import { BrowserRouter, Route, Routes, Outlet } from "react-router-dom";
import NotFound from "./pages/not-found";
import Home from "./pages/home";
import SignupPage from "./pages/creators-apply";
import { Toaster } from "sonner";
import PrivacyPolicy from "./pages/privacy-policy";
import Header from "./components/header";
import TermsAndConditions from "./pages/terms-and-conditions";
import CookiePolicy from "./pages/cookie-policy";
import { LegalTermsDialog } from "./components/legal-banner";
import Success from "./pages/success";
import Catalog from "./pages/catalog";

function RootLayout() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <LegalTermsDialog />
      <Routes>
        {/* Layout for pages that share the Header */}
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="catalog" element={<Catalog />} />
        </Route>

        {/* Standalone pages */}
        <Route path="/creators/apply" element={<SignupPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/success" element={<Success />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
