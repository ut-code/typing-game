import "./style.css";

// コンポーネント
import Header from "../components/Header";
import Footer from "../components/Footer";

import HowToPlay from "../features/game-setup/components/setup-form/components/HowToPlay";
import SetupForm from "../features/game-setup/components/setup-form";

export default function Home() {
  return (
    <>
      <Header />
      <div className="elements">
        <SetupForm />
        <HowToPlay />
      </div>
      <Footer />
    </>
  );
}
