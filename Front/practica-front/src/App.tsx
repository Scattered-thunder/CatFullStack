import "./App.css";
import Cats from "./pages/Cats";
import Home from "./pages/Home";
import LogIn from "./pages/LogIn";
import { BrowserRouter, Route, Routes } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cats" element={<Cats />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
