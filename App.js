import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Applications from './src/Applications.js';
import allReducers from './src/Reducers/index.js';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import { TextInput, TouchableOpacity } from 'react-native';

const store = createStore(allReducers);
export default class App extends React.Component {
  render() {
    return (
      
      <Applications />
      
    );
  }
}
