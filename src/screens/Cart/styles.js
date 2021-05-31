import { StyleSheet } from "react-native";
import vh from "../../Units/vh";
import vw from "../../Units/vw";

import { store } from "../../WooCommerceWrapper/store";
const state = store.getState();
const config = state.ConfigReducer;
const { primaryColor, secondaryColor } = config;
export default StyleSheet.create({
  detailCont: {
    backgroundColor: secondaryColor,
    width: "100%",
    paddingHorizontal: vw * 5,
    paddingVertical: vh * 2,
    borderRadius: vw * 1,
  },
  detailItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: vw * 0.05,
    borderBottomColor: "#727C8E",
    paddingBottom: vh * 1,
    marginBottom: vh * 1,
  },
  detailTxt: { color: primaryColor, fontSize: vh * 1.5 },
});
