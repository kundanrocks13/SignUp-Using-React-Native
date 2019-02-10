import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Applications from './src/Applications.js';
import allReducers from './src/Reducers/index.js';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import { TextInput, TouchableOpacity } from 'react-native';
import mainReducer from './src/Reducers/index.js';

//const store = createStore(mainReducer);
export default class App extends React.Component {
  render() {
    return (
        <Applications />
    );
  }
}
