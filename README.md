## Getting Started

clone the repo ` git clone https://github.com/Muzammil98/react-native-redux-boilerplate.git` 

cd into ` ./with_redux` 

run ` npm install` 

(Optional) Rename your application with just one command, run `npx react-native-rename "My App"` 

and you are ready for development :) 



## Guide to use redux with redux-persist in your React Native applications

Disclaimer: i am in any way shape or form not the maintainer for the libraries used in this, this is a basic walkthrough guide i created to provide a quick solution for everyone.If you have any issues, refer to the official docs for these libraries. Enjoy


### Table of contents:
1. [Install Dependencies](#install-redux-libraries)
2. [Making the file structure](#making-the-file-structure)
3. [Setting up for the components](#setting-up-for-the-components)


### Install Redux libraries
To use redux in react.js, first you will require following dependencies, run the following command in your terminal
   ``` 
  $ npm i redux react-redux redux-thunk redux-persist --save
  $ npm i redux-logger --save-dev 
   ```

___


### Making the file structure
In your project folder where your __Index.js__ and __App.js__ are, create a new directory and name it **redux** ,cd into redux and just run the following code
```
$ mkdir reducers ; mkdir actions ;  cd reducers ; touch index.js ; cd .. ; cd actions ; touch authActions.js ; touch types.js ; cd .. ; cd .. ; touch store.js  

 ```
 you will get something like this structure in ./redux
 
 ![Alt text](https://user-images.githubusercontent.com/33463845/77819324-e340d300-70fb-11ea-983b-34ea46394657.png)

You can either wrap _Provider_ and _PersistGate_ in **App.js** _or_ **Index.js**, i'm going to do it in `App.js`

```
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
            <App />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;

```

Goto **store.js** in the same directory and copy/paste the following code

```
import {createStore, applyMiddleware, compose} from 'redux';
import rootReducer from './redux/reducers';
import thunk from 'redux-thunk';
import {persistStore} from 'redux-persist';

const initialState = {};
const middleware = [thunk];

export const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : f => f,
  ),
);
export const persistor = persistStore(store);

```
Now we will create reducers as our store requires it. Go into `reducers/index.js` and in it copy/paste the following code.
```
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import authReducer from './authReducer';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'], // reducer want to persist goes here (can be more than one) , if not given it wil persist all reducers
};
const rootReducer = combineReducers({
  auth: authReducer,
});
export default persistReducer(persistConfig, rootReducer);

```
You have to add reducers here which you will create later on in future. Add any of those reducers in the same **reducers** directory.

Following is the _example code_ for your custom reducer files.
```
import {LOGIN_USER, LOGOUT_USER} from '../actions/types'; // Reducers requires action types for switch cases

const initialState = {
  isAuthenticated: false,
};
export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    default:
      return state;
  }
}

```

cd out into **./src** and goto `./actions/types.js`. 

This file will hold your types for actions reducers such as, 
``` export const LOGIN_USER = 'LOGIN_USER';
    export const LOGOUT_USER = 'LOGOUT_USER';
```

In the same folder you can create any of your actions file e.g `./src/actions/authActions.js`, following is an example actions file
```
import {LOGIN_USER, LOGOUT_USER} from './types';

export const loginUser = data => {
  return {
    type: LOGIN_USER,
    payload: data,
  };
};
export const logoutUser = data => {
  return {
    type: LOGOUT_USER,
    payload: data,
  };
};


```


___



### Setting up for the components
Everything is now pretty much done, but now we want to use this in our components.
For that we require __connect__ from __react-redux__ and the _actions_ we want to use in our componets e.g.using a custom component
```
import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text, H1} from 'native-base';
import {connect} from 'react-redux';

import {loginUser, logoutUser} from '../redux/actions/authActions';

class Login extends Component {
  render() {
    return (
      <View>
        <H1 style={styles.authText}>
          {this.props.auth.isAuthenticated
            ? "You're Logged in"
            : "You're Logged out"}
        </H1>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <Button
            primary
            onPress={() => {
              this.props.loginUser(true);
            }}>
            <Text>Log in</Text>
          </Button>
          <Button
            danger
            onPress={() => {
              this.props.logoutUser(false);
            }}>
            <Text>Log Out</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  authText: {
    textAlign: 'center',
    marginBottom: 200,
    marginTop: 300,
    fontFamily: 'monospace',
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {loginUser, logoutUser})(Login);

```
___

That is it, now you can use **Redux** in your apps :wink: :+1:  Happy coding


