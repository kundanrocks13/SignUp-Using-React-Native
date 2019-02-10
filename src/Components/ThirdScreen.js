import React , { Component } from 'react';
import* as Expo from 'expo';
import { View, AsyncStorage, StyleSheet } from 'react-native';
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

      var mailRegx = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      var passRegx =  /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/
      // var passRegx =  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      
      if(email === undefined || pass === undefined || confPass === undefined )
        {
          alert("All fields are Required")
        }
        else
        {

          if(mailRegx.test(JSON.parse(email)) && passRegx.test(JSON.parse(pass))){
            if(pass===confPass){
              AsyncStorage.setItem('email',email);
              AsyncStorage.setItem('pass',pass);
      
              this.props.navigation.navigate('Submit')
            }
            else{
              alert('Miss match password')
            }
          }
          else
          {
            alert("Invalid Email or Password")
          }
        }
    }

  renderInput = ({ input, placeholder, label, type, secureTextEntry, meta: { touched, error, warning } }) => {
    var hasError= false;
    
    if(error !== undefined){
      hasError= true;
    }
    return( 
      <Item error= {hasError}>
      <Text>{label}</Text>
        <Input secureTextEntry={secureTextEntry} {...input} type={type} />
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
          <Field name="email" component={this.renderInput} label="Email" secureTextEntry={false} />
          <Field name="pass" component={this.renderInput} label="Password" secureTextEntry={true} />
          <Field name="confPass" component={this.renderInput} label="Conf Pass" secureTextEntry={true} />
          <Button style={styles.button} block primary onPress={handleSubmit(this.formSubmit)} >
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
})(ThirdScreen)

const styles = StyleSheet.create ({
  button:{
    width:'50%', 
    borderRadius:5, 
    marginTop:20
  }
})