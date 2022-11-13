import us_qwerty from "./us_qwerty.json";
import us_dvorak from "./us_dvorak.json";
import azerty from "./azerty.json";
import qwertz from "./qwertz.json";
import us_default from "./us_default.json";
import jis109 from "./JIS109.json";

export const layoutType = {
  us_qwerty: { name:"US QWERTY", id:"us_qwerty", functionalLayoutType: "us_qwerty", physicalLayoutType: "us_default" },
  jis_qwerty: {name:"JIS109 QWERTY", id:"jis_qwerty", functionalLayoutType: "us_qwerty", physicalLayoutType: "jis109" },
  us_dvorak: { name:"Dvorak", id:"us_dvorak", functionalLayoutType: "us_dvorak", physicalLayoutType: "us_default" },
  azerty: { name:"AZERTY", id:"azerty", functionalLayoutType: "azerty", physicalLayoutType: "us_default" },
  qwertz: { name:"QWERTZ", id:"qwertz", functionalLayoutType: "qwertz", physicalLayoutType: "us_default" },
  custom: { name:"Custom", id:"custom", functionalLayoutType: "custom", physicalLayoutType: "custom" },
};

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
  custom: { name: "Custom", id: "custom", content: us_default },
};

export const defaultlayoutType="us_qwerty";

export const defaultFunctionalLayoutType = "us_qwerty";

export const defaultPhysicalLayoutType = "us_default";
