import vh from '../../Units/vh';
import vw from '../../Units/vw';
import {TransitionPresets} from '@react-navigation/stack';
import {Fonts} from '../../assets/fonts';
import {assets, icons} from '../../assets/images';
import {TouchableOpacity, Image, View, StatusBar, Platform} from 'react-native';
import React from 'react';
import TextBold from '../../Components/TextBold';
import CartButton from '../../Components/CartButton';
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
const shouldHeaderBeShown = (activeRouteName) => {
  // console.log('shouldHeaderBeShown', activeRouteName);

  switch (activeRouteName) {
    case 'AuthStackNavigator':
      return false;
    case 'Login':
      return false;
    case 'VerificationCode':
      return false;
    case 'PasswordRecovery':
      return false;
    case 'ResetPassword':
      return false;
    case 'SignUp':
      return false;
    case 'ProductDetail':
      return false;
    case 'App':
      return false;
    case 'Home':
      return false;

    default:
      return true;
  }
};
export const options = (props) => {
  var activeRouteName = props.route.state
    ? props.route.state.routes[props.route.state.index].name
    : props.route.name;
  // if(activeRouteName === ''){
  // StatusBar.setBackgroundColor('transparent'); old

  StatusBar.setBackgroundColor(primary_font_color);

  StatusBar.setTranslucent(false);

  // }
  return {
    ...defaultOptions(activeRouteName, props),
    ...TransitionPresets.SlideFromRightIOS,
    headerShown: shouldHeaderBeShown(activeRouteName),
    title: getTitle(activeRouteName, props),
  };
};
const getTitle = (activeRouteName, props) => {
  switch (activeRouteName) {
    case 'Home':
      return 'Home';
    case 'MyOrders':
      return 'MY ORDERS';
    case 'OrderDetails':
      return 'ORDER DETAILS';
    case 'Categories':
      return 'CATEGORIES';
    case 'Products': {
      let title = 'PRODUCTS';

      if (props.route.params) {
        if (props.route.params.categoryName) {
          title = props.route.params.categoryName.toUpperCase();
        }
      }

      return title;
    }

    case 'AboutUs':
      return 'ABOUT US';
    case 'ContactUs':
      return 'CONTACT US';
    case 'WishList':
      return 'WISH LIST';
    case 'ProfileDetails':
      return 'PROFILE DETAILS';
    case 'Cart':
      return 'MY CART';
    default:
      return activeRouteName;
  }
};
const showLeftButton = (activeRouteName, navigation, route) => {
  console.log('Active route name :', activeRouteName);
  let categoryID = null;

  if (activeRouteName == 'Products') {
    if (route.params) {
      if (route.params.categoryID) {
        categoryID = route.params.categoryID;
      }
    }
  }

  if (
    activeRouteName == 'Home' ||
    activeRouteName == 'AboutUs' ||
    activeRouteName == 'ContactUs' ||
    // activeRouteName == 'Products' ||
    activeRouteName == 'Cart' ||
    activeRouteName == 'Categories' ||
    activeRouteName == 'MyOrders' ||
    activeRouteName == 'WishList' ||
    activeRouteName == 'Donations' ||
    activeRouteName == 'ProfileDetails' ||
    (categoryID == null && activeRouteName == 'Products')
  ) {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{marginLeft: 5.5 * vw}}
          onPress={() => navigation.openDrawer()}
          hitSlop={{top: 2 * vh, left: 2 * vw, right: 2 * vw, bottom: 2 * vh}}>
          <Image
            source={assets.menu}
            style={{
              width: 5.5 * vw,
              height: 4 * vh,
              resizeMode: 'contain',
              tintColor: primary_font_color,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity
          style={{marginLeft: 5.5 * vw}}
          onPress={() => navigation.goBack()}
          hitSlop={{top: 2 * vh, left: 2 * vw, right: 2 * vw, bottom: 2 * vh}}>
          <Image
            source={icons.arrowHeader}
            style={{
              width: 5.5 * vw,
              height: 4 * vh,
              resizeMode: 'contain',
              tintColor: primaryColor,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
};
const showHeaderRight = (activeRouteName, navigation) => {
  console.log('activeRouteName', activeRouteName);

  if (activeRouteName == 'Cart') {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: vh * 0,
          marginRight: 5 * vw,
        }}>
        <TouchableOpacity
          style={{}}
          onPress={() => navigation.navigate('Home')}>
          <Image
            source={assets.search}
            style={{
              width: 4.5 * vw,
              height: 4 * vh,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
      </View>
    );
  } else if (
    activeRouteName == 'Search' ||
    activeRouteName == 'Checkout' ||
    activeRouteName == 'ProfileDetails'
  ) {
    return null;
  } else {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingTop: vh * 0,
          marginRight: 5 * vw,
        }}>
        <TouchableOpacity
          style={{marginRight: vw * 4}}
          onPress={() => navigation.navigate('Search')}>
          <Image
            source={assets.search}
            style={{
              width: 4.5 * vw,
              height: 4 * vh,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>

        <CartButton navigation={navigation} />

        {/* <TouchableOpacity
          style={{}}
          onPress={() => navigation.navigate('Cart')}>
          <Image
            source={icons.cart}
            style={{width: 4.5 * vw, height: 4 * vh, resizeMode: 'contain'}}
          />
        </TouchableOpacity> */}
      </View>
    );
  }
};

const defaultOptions = (activeRouteName, props) => {
  return {
    headerStyle: {
      backgroundColor: secondaryColor,
      // height: 10 * vh,
      shadowColor: 'transparent',
      elevation: 0,
      //   paddingTop: 3 * vh,
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerRightContainerStyle: {
      //   paddingRight: 5 * vw,
      //   marginTop: 2 * vh,
    },

    headerRight: () => showHeaderRight(activeRouteName, props.navigation),

    headerLeft: () =>
      showLeftButton(activeRouteName, props.navigation, props.route),
    //   headerTitle:(props)=>(<TextBold style={props.style}>{props.children}</TextBold>),
    ...TransitionPresets.SlideFromRightIOS,
    headerTitleAlign: 'center',
    headerTitleStyle: {
      color: primaryColor,
      fontSize: vh * 2.5,
      fontFamily: Fonts.BM,
    },
  };
};
