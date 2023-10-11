import "./style.css";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
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
