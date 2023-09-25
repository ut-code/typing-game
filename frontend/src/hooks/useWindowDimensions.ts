import { useState, useEffect } from "react";

type WindowDimensions = { width: number; height: number };

export default function useWindowDimensions(): WindowDimensions {
  function getWindowDimensions(): WindowDimensions {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
  }
  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>(
    getWindowDimensions(),
  );
  useEffect(() => {
    function onResize(): void {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  return windowDimensions;
}
