import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/not-found";
import Home from "./pages/home";
import SignupPage from "./pages/signup";
import WaitlistPage from "./pages/waitlist";
import { Toaster } from "sonner";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/creators" element={<SignupPage />} />
        <Route path="/waitlist" element={<WaitlistPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>{" "}
              <Toaster />

    </BrowserRouter>
  );
}

export default App;
