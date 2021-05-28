import {StyleSheet} from 'react-native';
import vw from '../../Units/vw';
import vh from '../../Units/vh';
import {Fonts} from '../../assets/fonts';
import {secondaryColor} from '../../../config.json';

export default StyleSheet.create({
  picker: {width: vw * 2.5, height: vh * 1.8},
  containerStyle: {
    height: vh * 4,

    // paddingVertical:vh*2,

    alignItems: 'center',
    width: '40%',
  },
  PickerStyle: {
    backgroundColor: secondaryColor,
    borderWidth: 0,
    // borderRadius: vw * 3,
    // borderTopLeftRadius: vw * 7,
    // borderTopRightRadius: vw * 7,
    // borderBottomLeftRadius: vw * 7,
    // borderBottomRightRadius: vw * 7,
    // borderWidth: 0.5,
    // borderColor: 'rgba(0,0,0,.2)',
    paddingHorizontal: vw * 2,
    // paddingVertical:vh*1.2,
  },
  dropDownStyle: {
    backgroundColor: secondaryColor,
    // borderBottomLeftRadius: vw * 4,
    // borderBottomRightRadius: vw * 4,
    paddingHorizontal: 0,
    // overflow: 'hidden',
    height: vh * 10,
    borderWidth: 0,
    elevation: 10,
    // zIndex:9999
  },
  itemStyle: {
    // borderBottomWidth: 0.5,
    // borderBottomColor: 'rgba(0,0,0,.2)',
    paddingHorizontal: vw * 3,
    paddingVertical: vh * 0.4,
    justifyContent: 'flex-start',
  },
  labelStyle: {
    color: '#666666',
    fontFamily: Fonts.BR,
    fontSize: vh * 1.7,
  },
  placeholder: {
    color: '#666666',
    fontFamily: Fonts.BR,
    fontSize: vh * 1.7,
  },
});
