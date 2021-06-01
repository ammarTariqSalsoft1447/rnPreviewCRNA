/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Platform, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import { store } from './src/WooCommerceWrapper/store';
import { persistor } from './src/WooCommerceWrapper/store';
import { PersistGate } from 'redux-persist/lib/integration/react';
import Loader from './src/Popups/Loader';
const Root = createStackNavigator();
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
  }
  render() {
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
