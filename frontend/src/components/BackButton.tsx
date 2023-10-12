import { Link } from "react-router-dom";

import { Button } from "react-bootstrap";

export default function BackButton() {
  return (
    <Link to="/">
      <Button variant="secondary" className="backbutton">
        Back
      </Button>
    </Link>
  );
}
