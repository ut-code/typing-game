import { Routes, Route } from "react-router-dom";
import Setup from "./pages/setup";
import Play from "./pages/play";
import Result from "./pages/result";
import KeyboardLayoutCreator from "./pages/keyboardLayoutCreator";
import Physical from "./pages/keyboardLayoutCreator/physical";
import Functional from "./pages/keyboardLayoutCreator/functional";
import Test from "./pages/keyboardLayoutCreator/test";
import "./components/css/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Setup />}></Route>
        <Route path="/play" element={<Play />}></Route>
        <Route path="/result/:uuid" element={<Result />}></Route>
        <Route
          path="/keyboard-layout-creator"
          element={<KeyboardLayoutCreator />}
        ></Route>
        <Route
          path="/keyboard-layout-creator/physical"
          element={<Physical />}
        ></Route>
        <Route
          path="/keyboard-layout-creator/functional"
          element={<Functional />}
        ></Route>
        <Route path="/keyboard-layout-creator/test" element={<Test />}></Route>
      </Routes>
    </>
  );
}
