import qwerty from "./qwerty.json";
import dvorak from "./dvorak.json";
import azerty from "./azerty.json";
import qwertz from "./qwertz.json";
import jis109 from "./JIS109.json";

export const functionalLayoutType = {
  qwerty: { name: "QWERTY", id: "qwerty", content: qwerty },
  dvorak: { name: "Dvorak", id: "dvorak", content: dvorak },
  azerty: { name: "AZERTY", id: "azerty", content: azerty },
  qwertz: { name: "QWERTZ", id: "qwertz", content: qwertz },
  custom: { name: "Custom", id: "custom", content: qwerty },
};
export const physicalLayoutType = {
  jis109: { name: "JIS109", id: "jis109", content: jis109 },
  custom: { name: "Custom", id: "custom", content: jis109 },
};
