import React from 'react';
import { Image, StyleSheet, View, Text, Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
// import Animated from 'react-native-reanimated';
import Home from '../screens/Home';
// import { ChatScreen } from '../screens';
// import Tabs from '../tabs';
import { options } from './navigationHeader';
import { backgrounds, samplePictures, icons } from '../assets/images';
import vw from '../Units/vw';
import vh from '../Units/vh';
// import CircularBold from '../Components/CircularBold';
import styles from './styles';
import AboutUs from '../screens/AboutUs';
import ContactUs from '../screens/ContactUs';
import Products from '../screens/Products';
import Categories from '../screens/Categories';
import WishList from '../screens/WishList';
import ProfileDetails from '../screens/ProfileDetails';
import ProductDetail from '../screens/ProductDetail';
import OrderDetails from '../screens/OrderDetails';
import MyOrders from '../screens/MyOrders';
import Cart from '../screens/Cart';
import Checkout from '../screens/Checkout';
import Search from '../screens/Search';
import Login from '../screens/Login';
import Donations from '../screens/Donations';
import PasswordRecovery from '../screens/PasswordRecovery';
import SignUp from '../screens/SignUp';
import { connect } from 'react-redux';
import reduxProps from '../WooCommerceWrapper/store/reduxProps';
import {
  drawer_Active_Color,
  drawer_inActive_Color
} from '../../config.json';
import socketIOClient from 'socket.io-client'
const App = createStackNavigator();
const Auth = createStackNavigator();
const Drawer = createDrawerNavigator();
const ROUTES = [
  { name: 'HOME', route: 'Home', image: icons.drawer },
  { name: 'MY CART', route: 'Cart', image: icons.cart },
  { name: 'ABOUT US', route: 'AboutUs', image: icons.drawer1 },
  { name: 'CONTACT US', route: 'ContactUs', image: icons.drawer2 },
  { name: 'PRODUCTS', route: 'Products', image: icons.drawer3 },
  { name: 'CATEGORIES', route: 'Categories', image: icons.drawer4 },
  { name: 'WISH LIST', route: 'WishList', image: icons.drawer5 },
  { name: 'PROFILE', route: 'ProfileDetails', image: icons.drawer6 },
  { name: 'MY ORDERS', route: 'MyOrders', image: icons.drawer7 },
  { name: 'DONATIONS', route: 'Donations', image: icons.drawer7 },
  { name: 'LOGOUT', route: 'Auth', image: icons.drawer8 },
];

const LOGIN_ROUTES = [
  { name: 'HOME', route: 'Home', image: icons.drawer },
  // { name: 'MY CART', route: 'Cart', image: icons.cart },

  { name: 'ABOUT US', route: 'AboutUs', image: icons.drawer1 },
  { name: 'CONTACT US', route: 'ContactUs', image: icons.drawer2 },
  { name: 'PRODUCTS', route: 'Products', image: icons.drawer3 },
  // { name: 'WISH LIST', route: 'WishList', image: icons.drawer5 },
  // { name: 'MY CART', route: 'Cart', image: icons.cart },
  { name: 'DONATIONS', route: 'Donations', image: icons.drawer7 },
  { name: 'CATEGORIES', route: 'Categories', image: icons.drawer4 },
  { name: 'LOGIN', route: 'Auth', image: icons.drawer8 },
  // {name: 'DONATIONS', route: 'Donations', image: icons.drawer7},
];

const AuthStack = () => {
  return (
    <Auth.Navigator screenOptions={{ headerShown: false }}>
      <Auth.Screen name="Login" component={Login} />
      <Auth.Screen name="PasswordRecovery" component={PasswordRecovery} />

      <Auth.Screen name="SignUp" component={SignUp} />
    </Auth.Navigator>
  );
};

const AppStack = () => {
  return (
    <App.Navigator screenOptions={options}>
      <App.Screen name="Home" component={Home} />
      <App.Screen name="Cart" component={Cart} />
      <App.Screen name="Search" component={Search} />
      <App.Screen name="Checkout" component={Checkout} />
      <App.Screen name="AboutUs" component={AboutUs} />
      <App.Screen name="ContactUs" component={ContactUs} />
      <App.Screen name="Products" component={Products} />
      <App.Screen name="ProductDetail" component={ProductDetail} />
      <App.Screen name="Categories" component={Categories} />
      <App.Screen name="WishList" component={WishList} />
      <App.Screen name="ProfileDetails" component={ProfileDetails} />
      <App.Screen name="MyOrders" component={MyOrders} />
      <App.Screen name="OrderDetails" component={OrderDetails} />
      <App.Screen name="Donations" component={Donations} />

      <App.Screen name="Login" component={Login} />

      <App.Screen name="SignUp" component={SignUp} />

      <App.Screen
        name="Auth"
        component={AuthStack}
        options={{
          headerShown: false,
        }}
      />
    </App.Navigator>
  );
};

class DrawerContent extends React.Component {
  componentDidMount() {
    // const ENDPOINT = "http://apps01.onlinetestingserver.com:3005/";
    const ENDPOINT = "https://app-builder-server.herokuapp.com/";
    this.socket = socketIOClient(ENDPOINT);
    this.socket.on('update-config', payload => {
      const id = document.location.search.replace('?sessionId=', '')
      // console.log('update-config : ', payload)
      if (payload.sessionId) {
        if (payload.sessionId == parseInt(id)) {
          // alert(id)
          console.log('update-config : ', payload)

          this.props.updateConfigs(payload)
        }
      }
    })
  }





  //   logout= ()=>{
  //     Alert.alert("Logout", "Are you sure you want to logout?",
  //     [{
  //       text: "No",
  //     }, {
  //       text: "Yes",
  //       onPress: () => {
  //         this._logout.onShow()
  //         this.props.logout(s => {
  //           this._logout.hide()
  //           this.props.navigation.navigate("Auth")

  //         }, e => {
  //           console.log(e,"logout")
  //           this._logout.hide()
  //         })
  //       }
  //     }], {})
  //   }\
  state = { activeRouteName: 'Home' };
  IconButton = (icon, color) => {
    return (
      <View style={styles.iconContainer}>
        <Image
          source={icon}
          style={[styles.icon, { tintColor: color }]}
          resizeMode="contain"
        />
      </View>
    );
  };

  _logout = (route) => {
    if (route == 'Auth') {
      if (this.props.Reducer.userId == null) {
        props.navigation.navigate(route);
      } else {
        this.props.Logout();
      }
    } else {
      if (route == 'Products') {
        this.props.navigation.navigate(route, {
          categoryName: 'PRODUCTS',
          categoryID: null,
        });
      } else {
        this.props.navigation.navigate(route);
      }
    }
  };

  render() {
    let props = this.props;

    return (
      <DrawerContentScrollView
        {...props}
        scrollEnabled={true}
        contentContainerStyle={styles.DrawerScrollView}>
        {/* drawer content here <- */}

        <View style={styles.optionContainer}>
          {this.props.Reducer.userId == null
            ? LOGIN_ROUTES.map((item, index) => (
              <DrawerItem
                key={index}
                label={item.name}
                icon={() =>
                  this.IconButton(
                    item.image,
                    this.state.activeRouteName == item.route
                      ? this.props.activeTintColor
                      : this.props.inactiveTintColor,
                  )
                }
                onPress={() => {
                  this.setState({ activeRouteName: item.route });
                  props.navigation.navigate(item.route);
                }}
                style={styles.option}
                labelStyle={[
                  styles.optionLabel,
                  {
                    color:
                      this.state.activeRouteName == item.route
                        ? this.props.activeTintColor
                        : this.props.inactiveTintColor,
                  },
                ]}
              />
            ))
            : ROUTES.map((item, index) => (
              <DrawerItem
                key={index}
                label={item.name}
                icon={() =>
                  this.IconButton(
                    item.image,
                    this.state.activeRouteName == item.route
                      ? this.props.activeTintColor
                      : this.props.inactiveTintColor,
                  )
                }
                onPress={() => {
                  this.setState({ activeRouteName: item.route });
                  this._logout(item.route);
                }}
                style={styles.option}
                labelStyle={[
                  styles.optionLabel,
                  {
                    color:
                      this.state.activeRouteName == item.route
                        ? this.props.activeTintColor
                        : this.props.inactiveTintColor,
                  },
                ]}
              />
            ))}
        </View>
      </DrawerContentScrollView>
    );
  }
}

// const mapStates = (state) => {
//   return {
//     user: state.UserReducer.userData,
//   }
// }
// const mapProps = (dispatch) => {
//   return {
//     logout: (success, error) => {
//       dispatch(actions.logout(success, error))
//     },
//   }

// }
DrawerContent = connect(
  reduxProps.mapStateToProps,
  reduxProps.mapDispatchToProps,
)(DrawerContent);

export default () => {
  return (
    <Drawer.Navigator
      // hideStatusBar

      drawerType="slide"
      overlayColor="transparent"
      drawerStyle={styles.drawerStyles}
      contentContainerStyle={{ flex: 1 }}
      drawerContentOptions={{
        activeBackgroundColor: 'transparent',
        activeTintColor: drawer_Active_Color,
        inactiveTintColor: drawer_inActive_Color,
      }}
      sceneContainerStyle={{ backgroundColor: 'transparent' }}
      drawerContent={(props) => {
        //   setProgress(props.progress);
        return <DrawerContent {...props} />;
      }}>
      <Drawer.Screen name="App" component={AppStack} />
    </Drawer.Navigator>
  );
};

// const styles = StyleSheet.create({

// });
