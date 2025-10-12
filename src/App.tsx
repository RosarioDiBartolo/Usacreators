  
 import { BrowserRouter, Route, Routes } from "react-router-dom";
import NotFound from "./pages/not-found";
import Home from "./pages/home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Home />} />
         <Route path="*" element={<NotFound />} />
      </Routes>{" "}
    </BrowserRouter>
  );
}

export default App;
