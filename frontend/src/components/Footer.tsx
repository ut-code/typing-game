import React from "react";
import "./css/global.css";

export default function Footer() {
  return (
    <footer>
      <hr></hr>
      <p>© Copyright {new Date().getFullYear()} ut.code();</p>
    </footer>
  );
}
