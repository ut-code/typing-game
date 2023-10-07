import "./style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import HowToPlay from "./components/HowToPlay";
import SetupForm from "./components/setup-form";

export default function GameSetup(): JSX.Element {
  return (
    <>
      <Header />
      <div style={{ width: "40em", margin: "auto" }}>
        <SetupForm />
        <HowToPlay />
      </div>
      <Footer />
    </>
  );
}
