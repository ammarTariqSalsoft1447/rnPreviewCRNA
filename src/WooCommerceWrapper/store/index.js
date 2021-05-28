import { createStore, applyMiddleware } from 'redux';
// import { AsyncStorage } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: "root",
  storage: AsyncStorage
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer, applyMiddleware(thunk));

export const persistor = persistStore(store)