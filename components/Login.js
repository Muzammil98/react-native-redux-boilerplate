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
