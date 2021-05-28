import {StyleSheet} from 'react-native';
import vw from '../../Units/vw';
import vh from '../../Units/vh';
import {Fonts} from '../../assets/fonts';
import {
  secondary_font_color,
  primary_font_color,
  primaryColor,
  secondaryColor,
  drawer_inActive_Color
} from '../../../config.json';

export default StyleSheet.create({
  prodCont: {
    width: vw * 44,
    backgroundColor: secondaryColor,
    marginRight: vw * 2,
    shadowColor: primaryColor,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    marginBottom: vh * 2,
    elevation: 3,
  },
  prodImg: {
    width: '100%',
    height: vh * 15,
  },
  prodImg_1: {
    width: '100%',
    height: vh * 15,
    resizeMode: 'contain',
  },
  heart: {
    width: vw * 5,
    height: vh * 2.5,
    marginTop: vh * 1.5,
    marginRight: vw * 3,
  },
  detailContainer: {paddingHorizontal: vw * 3, paddingTop: vh * 1.5},
  prodName: {color: primaryColor, fontSize: vh * 2},
  catName: {color: drawer_inActive_Color, fontSize: vh * 2},
  prodDetail: {color: drawer_inActive_Color, fontSize: vh * 1.9, paddingTop: vh * 1.5},
  actionCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: vh * 1.5,
    paddingHorizontal: vw * 2.5,
    marginBottom: vh * 1,
  },
  price: {color: primary_font_color, fontSize: vh * 2.5},
  cart: {width: vw * 5, height: vh * 2.5},
});
