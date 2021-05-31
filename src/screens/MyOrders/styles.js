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
  btn: {
    width: '33.3333%',
    height: vh * 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: secondaryColor,
    borderRightWidth: vw * 0.06,
    borderRightColor: 'rgba(112,112,112,.2)',
  },
  btnTxt: {fontSize: vh * 2, color: primary_heading_color},
  pinkBg: {backgroundColor: primary_font_color},
  whiteTxt: {color: secondaryColor},
  tabs: {
    flexDirection: 'row',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    borderRadius: vw * 3,
    elevation: 3,
  },
  borderLeft: {
    borderTopLeftRadius: vw * 2,
    borderBottomLeftRadius: vw * 2,
  },
  borderRight: {
    borderTopRightRadius: vw * 2,
    borderBottomRightRadius: vw * 2,
  },
  card: {
    width: '100%',
    backgroundColor: secondaryColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    borderRadius: vw * 1,
    elevation: 3,
    paddingHorizontal: vw * 5,
    paddingVertical: vh * 1.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: vh * 2,
  },
  orderTxt: {
    color: primary_heading_color,
    fontSize: vh * 1.8,
    marginBottom: vh * 1.5,
  },
  statusCont: {
    backgroundColor: '#FFB507',
    height: vh * 4.5,
    borderRadius: vh * 2.25,
    width: vw * 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusTxt: {color: secondaryColor, fontSize: vh * 1.8},
  price: {color: primary_font_color, fontSize: vh * 2.7},
  priceCont: {alignItems: 'center', justifyContent: 'space-between'},
});
