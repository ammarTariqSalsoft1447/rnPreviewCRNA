import {StyleSheet} from 'react-native';
import vh from '../../Units/vh';
import vw from '../../Units/vw';
import { store } from '../../WooCommerceWrapper/store';
const state = store.getState()
const config = state.ConfigReducer
const {
  primaryColor
}  = config
export default StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: vh * 2,
    paddingHorizontal: vw * 5,
  },
  headerInner: {flexDirection: 'row', alignItems: 'center'},
  sort: {height: vh * 2, width: vw * 5, marginRight: vw * 1},
  sortText: {color: primaryColor, fontSize: vh * 1.5},
  flatlist: {paddingHorizontal: vw * 5, marginTop: vh * 2},
});
