import {StyleSheet} from 'react-native';
import vw from '../../Units/vw';
import vh from '../../Units/vh';
import {Fonts} from '../../assets/fonts';

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
  container: {flexDirection: 'row', alignItems: 'center'},
  btn: {
    backgroundColor: primary_border_color,
    width: vw * 6.5,
    height: vw * 6.5,
    borderRadius: vw * 3.75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {height: vw * 3.5, width: vw * 3.5},
  text: {
    color: primary_font_color,
    fontSize: vh * 3,
    paddingHorizontal: vw * 4,
  },
});
