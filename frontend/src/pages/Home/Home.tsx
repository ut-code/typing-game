import { useEffect } from "react";
// @ts-ignore
import script from "./script.js";
import "./style.css";

export default function Home() {
  useEffect(() => {
    script();
  }, []);
  return (
    <>
      <p>ほげほげ</p>
    </>
  );
}
