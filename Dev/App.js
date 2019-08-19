import React, { Component } from 'react';
import MainStackNavigator from './src/screens/MainStackNavigator';
import { View, ActivityIndicator } from 'react-native';
export default class App extends Component {

  render() {
    return (
      <MainStackNavigator />
    );
  }
  
}


