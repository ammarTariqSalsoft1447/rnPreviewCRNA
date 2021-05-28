import { StyleSheet,Platform } from 'react-native'
import { Fonts } from '../assets/fonts';
import vw from '../Units/vw';
import vh from '../Units/vh';
import {
  primary_message_color,
  drawer_inActive_Color,
  secondaryColor,

} from '../../config.json'
export default  StyleSheet.create({
    stack: {
        flex: 1,
        // height: 100 * vh,
        // width: 100 * vw,
        zIndex: 999,
        overflow: 'hidden',
        // overflow: 'scroll',
        // borderWidth: 1,
      },
      outerStyle:{
       flex:1,
        shadowColor: '#7A7A7A',
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.16,
        shadowRadius: 10,
        elevation: 5,
        overflow: 'visible',
    
      },
      drawerStyles: { flex: 1, width: '60%', backgroundColor: secondaryColor },
      drawerItem: { alignItems: 'flex-start', marginVertical: 0 },
      drawerLabel: { color: secondaryColor, marginLeft: -16 },
      avatar: {
        borderRadius: 60,
        marginBottom: 16,
        borderColor: secondaryColor,
        borderWidth: StyleSheet.hairlineWidth,
      },
   DrawerScrollView:{  paddingLeft: vw * 3 },
   redSpot:{
    position: 'absolute',
    bottom: '0%',
    left: '0%',
    width: vw * 30.2,
    height: vh * 12,
  },
  drawerContainer:{ flexDirection: 'row', alignItems: 'center', marginTop: vh * 4 },
  userContainer:{
    width: vw * 14,
    height: vw * 14,
    borderRadius: vw * 7,
    marginRight: vw * 5,
  },
  userImg:{ width: vw * 14,
    height: vw * 14,
    borderRadius: vw * 7,  },
  status:{
    position: 'absolute',
    width: vw * 4,
    height: vw * 4,
    borderRadius: vw * 2,
    backgroundColor: primary_message_color,
    bottom: '-2%',
    right: '-2%',
    borderColor: secondaryColor,
    borderWidth: vw * 0.3,
  },
  userName:{ color: '#050E37', fontSize: vw * 4.5 },
  optionContainer:{ marginTop: vh * 4,},
  optionImg:{ width: vw * 4 },
  option:{ backgroundColor: secondaryColor ,width:"100%"},
  optionLabel:{paddingLeft : Platform.OS === 'ios' ? vw*1.2 :  vw*0,fontSize: vh*2.1, color: drawer_inActive_Color, fontFamily: Fonts.BR, right: vw * 4 },
  blueSpot:{
    position: 'absolute',
    top: '0%',
    width: vw * 20,
    height: vh * 10,
  },
  iconContainer:{backgroundColor:secondaryColor ,width:vw*11,height:vw*11,borderRadius:vw*5.5,
  shadowColor: "#000",
  shadowOffset: {
      width: 0,
      height: 4,
  },
  shadowOpacity: 0.30,
  shadowRadius: 4.65,
  elevation: 8,justifyContent:"center",alignItems:"center"},
  icon:{width:vw*5,height:vh*3}
})