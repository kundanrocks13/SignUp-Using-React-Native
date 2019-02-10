import React , { Component } from 'react';
import Expo from 'expo';
import { StyleSheet, View, AsyncStorage, Image, TouchableHighlight } from 'react-native';
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
      country:''
    };
  }
  async componentWillMount() {
      await Expo.Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      });
      this.setState({isReady: true});
      this.formData();
    }

    formSubmit = values => {
      this.props.navigation.navigate('Home') 

      this.refs.toast.show('hello world!', 1500)
   // this.refs.toast.show(this.state.inputKey + ' already exists.', DURATION.LENGTH_SHORT)
    }

  formData = async () => {
    try{
      let name = await AsyncStorage.getItem('name');
      let Lname = await AsyncStorage.getItem('Lname');
      let add = await AsyncStorage.getItem('add');
      let city = await AsyncStorage.getItem('city');
      let state = await AsyncStorage.getItem('state');
      let email = await AsyncStorage.getItem('email');
      let country = await AsyncStorage.getItem('country');
      await AsyncStorage.getItem('pickedImage', (error, result) => {
        this.setState({pickedImage:result})
      });
      
      this.setState({name:JSON.parse(name)})
      this.setState({Lname:JSON.parse(Lname)})
      this.setState({add:JSON.parse(add)})
      this.setState({city:JSON.parse(city)})
      this.setState({state:JSON.parse(state)})
      this.setState({email:JSON.parse(email)})
      this.setState({country:country})
      
    }
    catch(error) {
      alert(error);
    }
  }

  formSubmit = () => {
    this.refs.toast.show('hello world!', 2000);
    //this.props.navigation.navigate('Home')
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
        <View style={styles.text}>
          <Text>First Name: {this.state.name}</Text>
          <Text>Last Name: {this.state.Lname}</Text>
          <Text>Address: {this.state.add}</Text>
          <Text>City: {this.state.city}</Text>
          <Text>State: {this.state.state}</Text>
          <Text>Country: {this.state.country}</Text>
          <Text>Email: {this.state.email}</Text>
        </View>
          <View style={styles.image}>
          <Image source={{ uri: pickedImage }} style={styles.container} />
          </View>
          <View>
          {/* <Button style={styles.button} block primary onPress={handleSubmit(this.formSubmit)}>
            <Text>Final Submit</Text>
          </Button> */}
          <View>
              <TouchableHighlight
                  style={{padding: 10}}
                  onPress={()=>{
                      this.refs.toast.show('hello world!', 500);
                  }}>
                  <Text>Press me</Text>
              </TouchableHighlight>
              <Toast
                  ref="toast"
                  style={{backgroundColor:'green'}}
                  position='top'
                  positionValue={200}
                  fadeInDuration={750}
                  fadeOutDuration={1000}
                  opacity={0.8}
                  textStyle={{color:'red'}}
              />
          </View>
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
  text:{
    fontSize:15,
    marginTop:20, 
    marginBottom:20
  },
  image:{
    alignItems:'center',
    borderRadius:5,
    marginBottom:20,
  },
  container: {
    width: 250, 
    height: 250
  },
  button:{
    width:'50%', 
    borderRadius:5, 
  }
})