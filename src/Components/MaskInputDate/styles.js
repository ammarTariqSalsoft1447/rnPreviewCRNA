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
const styles = StyleSheet.create({
  container: {
    width: 78 * vw,
    height: 6 * vh,
    backgroundColor: '#FFF',
    borderRadius: 3 * vh,

    flexDirection: 'row',
    alignItems: 'center',
    borderColor: primary_border_color,
    borderWidth: vw * 0.3,
  },
  field: {
    flex: 1,
    // width: 60 * vw,
    fontFamily: Fonts.PL,
    marginLeft: vw * 2,
    fontSize: 1.5 * vh,
    // top:0.3*vh,
    textAlignVertical: 'center',
    padding: 0,
    margin: 0,
    paddingLeft: 2 * vw,
    color: '#050E37',
    // backgroundColor: 'blue',
    height: vh * 5,

    // color: 'red',
  },
  leftIcon: {
    marginLeft: 4 * vw,
    height: 1.5 * vh,
  },
  rightIcon: {
    marginRight: 4 * vw,
    height: 2.1 * vh,
  },
  label: {
    fontSize: 1.8 * vh,
    color: primary_heading_color,
  },
  labelContainer: {
    width: '100%',

    marginBottom: vh * 0.8,
  },
});
export default styles;
