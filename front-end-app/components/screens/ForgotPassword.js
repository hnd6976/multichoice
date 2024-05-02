import React, {useState} from 'react';
import {SafeAreaView,
     Text,
     StyleSheet,
    View,
    TextInput,Alert,
    TouchableOpacity,Dimensions
} from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { API_URL } from "@env"

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20,alignItems:'center'},
  title: {textAlign: 'center', fontSize: 30},
  codeFieldRoot: {marginTop: 20},
  cell: {
    width: 50,
    height: 50,
    lineHeight: 45,
    fontSize: 24,
    borderWidth:1 ,
    borderColor: '#00000030',
    textAlign: 'center',
    borderRadius:5
  },
  focusCell: {
    borderColor: '#00dfaf',
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
  sectionContainer: {
    flex:1,
    height:Dimensions. get('window'). height,
    //justifyContent:'space-around',
    paddingHorizontal: 24,
    alignItems:'center',
    backgroundColor:'#E6E6FA',
    position:'relative',
  },
  backArrow:{
    position:'absolute',
    top:5,
    left:5,
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
    height:'30%',
    width:'30%',
    resizeMode:'contain',
    
  },
  
  input:{
    marginLeft:5,
    width:'70%',
    fontWeight:'700'
  },
  inputRight:{
    
  },
  checkIcon:{
    position:'absolute',
    right:8
  },
  errorMessage:{
   // marginTop:'10px',
    fontSize:14,
    color:'red'
  },
  showPassword:{

  },
  loginButton:{
    marginVertical:10,
    width:'85%',
    height:'10%',
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
    marginTop:10,
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

const CELL_COUNT = 6;

const ForgotPassword = ({ route, navigation }) => {
  const [isValidEmail, setIsValidEmail] = useState();
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordRequest,setPasswordRequest]=useState({
    email:"",
    oldPassword:"",
    newPassword:""
    })
    const onNewPasswordChange=(value)=>{
      setPasswordRequest((pre)=>{
          return{
              ...pre,
              newPassword:value
          }
      })
    }
  const onEmailChange=(value)=>{
    setPasswordRequest((pre)=>{
        return{
            ...pre,
            email:value
        }
    })
  }
  const onSubmit= async()=>{
    try{
    const emailRes=await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=13f16f73f92e498e9836286571c40172&email=${passwordRequest.email}`)
      if(emailRes.data.is_smtp_valid.text.toString()=="TRUE"){
    const response = await axios.post(`${API_URL}/auth/password-reset-request`, passwordRequest) ;
    console.log(response.status);
    navigation.navigate("VerifyCodePassword",{email:response.data.data})
      }else{
        Alert.alert("Lỗi","Email không hợp lệ")
      }
  }catch(err){
    console.log(err.response);
    Alert.alert("Lỗi","Email không chính xác")
  }
  }
  const validateEmail = (value) => {
    const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
    const email = value;
    console.log(value)
    if (strongRegex.test(email)) {
        setIsValidEmail(true);
    } else {
        setIsValidEmail(false);
        setEmailMessage('Vui lòng nhập đúng định dạng Email');
    }
};
  return (
    <View style={styles.root}>
      <Text style={{fontSize:16}}>Nhập địa chỉ Email</Text>
      <View style={styles.inputView}>
              <MaterialIcons name='alternate-email' size={20}/>
              <TextInput style={styles.input} placeholder='Email'
                keyboardType='email-address'
                value={passwordRequest.email}
                onChangeText={(e) => { validateEmail(e), onEmailChange( e) }}
              />
              {isValidEmail == null ? null : (isValidEmail ? 
                          <Ionicons
                            name='checkmark-circle-outline'
                            size={20} color="green"
                            style={styles.checkIcon}
                        />
                            :
                            <Ionicons
                                name='close-circle-outline'
                                size={20} color="red"
                                style={styles.checkIcon}
                            />
                        )
              }
            </View>
        <TouchableOpacity 
        disabled={!isValidEmail}
        style={{marginTop:30, width:'85%',height:60,
        paddingHorizontal:5,
        
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:isValidEmail?'#0dbbbf':"gray"
        }}
        onPress={()=>onSubmit()}
        >
        <Text style={{fontWeight:'bold',fontSize:16, color:'white'}}>Gửi mã xác nhận</Text>
        </TouchableOpacity>
        
    </View>
  );
};

export default ForgotPassword;