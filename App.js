/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Platform, StatusBar } from 'react-native';
// import { Signup,LogIn } from './src/screens'
import SignUp from './src/screens/SignUp';
import Login from './src/screens/Login';
import Home from './src/screens/Home';
import Products from './src/screens/Products';
import PasswordRecovery from './src/screens/PasswordRecovery';
import WishList from './src/screens/WishList';
import ProductDetail from './src/screens/ProductDetail';
import AboutUs from './src/screens/AboutUs';
import ContactUs from './src/screens/ContactUs';
import Cart from './src/screens/Cart';
import Checkout from './src/screens/Checkout';
import ProfileDetails from './src/screens/ProfileDetails';
import MyOrders from './src/screens/MyOrders';
import OrderDetails from './src/screens/OrderDetails';
import Categories from './src/screens/Categories';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { options } from './src/navigation/navigationHeader';
import SplashScreen from 'react-native-splash-screen';
import { store } from './src/WooCommerceWrapper/store';
import { persistor } from './src/WooCommerceWrapper/store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import Loader from './src/Popups/Loader';
const Root = createStackNavigator();
const App1 = createStackNavigator();
import Drawer from './src/navigation';
if (Platform.OS != 'web') {
  SplashScreen.hide();
}

const RootStack = () => {
  return (
    <Root.Navigator screenOptions={{ headerShown: false }}>
      <Root.Screen name="App" component={Drawer} />
    </Root.Navigator>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: Date.now()
    }
  }
  componentDidMount() {
    
  }
  render() {
    // console.log('asd : ', store.getState)
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <NavigationContainer>
            <StatusBar

              barStyle="dark-content"

            >

            </StatusBar>
            <RootStack
            />
            <Loader />
          </NavigationContainer>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
