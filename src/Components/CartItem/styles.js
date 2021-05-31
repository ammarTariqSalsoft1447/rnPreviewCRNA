import {StyleSheet} from 'react-native'
import vw from '../../Units/vw';
import vh from '../../Units/vh';
import {Fonts} from '../../assets/fonts'

import { store } from '../../WooCommerceWrapper/store';
const state = store.getState()
const config = state.ConfigReducer
const {
  primary_font_color,
  primaryColor,
  secondaryColor,
 
} = config

export default StyleSheet.create({
 card:{
  flexDirection: "row", backgroundColor: secondaryColor, paddingHorizontal: vw * 2, paddingVertical: vh * 1,
  shadowColor: primaryColor,
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,

  elevation: 5, marginBottom: vh * 2
},
img:{ width: vw * 25, height: vh * 12, borderRadius: vw * 2, marginRight: vw * 4 },
details:{ flex: 1 },
cross:{ width: vw * 3.5, height: vh * 2 },
name:{ color: primaryColor, fontSize: vh * 2, width: "82%" },
priceContainer:{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: vh * 1 },
price:{ color: primary_font_color, fontSize: vh * 2.2 }
})