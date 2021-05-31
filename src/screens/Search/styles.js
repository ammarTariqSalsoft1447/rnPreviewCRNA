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
  searchbar: {
    flexDirection: 'row',
    width: vw * 90,
    paddingHorizontal: vw * 4,
    height: vh * 7,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: primary_border_color,
    borderWidth: vw * 0.5,
    borderRadius: vh * 3.5,
    alignSelf: 'center',
    backgroundColor: secondaryColor,
    marginTop: vh * 2,
    marginBottom: 4 * vh,
  },
  input: {color: primary_placeholder_Color, fontSize: vh * 2, padding: 0},
  search: {width: vw * 4, height: vh * 5},
});
