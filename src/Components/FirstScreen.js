import React , { Component } from 'react';
import Expo from 'expo';
import { View, AsyncStorage } from 'react-native';
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
        required:''
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
        if(name === undefined || add === undefined || city === undefined || state === undefined )
        {
          alert("All fields are Required")
        }
        else
        {
          if(name.length <= 4 )
          alert("Name is too short")
          
          else
          {
            AsyncStorage.setItem('name',name);
            AsyncStorage.setItem('Lname',Lname);
            AsyncStorage.setItem('add',add);
            AsyncStorage.setItem('city',city);
            AsyncStorage.setItem('state',state);
            this.props.navigation.navigate('ImageUpload')
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
        <Input {...input} placeholder={placeholder}/>
        {hasError ? <Text>{error}</Text> : <Text />}
      </Item>
    )
  }

  render(){
     const { handleSubmit, reset } = this.props;
     if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    let data = [{
        value: 'Afghanistan',
      }, {
        value: 'Albania',
      }, {
        value: 'Argentina',
      }, {
        value: 'Armenia',
      }, {
        value: 'Australia',
      }, {
        value: 'India',
      }, {
        value: 'Austria',
      }, {
        value: 'Iceland',
      }, {
        value: 'Indonesia',
      }];
    return (
      
      <Container>
        <Header>
          <Body>
            <Title>Signup</Title>
          </Body>
        </Header>
        <Content padder>
          <Field name="first_name" type="text" component={this.renderInput} placeholder="First Name" />
          <Field name="last_name" type="text" component={this.renderInput} placeholder="Last Name"  />
          <Field name="address" component={this.renderInput} placeholder="address"  />
          <Field name="city" component={this.renderInput} placeholder="city" />
          <Field name="state" component={this.renderInput} placeholder="state"  />
          <Dropdown
                label='Select Country'
                data={data}
            />
          <Button type="submit" block primary onPress={handleSubmit(this.formSubmit)}>
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