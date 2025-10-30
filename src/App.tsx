import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/not-found";
import Home from "./pages/home";
import SignupPage from "./pages/signup";
import { Toaster } from "sonner";
import PrivacPolicy from "./pages/privacy-policy";
import Header from "./components/header";

function App() {
  return (
    <BrowserRouter>
          <Header />

      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/creators" element={<SignupPage />} />
        <Route path="/privacy-policy" element={<PrivacPolicy />} />

        <Route path="*" element={<NotFound />} />
      </Routes>{" "}
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
