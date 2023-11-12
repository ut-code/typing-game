import { Link } from "react-router-dom";

import { Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

export default function BackButton() {
  const Navigate = useNavigate();
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      Navigate("/");
    }
  });

  return (
    <Link to="/">
      <Button variant="secondary" className="backbutton">
        Back
      </Button>
    </Link>
  );
}
