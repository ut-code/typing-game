import us_qwerty from "./us_qwerty.json";
import us_dvorak from "./us_dvorak.json";
import azerty from "./azerty.json";
import qwertz from "./qwertz.json";
import us_default from "./us_default.json";
import jis109 from "./JIS109.json";

export const functionalLayoutType = {
  us_qwerty: { name: "US_QWERTY", id: "us_qwerty", content: us_qwerty },
  us_dvorak: { name: "US_Dvorak", id: "us_dvorak", content: us_dvorak },
  azerty: { name: "AZERTY", id: "azerty", content: azerty },
  qwertz: { name: "QWERTZ", id: "qwertz", content: qwertz },
  custom: { name: "Custom", id: "custom", content: us_qwerty },
};
export const physicalLayoutType = {
  us_default: { name: "US_Default", id: "us_default", content: us_default },
  jis109: { name: "JIS109", id: "jis109", content: jis109 },
  custom: { name: "Custom", id: "custom", content: jis109 },
};

export const defaultFunctionalLayoutType = "us_qwerty";

export const defaultPhysicalLayoutType = "us_default";
