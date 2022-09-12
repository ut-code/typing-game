import Keyboard from "./components/keyboard";

export default function App() {
  return (
    <>
      <select name="functional-layout" id="functional">
        <option value="qwerty">QWERTY</option>
        <option value="dvorak">Dvorak</option>
      </select>
      <Keyboard></Keyboard>
    </>
  );
}
