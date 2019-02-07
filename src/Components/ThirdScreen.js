import React , { Component } from 'react';
import Expo from 'expo';
import { View, AsyncStorage } from 'react-native';
import { Container, Item, Input, Header, Body, Content, Title, Button, Text } from 'native-base';
import { Field,reduxForm } from 'redux-form';

class ThirdScreen extends Component {
  static navigationOptions =
   {
      title: 'ThirdScreen',
   };
  constructor(props){
    super(props);
    this.state={
      isReady: false
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
      const email = JSON.stringify(values.email)
      const pass = JSON.stringify(values.pass);
      const confPass = JSON.stringify(values.confPass);

      // let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
              //  /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/

      // if(reg.test(email) === false)
      //   {
      //   alert("Email is Not Correct");
      //   return false;
      //   }

      if(email === undefined || pass === undefined || confPass === undefined )
        {
          alert("All fields are Required")
        }
        else
        {
          if(!email.includes('@'))
          alert("Invalid Email Id")
          
          else
          {
            AsyncStorage.setItem('email',email);
            AsyncStorage.setItem('pass',pass);
    
            this.props.navigation.navigate('Submit')
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
        <Input {...input} placeholder={placeholder} type={type} />
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
        <Content padder>
          <Field name="email" type="email" component={this.renderInput} placeholder="Email" />
          <Field name="pass" type="password" component={this.renderInput} placeholder="Password" />
          <Field name="confPass" type="password" component={this.renderInput} placeholder="Confirm Password" />
          <Button block primary onPress={handleSubmit(this.formSubmit)} >
            <Text>Next</Text>
          </Button>
          {/* <Button type="submit" block primary onPress={this.mit}>
            <Text>show</Text>
          </Button> */}
        </Content>
      </Container>
    )
  }
}
export default reduxForm({
  form: 'test',
 // validate
})(ThirdScreen)