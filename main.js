import Expo from 'expo';
import { Provider } from 'react-redux';
import React, { Component } from 'react';
import store from './src/store';

//import { StyleSheet, Text, View, Image, TextInput } from 'react-native';
//import { StackNavigator } from 'react-navigation';
import MainScreen from './src/screens/MainScreen';

//import { Input } from './src/components/Input';

class App extends Component {
//  state = { email: '', password: '', error: '', loading: false };
  render() {
    return (
      <Provider store={store}>
        <MainScreen />
      </Provider>
    );
  }
}


Expo.registerRootComponent(App);
