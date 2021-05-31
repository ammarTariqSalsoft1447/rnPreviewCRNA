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
  bg: {flex: 1, width: '100%', height: '100%'},
  logo: {
    width: vw * 50,
    height: vh * 13,
    marginTop: vh * 5,
    alignSelf: 'center',
  },
  container: {paddingHorizontal: vw * 5, marginTop: vh * 5, flex: 1},
  SignUp: {
    color: secondary_font_color,
    fontSize: vh * 2.8,
    marginBottom: vh * 2,
  },
  detail: {
    color: primary_heading_color,
    fontSize: vh * 2,
    marginBottom: vh * 2,
  },
  field: {width: '100%', marginBottom: vh * 2},
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    alignSelf: 'center',
    width: '100%',
  },

  haveAccount: {color: primary_heading_color, fontSize: vh * 2},
  signin: {color: primary_font_color, fontSize: vh * 2},
  forgot: {
    color: secondary_font_color,
    fontSize: vh * 2,
    textDecorationLine: 'underline',
    textAlign: 'right',
    marginBottom: vh * 4,
  },
  arrow: {width: vw * 7, height: vh * 2.3, marginRight: vw * 1},
  message: {color: primary_heading_color, fontSize: vh * 2, width: '90%'},
  sendAgainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: vh * 3,
  },
  sendAgain: {
    color: primary_font_color,
    fontSize: vh * 2,
    textDecorationLine: 'underline',
  },
});
