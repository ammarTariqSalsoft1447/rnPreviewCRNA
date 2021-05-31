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
  label: {color: drawer_inActive_Color, fontSize: vh * 1.6},
  userfield: {
    color: primaryColor,
    fontSize: vh * 2,
    borderBottomWidth: vw * 0.09,
    borderColor: 'rgba(112,112,112,.3)',
    paddingVertical: vh * 1,
    marginBottom: vh * 1.5,
  },
  changePassword: {
    color: primary_font_color,
    fontSize: vh * 1.5,
    textDecorationLine: 'underline',
    textAlign: 'right',
    marginTop: vh * 1.5,
    marginBottom: vh * 1.5,
  },
  btn: {marginTop: vh * 2},
  input: {width: '100%', marginTop: vh * 1, marginBottom: vh * 1.5},
});
