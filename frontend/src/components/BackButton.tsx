import { Link } from "react-router-dom"

import "bootstrap/dist/css/bootstrap.min.css"
import { Button } from "react-bootstrap"

import "./css/global.css"

export default function BackButton() {
  return (
    <Link to="/">
      <Button variant="secondary" className="backbutton">
        Back
      </Button>
    </Link>
  )
}
