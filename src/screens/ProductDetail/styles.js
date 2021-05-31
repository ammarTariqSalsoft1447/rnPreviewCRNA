import {StyleSheet} from 'react-native';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
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
  dot: {
    width: vw * 6,
    height: vh * 1.2,
    borderRadius: vh * 0.8,
    backgroundColor: primary_font_color,
  },
  inactiveDot: {
    width: vw * 2.6,
    height: vw * 2.6,
    borderRadius: vw * 1.3,
    backgroundColor: primary_border_color,
  },
  card: {
    height: vh * 75,
    marginTop: 0,
    borderTopLeftRadius: vw * 5,
    borderTopRightRadius: vw * 5,
    backgroundColor: secondary_background_color,
    paddingHorizontal: vw * 4,
    elevation: 25,
    width: '100%',
    shadowColor: primaryColor,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  pname: {color: primaryColor, fontSize: vh * 2.8},
  catName: {color: drawer_inActive_Color, fontSize: vh * 2.1, marginTop: vh * 2},
  featureCont: {marginTop: vh * 1.5},
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: vh * 1.5,
  },
  listpoint: {
    width: vw * 2.2,
    height: vw * 2.5,
    borderRadius: vw * 1.25,
    backgroundColor: primary_font_color,
    marginRight: vw * 3,
  },
  featureTxt: {color: primary_heading_color, fontSize: vh * 1.8},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {color: primary_font_color, fontSize: vh * 3},
  btn: {marginTop: vh * 3},
});
