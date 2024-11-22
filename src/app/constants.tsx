import { ImageSourcePropType } from "react-native";

// Static mapping of car images
export const carImages: { [key: string]: ImageSourcePropType } = {
    "chevrolet_cruze": require("./images/cars/chevrolet_cruze.png"),
    "chevrolet_malibu": require("./images/cars/chevrolet_malibu.png"),
    "chevrolet_trax": require("./images/cars/chevrolet_trax.png"),
    "ford_ecosport": require("./images/cars/ford_ecosport.png"),
    "ford_focus": require("./images/cars/ford_focus.png"),
    "ford_fusion": require("./images/cars/ford_fusion.png"),
    "honda_accord": require("./images/cars/honda_accord.png"),
    "honda_civic": require("./images/cars/honda_civic.png"),
    "honda_fit": require("./images/cars/honda_fit.png"),
    "honda_hr-v": require("./images/cars/honda_hr-v.png"),
    "mazda_3": require("./images/cars/mazda_3.png"),
    "mazda_6": require("./images/cars/mazda_6.png"),
    "mazda_cx-3": require("./images/cars/mazda_cx-3.png"),
    "nissan_altima": require("./images/cars/nissan_altima.png"),
    "nissan_sentra": require("./images/cars/nissan_sentra.png"),
    "nissan_versa": require("./images/cars/nissan_versa.png"),
    "toyota_camry": require("./images/cars/toyota_camry.png"),
    "toyota_corolla": require("./images/cars/toyota_corolla.png"),
    "toyota_hilux": require("./images/cars/toyota_hilux.png"),
    "toyota_yaris": require("./images/cars/toyota_yaris.png"),
};


export const primary_color = "#00a3cc";

export default { carImages };