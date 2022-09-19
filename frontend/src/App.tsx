import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Basic from "./pages/Basic/Basic";
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
