import jis_qwerty from "./jis_qwerty.json";
import us_qwerty from "./us_qwerty.json";
import dvorak from "./dvorak.json";
import azerty from "./azerty.json";
import qwertz from "./qwertz.json";
import us_default from "./us_default.json";
import jis109 from "./jis109.json";

export const functionalLayoutType = {
  jis_qwerty: { content: jis_qwerty },
  us_qwerty: { content: us_qwerty },
  dvorak: { content: dvorak },
  azerty: { content: azerty },
  qwertz: { content: qwertz },
  custom: { content: jis_qwerty },
};
export const physicalLayoutType = {
  us_default: { content: us_default },
  jis109: { content: jis109 },
  custom: { content: jis109 },
};

export const layoutType = {
  jis_qwerty: { name: "JIS QWERTY", id: "jis_qwerty", functionalLayoutType: "jis_qwerty", physicalLayoutType: "jis109" },
  mac_jis_qwerty: { name: "Mac JIS QWERTY", id: "mac_jis_qwerty", functionalLayoutType: "mac_jis_qwerty", physicalLayoutType: "jis109" },
  us_qwerty: { name: "US QWERTY", id: "us_qwerty", functionalLayoutType: "us_qwerty", physicalLayoutType: "us_default" },
  dvorak: { name: "Dvorak", id: "dvorak", functionalLayoutType: "dvorak", physicalLayoutType: "jis109" },
  azerty: { name: "AZERTY", id: "azerty", functionalLayoutType: "azerty", physicalLayoutType: "jis109" },
  qwertz: { name: "QWERTZ", id: "qwertz", functionalLayoutType: "qwertz", physicalLayoutType: "jis109" },
  custom: { name: "Custom", id: "custom", functionalLayoutType: "custom", physicalLayoutType: "custom" },
};

export const defaultFunctionalLayoutType = "jis_qwerty";

export const defaultPhysicalLayoutType = "jis109";

export const defaultlayoutType = "jis_qwerty";
