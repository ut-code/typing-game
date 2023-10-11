import { Routes, Route } from "react-router-dom";
import Home from "./pages/setup";
import Play from "./pages/play";
import Result from "./pages/result";
import KeyboardLayoutCreatorHome from "./pages/keyboardLayoutCreator";
import KeyboardLayoutCreatorPhysical from "./pages/keyboardLayoutCreator/physical";
import KeyboardLayoutCreatorFunctional from "./pages/keyboardLayoutCreator/functional";
import Keyboard from "./pages/keyboardLayoutCreator/keyboard";
import "./components/css/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/play" element={<Play />}></Route>
        <Route path="/result/:uuid" element={<Result />}></Route>
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
