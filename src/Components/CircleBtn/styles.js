import {StyleSheet} from 'react-native';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import {Fonts} from '../../assets/fonts';
import {
  primary_font_color,
  primaryColor,
  secondaryColor,
} from '../../../config.json';
export default StyleSheet.create({
  container: {
    width: vh * 6,
    backgroundColor: primary_font_color,
    height: vh * 6,
    borderRadius: vh * 3,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: primaryColor,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    alignSelf: 'flex-end',

    elevation: 6,
  },
  label: {fontSize: vw * 3.5, color: secondaryColor},
  arrow: {width: vw * 6, height: vh * 4},
});
