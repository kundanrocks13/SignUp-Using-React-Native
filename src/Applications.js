import React , { Component } from 'react';
import allReducers from './Reducers/index.js';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import FirstScreen from './Components/FirstScreen.js';
import { Field, reduxForm } from 'redux-form';
import ThirdScreen from './Components/ThirdScreen.js';
import { StyleSheet, View, Text, Image, Button, TouchableOpacity, AsyncStorage } from 'react-native';
//import {  Button } from 'native-base';
import { createStackNavigator, createAppContainer } from 'react-navigation';
//import ImagePicker from 'react-native-image-picker';
import { ImagePicker } from 'expo';
import FourthScreen from './Components/FourthScreen.js';

const store = createStore(allReducers);

class SecondScreen extends React.Component {
    static navigationOptions =
    {
        title: 'Second Screen',
    };

    state={
        pickedImage : null,
    };

    formSubmit = () => {
      if(this.state.pickedImage === null)
      {
        alert("Upload your Image")
      }
      else{
        AsyncStorage.setItem('pickedImage',this.state.pickedImage);
        this.props.navigation.navigate('Details')
      }
    }

    uploadImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 4],
        });
    
        console.log(result);
    
        if (!result.cancelled) {
          this.setState({ pickedImage: result.uri });

        }
    };

    render() {
      const { handleSubmit, reset } = this.props;
        let { pickedImage } = this.state;
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <View>
          <Text>Upload Your Image</Text>
          </View>
          <View style={styles.container} >
          <Button
            title="Upload"
            onPress={this.uploadImage}
          />
          </View>
          <View style={styles.container} >
          {pickedImage &&
          <Image source={{ uri: pickedImage }} style={{ width: 200, height: 200}} />}
           </View>
           <View style={styles.container} >
          <Button  title="Next" block primary onPress={this.formSubmit} />
          </View>
        </View>
      );
    }
  }

const RootStack = createStackNavigator(
    {
      Home: {
        screen: FirstScreen,
        navigationOptions: {
           header: null,  
            //title: 'Home'
        },
      },
      ImageUpload: {
        screen: SecondScreen,
        navigationOptions: {
            headerVisible: false,
            title: 'Second Screen'
        },
      },
      Details: {
        screen: ThirdScreen,
        navigationOptions: {
          title: 'Email and Pass...'
        },
      },
      Submit: {
        screen: FourthScreen,
        navigationOptions: {
          title: 'Final Submit'
        },
      }
    },
    {
      initialRouteName: 'Home',
    }
  );
  
  const AppContainer = createAppContainer(RootStack);
  
  export default class Applications extends React.Component {
    render() {
      return(
        <Provider store= {store}>
          <AppContainer />
        </Provider>
      )
    }
  }

  const styles = StyleSheet.create({
    container: {
      paddingHorizontal: 10,
      paddingVertical: 10,
      width: 200
    }
  })