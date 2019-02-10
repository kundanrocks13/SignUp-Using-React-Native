import React , { Component } from 'react';
import Expo from 'expo';
import { View, AsyncStorage, StyleSheet, Picker } from 'react-native';
import { Container, Item, Input, Header, Body, Content, Title, Button, Text } from 'native-base';
import { Field, reduxForm  } from 'redux-form';
import { Dropdown } from 'react-native-material-dropdown';
import { createStackNavigator, createAppContainer } from 'react-navigation';

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
        var addRegx =  /^[A-Za-z\d ]{5,}$/
      
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
    var hasError= false;
    if(error !== undefined){
      hasError= true;
    }
    return( 
      <Item error= {hasError}>
        <Input style={styles.text} {...input} placeholder={placeholder}/>
        {hasError ? <Text>{error}</Text> : <Text />}
      </Item>
    )
  }

  render(){
     const { handleSubmit, reset } = this.props;
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
        
            <Field name="first_name" type="text" component={this.renderInput} placeholder="First Name" />
            <Field name="last_name" type="text" component={this.renderInput} placeholder="Last Name"  />
            <Field name="address" component={this.renderInput} placeholder="address"  />
            <Field name="city" component={this.renderInput} placeholder="city" />
            <Field name="state" component={this.renderInput} placeholder="state"  />
         
          <Picker
              selectedValue={this.state.country}
              style={{ height: 40, margin:8 }}
              itemStyle={{height: 44, color:'blue'}}
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
    color:'blue'
  },
  header:{
    marginTop:20
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