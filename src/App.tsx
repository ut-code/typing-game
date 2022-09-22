import React, { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Functional from "./pages/Home/Functional/Functional";
import Physical from "./pages/Home/Physical/Physical";

export default function App(): JSX.Element {
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
