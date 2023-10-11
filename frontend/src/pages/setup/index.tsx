import "./style.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SetupForm from "../../features/setup/SetupForm";
import HowToPlay from "../../features/setup/HowToPlay";

export default function Setup() {
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
