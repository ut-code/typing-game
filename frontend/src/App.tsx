import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Basic from "./pages/Home/Basic/Basic";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/basic" element={<Basic />}></Route>
      </Routes>
    </>
  );
}
