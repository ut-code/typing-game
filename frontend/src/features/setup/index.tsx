import "./style.css";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

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
