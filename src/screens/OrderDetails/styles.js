import {StyleSheet} from 'react-native';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import {primaryColor, secondaryColor} from '../../../config.json';

export default StyleSheet.create({
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: vh * 2,
  },
  text: {color: primaryColor, fontSize: vh * 1.8},
  detailCont: {
    backgroundColor: secondaryColor,
    width: '100%',
    paddingHorizontal: vw * 5,
    paddingVertical: vh * 2,
    borderRadius: vw * 1,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: vw * 0.05,
    borderBottomColor: '#727C8E',
    paddingBottom: vh * 1.5,
    marginBottom: vh * 1.5,
  },
  detailTxt: {color: primaryColor, fontSize: vh * 1.5},
});
