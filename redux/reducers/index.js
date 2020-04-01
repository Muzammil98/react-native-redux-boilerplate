import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import authReducer from './authReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'], // reducer which i want to persist goes here (can be more than one) , if not given it wil persist all reducers
};
const rootReducer = combineReducers({
  auth: authReducer,
});
export default persistReducer(persistConfig, rootReducer);
