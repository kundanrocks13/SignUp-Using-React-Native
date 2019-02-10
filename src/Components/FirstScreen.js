import React , { Component } from 'react';
import* as Expo from 'expo';
import { View, AsyncStorage, StyleSheet, Picker } from 'react-native';
import { Container, Item, Input, Header, Body, Content, Title, Button, Text } from 'native-base';
import { Field, reduxForm  } from 'redux-form';
import { Dropdown } from 'react-native-material-dropdown';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { connect } from 'react-redux';
//import store from '../Reducers';
//import store from './Reducers/index.js'

class FirstScreen extends Component {
  static navigationOptions =
   {
      title: 'SimpleForm',
   };
    constructor(props){
        super(props);
        this.state={
        isReady: false,
        first_name:false,
        last_name:false,
        required:'',
        country:""
        };
    }
    async componentWillMount() {
      await Expo.Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      });
      this.setState({isReady: true});
    }

    formSubmit = values => {
        // this.state.required = value => value ? undefined : alert('Required')
        // alert(`${JSON.stringify(values)}`)
        const name = JSON.stringify(values.first_name);
        const Lname = JSON.stringify(values.last_name);
        const add = JSON.stringify(values.address);
        const city = JSON.stringify(values.city);
        const state = JSON.stringify(values.state);
        var nameRegx = /^[A-Za-z ]{3,}$/
        var addRegx =  /^[A-Za-z\d ,-]{5,}$/
      
        if(name === undefined || add === undefined || city === undefined || state === undefined || this.state.country === "" )
        {
          alert("All fields are Required")
        }
        else
        {

          if(nameRegx.test(JSON.parse(name)) && nameRegx.test(JSON.parse(Lname)))
          {
            if(nameRegx.test(JSON.parse(city)) && nameRegx.test(JSON.parse(state)) && addRegx.test(JSON.parse(add)) )
            {
              AsyncStorage.setItem('name',name);
              AsyncStorage.setItem('Lname',Lname);
              AsyncStorage.setItem('add',add);
              AsyncStorage.setItem('city',city);
              AsyncStorage.setItem('state',state);
              AsyncStorage.setItem('country',this.state.country);
              this.props.navigation.navigate('ImageUpload')
            }
            else
            {
              alert("Invalid Address, City or State") 
            }
          }
          else
          {
            alert("Invalid name") 
          }
        }
    }

  renderInput = ({ input, placeholder, label, type, meta: { touched, error, warning } }) => {
    // var hasError= false;
    // if(error !== undefined){
    //   hasError= true;
    // }
    return( 
      <Item>
        <Text style={styles.textMain}>{label}</Text>
        <Input style={styles.text} {...input} />
        {/* {hasError ? <Text>{error}</Text> : <Text />} */}
      </Item>
    )
  }

  render(){
     const { handleSubmit, reset } = this.props;
     //console.log(this.props)
     if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

    return (
      
      <Container>
        <Header style={styles.header}>
          <Body style={styles.body}>
            <Title>Signup</Title>
          </Body>
        </Header>
  
        <Content padder>
        
            <Field name="first_name" component={this.renderInput} label="First Name" />
            <Field name="last_name" component={this.renderInput} label="Last Name" />
            <Field name="address" component={this.renderInput} label="address"  />
            <Field name="city" component={this.renderInput} label="city" />
            <Field name="state" component={this.renderInput} label="state"  />
         
          <Picker
              selectedValue={this.state.country}
              style={styles.picker}
              itemStyle={{height: 44}}
              onValueChange={(itemValue, itemIndex) => this.setState({country: itemValue})}>
              <Picker.Item label="Select Country" value="" />
              <Picker.Item label="Australia" value="Australia" />
              <Picker.Item label="Afghanistan" value="Afghanistan" />
              <Picker.Item label="Albania" value="Albania" />
              <Picker.Item label="Argentina" value="Argentina" />
          </Picker>
          <Button style={styles.button} type="submit" block primary onPress={handleSubmit(this.formSubmit)}>
            <Text>Next</Text>
          </Button>
        </Content>
        
      </Container>
      
    )
  }
}
export default reduxForm({
  form: 'test',
 // validate
})(FirstScreen)

const styles = StyleSheet.create ({
  text:{
    width:'20%'
  },
  text:{
    color:'blue',
    width:'80%'
  },
  header:{
    marginTop:20
  },
  picker:{
    height: 40, 
    margin:8, 
    color:'blue'
  },
  body:{
    alignItems:'center'
  },
  button:{
    width:'50%', 
    borderRadius:5, 
    marginTop:10
  }
})