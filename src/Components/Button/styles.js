import {StyleSheet} from 'react-native';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
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
  container: {
    width: '100%',
    backgroundColor: secondary_font_color,
    height: vh * 6.5,
    borderRadius: vw * 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: primaryColor,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
  label: {fontSize: vw * 3.5, color: secondaryColor},
});
