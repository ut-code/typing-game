import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Image } from "react-bootstrap";

import logo from "/logo.png";

export default function Header() {
  return (
    <header>
      {/* <b>ut.code(); タイピングゲーム</b> */}
      <Image src={logo} alt={"タイピングゲーム by ut.code();"} />
    </header>
  );
}
