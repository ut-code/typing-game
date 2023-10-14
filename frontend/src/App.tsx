import { Routes, Route } from "react-router-dom";
import GameSetup from "./pages";
import PlayScreen from "./pages/play";
import TypingResult from "./pages/result";
import KeyboardLayoutCreator from "./features/keyboard-layout-creator";
import Physical from "./features/keyboard-layout-creator/physical";
import Functional from "./features/keyboard-layout-creator/functional";
import Test from "./features/keyboard-layout-creator/test";
import "./components/css/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<GameSetup />}></Route>
        <Route path="/play" element={<PlayScreen />}></Route>
        <Route path="/result/:uuid" element={<TypingResult />}></Route>
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
