import {StyleSheet} from 'react-native';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import {Fonts} from '../../assets/fonts';
import {secondary_font_color, secondaryColor} from '../../../config.json';
export default StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: secondary_font_color,
    height: vh * 6.5,
    borderRadius: vw * 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
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
