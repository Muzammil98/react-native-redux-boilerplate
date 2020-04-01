import React, {Component} from 'react';
import {Container, Spinner} from 'native-base';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import {store, persistor} from './store';
import Login from './components/Login';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={<Spinner />}>
          <Container style={{flex: 1}}>
            <Login />
          </Container>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
