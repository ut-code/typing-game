import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Functional from "./components/Functional";
import Physical from "./components/Physical";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/physical" element={<Physical />}></Route>
        <Route path="/functional" element={<Functional />}></Route>
      </Routes>
    </>
  );
}
