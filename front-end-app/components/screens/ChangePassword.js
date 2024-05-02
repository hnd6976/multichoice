import React, {useState,useEffect,useContext} from 'react';
import {SafeAreaView,
     Text,
     StyleSheet,
    View,
    TextInput,
    TouchableOpacity,Alert
} from 'react-native';

import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { API_URL } from "@env";
import AuthContext from '../../contexts/JWTAuthContext';
const styles = StyleSheet.create({
  root: {flex: 1, padding: 20,alignItems:'center'},
  title: {textAlign:'left', fontSize: 30},
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
    marginVertical:20,
    width:'100%',
    height:60,
    flexDirection:'row',
    paddingHorizontal:5,
    borderRadius:10,
    backgroundColor:'white' ,
    alignItems:'center'
    //'
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
    width:'80%',
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

const ChangePassword = ({ route, navigation }) => {
  const {user,logout}=useContext(AuthContext);
 
  const [confirmPassword,setConfirmPassword]=useState("");
  const onConfirmPasswordChange=(value)=>{
    setConfirmPassword(value);
  }

  const [passwordRequest,setPasswordRequest]=useState({
    email:user?.email?user.email:"",
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
      const onOldPasswordChange=(value)=>{
        setPasswordRequest((pre)=>{
            return{
                ...pre,
                oldPassword:value
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
  useEffect(()=>{
    console.log(passwordRequest)
  })
  const onSubmit= async()=>{
    try{
    const response = await axios.post(`${API_URL}/auth/change-password`, passwordRequest) ;
    console.log(response.status);
    Alert.alert("","Đổi mật khẩu thành công ! Vui lòng đăng nhập lại !")
    //navigation.navigate("Login");
    logout()
    }catch(err){
      Alert.alert("",err?.response?.data.message)
    }
  }
  const [isValidData,setIsValidData]=useState(false);
  const [showOldPassword,setShowOldPassword]=useState(false);
  const [showPassword,setShowPassword]=useState(false);
  const [showComfirmPassword,setShowComfirmPassword]=useState(false);
  const [isValidPassword, setIsValidPassword] = useState();
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState();
  const [passwordMessage, setPasswordMessage] = useState('');
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');
  const validatePassword = (value) => {
    const strongRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
    const password = value;

    if (strongRegex.test(password)) {
        setIsValidPassword(true);
    } else {
        setIsValidPassword(false);
        setPasswordMessage('Mật khẩu phải chứa ít nhất 8 ký tự gồm chữ viết hoa, chữ thường, ký tự đặc biệt, số');
    }
    validateConfirmPassword(confirmPassword)
};

const validateConfirmPassword = (value) => {
    const confirmPassword = value;
    if (passwordRequest.newPassword === value) {
        setIsValidConfirmPassword(true);
    } else {
      if(passwordRequest.newPassword!=''){
        setIsValidConfirmPassword(false);
        setConfirmPasswordMessage('Mật khẩu phải giống nhau');
        
      }
    }
};
useEffect(()=>{
    setIsValidData(isValidPassword&&isValidConfirmPassword)
},[isValidPassword,isValidConfirmPassword])
  return (
    <KeyboardAwareScrollView>
    <View style={styles.root}>
        <View style={{width:'85%'}}>
        <Text style={{fontSize:16}}>Nhập mật khẩu hiện tại</Text>
      <View style={styles.inputView}>
              <MaterialIcons name='lock-outline' size={20}/>
              <TextInput style={styles.input} secureTextEntry={showOldPassword?false:true} placeholder='Mật khẩu'
                value={passwordRequest.oldPassword}
                onChangeText={(e) => { onOldPasswordChange(e) }}
              />
              <TouchableOpacity style={styles.showPassword}
                onPress={()=>setShowOldPassword(!showOldPassword)}
              >
                <Ionicons name={showOldPassword?'eye-outline':'eye-off-outline'} size={20}/>
              </TouchableOpacity>
              
            </View>
            <View style={{height:1,backgroundColor:'black',marginBottom:10}}></View>
      <Text style={{fontSize:16}}>Nhập mật khẩu mới</Text>
      <View style={[styles.inputView,{borderWidth:isValidPassword==null?0:1,borderColor:isValidPassword?'green':'red'}]}>
              <MaterialIcons name='lock-outline' size={20}/>
              <TextInput style={styles.input} secureTextEntry={showPassword?false:true} placeholder='Mật khẩu'
                value={passwordRequest.newPassword}
                onChangeText={(e) => { validatePassword(e),onNewPasswordChange(e) }}
              />
              <TouchableOpacity style={styles.showPassword}
                onPress={()=>setShowPassword(!showPassword)}
              >
                <Ionicons name={showPassword?'eye-outline':'eye-off-outline'} size={20}/>
              </TouchableOpacity>
              
            </View>
            {isValidPassword==false&&
                            <Text style={styles.errorMessage}>{passwordMessage}</Text>
            }
            <Text style={{fontSize:16}}>Nhập lại mật khẩu</Text>
            <View style={[styles.inputView,{borderWidth:isValidConfirmPassword==null?0:1,borderColor:isValidConfirmPassword?'green':'red'}]}>
              <MaterialIcons name='lock-outline' size={20}/>
              <TextInput style={styles.input} secureTextEntry={showComfirmPassword?false:true} placeholder='Xác nhận mật khẩu'
                value={confirmPassword}
                onChangeText={(e) => { validateConfirmPassword(e), onConfirmPasswordChange(e) }}
              />
              <TouchableOpacity style={styles.showPassword}
                onPress={()=>setShowComfirmPassword(!showComfirmPassword)}
              >
                <Ionicons name={showComfirmPassword?'eye-outline':'eye-off-outline'} size={20}/>
              </TouchableOpacity>
              
            </View>
            {isValidConfirmPassword==false&&
                            <Text style={styles.errorMessage}>{confirmPasswordMessage}</Text>
            }
        <TouchableOpacity style={{marginTop:30, width:'100%',height:60,
        paddingHorizontal:5,
        
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#0dbbbf'
        }}
        onPress={()=>onSubmit()}
        disabled={!isValidData}
        >
        <Text style={{fontWeight:'bold',fontSize:16, color:'white'}}>Đổi mật khẩu</Text>
        </TouchableOpacity>
        </View>
    </View>
    </KeyboardAwareScrollView>
  );
};

export default ChangePassword;