import { StyleSheet } from "react-native";
import vh from "../../Units/vh";
import vw from "../../Units/vw";
import { Fonts } from "../../assets/fonts";

import { store } from "../../WooCommerceWrapper/store";
const state = store.getState();
const config = state.ConfigReducer;
const { primaryColor } = config;
export default StyleSheet.create({
  text: {
    fontSize: 2.5 * vh,
    fontFamily: Fonts.BM,
    color: primaryColor,
  },
});
