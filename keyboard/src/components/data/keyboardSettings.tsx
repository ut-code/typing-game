import jis_qwerty from "./jis_qwerty.json";
import mac_jis_qwerty from "./mac_jis_qwerty.json";
import mac_us_qwerty from "./mac_us_qwerty.json";
import dvorak from "./dvorak.json";
import azerty from "./azerty.json";
import qwertz from "./qwertz.json";
import us_default from "./us_default.json";
import jis109 from "./jis109.json";
import dvorak_jis from "./dvorak_jis.json";
import azerty_jis from "./azerty_jis.json";

export const functionalLayoutType = {
  jis_qwerty: { content: jis_qwerty },
  mac_jis_qwerty: { content: mac_jis_qwerty },
  mac_us_qwerty: { content: mac_us_qwerty },
  dvorak: { content: dvorak },
  azerty: { content: azerty },
  qwertz: { content: qwertz },
  custom: { content: jis_qwerty },
};
export const physicalLayoutType = {
  us_default: { content: us_default },
  jis109: { content: jis109 },
  dvorak_jis: { content: dvorak_jis },
  azerty_jis: { content: azerty_jis },
  custom: { content: jis109 },
};

export const layoutType = {
  jis_qwerty: { name: "JIS QWERTY", id: "jis_qwerty", functionalLayoutType: "jis_qwerty", physicalLayoutType: "jis109" },
  mac_jis_qwerty: { name: "Mac JIS QWERTY", id: "mac_jis_qwerty", functionalLayoutType: "mac_jis_qwerty", physicalLayoutType: "jis109" },
  mac_us_qwerty: { name: "Mac US QWERTY", id: "mac_us_qwerty", functionalLayoutType: "mac_us_qwerty", physicalLayoutType: "us_default" },
  dvorak: { name: "Dvorak", id: "dvorak", functionalLayoutType: "dvorak", physicalLayoutType: "dvorak_jis" },
  azerty: { name: "AZERTY", id: "azerty", functionalLayoutType: "azerty", physicalLayoutType: "azerty_jis" },
  qwertz: { name: "QWERTZ", id: "qwertz", functionalLayoutType: "qwertz", physicalLayoutType: "jis109" },
  custom: { name: "Custom", id: "custom", functionalLayoutType: "custom", physicalLayoutType: "custom" },
};

export const defaultFunctionalLayoutType = "jis_qwerty";

export const defaultPhysicalLayoutType = "jis109";

export const defaultlayoutType = "jis_qwerty";
