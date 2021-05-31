import { StyleSheet } from 'react-native'
import vh from '../../Units/vh'
import vw from '../../Units/vw'
import { store } from '../../WooCommerceWrapper/store';
const state = store.getState()
const config = state.ConfigReducer
const {
  primary_heading_color,
  primary_section_color,
  primary_font_color,
  secondary_font_color,
  primaryColor,
  secondaryColor,
  primary_placeholder_Color,
  primary_border_color,
  primary_background_color,
  secondary_background_color,
  primary_message_color,
  drawer_Active_Color,
  drawer_inActive_Color,
  default_color,
} = config

export default StyleSheet.create({
    bg: { flex: 1, width: "100%" },
    logo: { width: vw * 50, height: vh * 13, marginTop: vh * 5, alignSelf: "center" },
    container: { paddingHorizontal: vw * 5, marginTop: vh * 5 },
    SignUp: { color: secondary_font_color, fontSize: vh * 2.8 },
    detail: { color: primary_heading_color, fontSize: vh * 2, marginBottom: vh * 2 },
    field: { width: "100%", marginBottom: vh * 2 },
    row: { flexDirection: "row", alignItems: "center", alignSelf: "center", marginTop: vh * 25 },
    haveAccount: { color: primary_heading_color, fontSize: vh * 2 },
    signin: { color: primary_font_color, fontSize: vh * 2, textDecorationLine: "underline" },
    forgot: { color: secondary_font_color, fontSize: vh * 2, textDecorationLine: "underline", textAlign: "right", marginBottom: vh * 4 }
})