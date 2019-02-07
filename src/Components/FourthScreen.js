import React , { Component } from 'react';
import Expo from 'expo';
import { StyleSheet, View, AsyncStorage, Image } from 'react-native';
import { Container, Item, Input, Header, Body, Content, Title, Button, Text } from 'native-base';
import { Field,reduxForm } from 'redux-form';
import Toast, {DURATION} from 'react-native-easy-toast'

class FourthScreen extends Component {
    static navigationOptions =
   {
      title: 'FourthScreen',
   };

  constructor(props){
    super(props);
    this.state={
      name:'',
      Lname:'',
      add:'',
      city:'',
      state:'',
      pickedImage:null,
      email:'',
    };
  }
  async componentWillMount() {
      await Expo.Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      });
      this.setState({isReady: true});
      this.mit();
    }

    formSubmit = values => {
      this.props.navigation.navigate('Home') 

      this.refs.toast.show('hello world!', 1500)
   // this.refs.toast.show(this.state.inputKey + ' already exists.', DURATION.LENGTH_SHORT)
    }

  mit = async () => {
    try{
      let name = await AsyncStorage.getItem('name');
      let Lname = await AsyncStorage.getItem('Lname');
      let add = await AsyncStorage.getItem('add');
      let city = await AsyncStorage.getItem('city');
      let state = await AsyncStorage.getItem('state');
      let email = await AsyncStorage.getItem('email');
      await AsyncStorage.getItem('pickedImage', (error, result) => {
        this.setState({pickedImage:result})
      });
      
      this.setState({name:JSON.parse(name)})
      this.setState({Lname:JSON.parse(Lname)})
      this.setState({add:JSON.parse(add)})
      this.setState({city:JSON.parse(city)})
      this.setState({state:JSON.parse(state)})
      this.setState({email:JSON.parse(email)})
      
    }
    catch(error) {
      alert(error);
    }
  }

  formSubmit = () => {
    this.props.navigation.navigate('Home')
  }

  renderInput({ input, placeholder, label, type, meta: { touched, error, warning } }){
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
    //  if (!this.state.isReady) {
    //   return <Expo.AppLoading />;
    // }
    let { pickedImage } = this.state;
    return (
      <Container>
        <Content padder>
        <View>
          <Text>First Name: {this.state.name}</Text>
          <Text>Last Name: {this.state.Lname}</Text>
          <Text>Address: {this.state.add}</Text>
          <Text>City: {this.state.city}</Text>
          <Text>State: {this.state.state}</Text>
          <Text>Email: {this.state.email}</Text>
          </View>
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Image source={{ uri: pickedImage }} style={styles.container} />
          
          <Button block primary onPress={handleSubmit(this.formSubmit)}>
            <Text>Final Submit</Text>
          </Button>
          </View>
        </Content>
      </Container>
    )
  }
}
export default reduxForm({
  form: 'test',
})(FourthScreen)

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: 300,
    height: 300
  }
})