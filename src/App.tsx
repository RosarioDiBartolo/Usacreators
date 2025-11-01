import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/not-found";
import Home from "./pages/home";
import SignupPage from "./pages/creators-apply";
import { Toaster } from "sonner";
import PrivacPolicy from "./pages/privacy-policy";
import Header from "./components/header";
import TermsAndConditions from "./pages/terms-and-conditions";
import CookiePolicy from "./pages/cookie-policy";
import { LegalTermsDialog } from "./components/legal-banner";


function App() {
  return (
    <BrowserRouter>
           
      <LegalTermsDialog />

      <Routes>
        <Route path="/" index element={
          <>
          <Header />
          <Home />
          </> } />
        <Route path="/creators/apply" element={<SignupPage />} />
        <Route path="/privacy-policy" element={<PrivacPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />

        <Route path="*" element={<NotFound />} />
      </Routes>{" "}
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
