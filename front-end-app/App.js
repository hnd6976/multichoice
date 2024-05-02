
import React,{useContext,useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  LogBox
} from 'react-native';
import Navigation from './components/Navigation';
import { AuthProvider,AuthContext} from './contexts/JWTAuthContext';
const App =()=>{
  return(
    <AuthProvider>
    <Navigation/>
    </AuthProvider>
  );
}




const styles = StyleSheet.create({
  sectionContainer: {
    height:'100%',
    width:'100%',
    paddingHorizontal: 24,
    alignItems:'center',
    backgroundColor:'#E6E6FA'
  },
  mainTitle: {
    marginTop:30,
    fontSize: 24,
    fontWeight: '600',
    color:'black'
  },
  psTitle:{
    marginTop:15,
    fontSize:16,
    fontWeight:'400'
  },
  loginAvatar:{
    marginTop:30,
    height:120,
    width:120,
    resizeMode:'contain',
    
  },
  inputView:{
    marginTop:30,
    width:'85%',
    height:60,
    flexDirection:'row',
    paddingHorizontal:5,
    borderRadius:10,
    backgroundColor:'white' ,
    alignItems:'center'
  },
  input:{
    marginLeft:5,
    fontWeight:'700'
  },
  loginButton:{
    marginTop:30,
    width:'85%',
    height:60,
    borderRadius:5,
    backgroundColor:'#01ba76',
    alignItems:'center',
    justifyContent:'center'
  },
  loginButtonText:{
    fontSize:22,
    fontWeight:'800',
    color:'white'
  },
  register:{
    marginTop:30,
    flexDirection:'row'
  },
  registerText:{
    fontWeight:'600',
    fontSize:16,
  },
  registerLink:{
    marginLeft:3,
    color:'#30DEB0',
    fontWeight:'600',
    fontSize:16,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    marginTop:30,
    color:'#30DEB0',
    fontWeight:'600',
    fontSize:16,
  },
});

export default App;
