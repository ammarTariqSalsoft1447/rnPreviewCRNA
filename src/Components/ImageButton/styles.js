import { StyleSheet } from "react-native";
import vh from "../../Units/vh";
import vw from "../../Units/vw";
import { Fonts } from '../../assets/fonts';
import {
    primaryColor,
    secondary_font_color,
    secondaryColor
} from '../../../config.json';
export default StyleSheet.create({
    container: {
        width: "100%", backgroundColor: secondary_font_color, height: vh * 7, borderRadius: vw * 10,
        justifyContent: "center", alignItems: "center",
        shadowColor: primaryColor,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6, flexDirection: "row"
    },
    label: { fontSize: vw * 3.5, color: secondaryColor },
    image: { width: vw * 5, height: vh * 2, marginLeft: vw * 5, top: vh * .3 }
})