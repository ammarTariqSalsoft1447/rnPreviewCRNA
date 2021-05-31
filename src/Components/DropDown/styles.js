import { StyleSheet, Dimensions } from "react-native";

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

const vw = Dimensions.get('window').width*0.01
const vh = Dimensions.get('window').height*0.01
export default StyleSheet.create({
    mainContainer: {
        position: 'relative',
        backgroundColor: 'transparent',
        height: 0,
        width: 0,
        bottom: 0,
        left: 0,
    },
    backdropButton: {
        backgroundColor: 'transparent'
    },
    font:{
        fontSize:2.3*vh
    },
    container: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.4)',
        height: 0 * vh,
        width: 100 * vw,
        bottom: 0,
        left: 0,
        zIndex: 10000000
    },
    titleBar: {
        width: 100 * vw,
        flexDirection:'row',
        backgroundColor:secondaryColor,
        elevation:10
    },
    conetnt:{
        alignItems:'center',
        justifyContent:'center',
        width:100*vw,
        backgroundColor:'#D2D5DD'
    },
    doneButton: {
        flex:1,
        alignItems:'center',
        justifyContent:'center'

    },
    titleContainer: {
        flex:1,
        alignItems:'center',
        justifyContent:'center'

    },
    cancelButton: {
        flex:1,
        alignItems:'center',
        justifyContent:'center'

    },
    conetntContainer: {
        backgroundColor: secondaryColor,
        width: 100 * vw,
        elevation: 10,
    
    },
  
})