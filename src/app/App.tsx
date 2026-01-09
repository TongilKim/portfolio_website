import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Home } from "../pages/Home";
import { FAQ } from "../pages/FAQ";
import { Process } from "../pages/Process";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/process" element={<Process />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
