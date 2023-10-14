import "./style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SetupForm from "./components/setup-form";
import HowToPlay from "./components/how-to-play";

export default function GameSetup() {
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
