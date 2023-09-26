import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages";
import Basic from "./pages/Basic";
import Result from "./pages/Result";
import KeyboardLayoutCreatorHome from "./pages/KeyboardLayoutCreator";
import KeyboardLayoutCreatorPhysical from "./pages/KeyboardLayoutCreator/Physical";
import KeyboardLayoutCreatorFunctional from "./pages/KeyboardLayoutCreator/Functional";
import Keyboard from "./pages/KeyboardLayoutCreator/Keyboard";
import "./components/css/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/basic" element={<Basic />}></Route>
        <Route path="/result" element={<Result />}></Route>
        <Route
          path="/keyboard-layout-creator"
          element={<KeyboardLayoutCreatorHome />}
        ></Route>
        <Route
          path="/keyboard-layout-creator/physical"
          element={<KeyboardLayoutCreatorPhysical />}
        ></Route>
        <Route
          path="/keyboard-layout-creator/functional"
          element={<KeyboardLayoutCreatorFunctional />}
        ></Route>
        <Route
          path="/keyboard-layout-creator/test"
          element={<Keyboard />}
        ></Route>
      </Routes>
    </>
  );
}
