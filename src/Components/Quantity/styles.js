import {StyleSheet} from 'react-native';
import vw from '../../Units/vw';
import vh from '../../Units/vh';
import {Fonts} from '../../assets/fonts';
import {primary_font_color, primary_border_color} from '../../../config.json';

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
