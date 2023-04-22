import React from "react";
import { Link } from "react-router-dom";

export default function BackToHome(): JSX.Element {
  return (
    <nav>
      <Link to="/">Homeへ戻る</Link>
    </nav>
  );
}
