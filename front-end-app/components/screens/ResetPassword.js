import React, {useState,useEffect} from 'react';
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
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { API_URL } from "@env"
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

const ResetPassword = ({ route, navigation }) => {
  const {email,token } = route.params;
  const [confirmPassword,setConfirmPassword]=useState("");
  const onConfirmPasswordChange=(value)=>{
    setConfirmPassword(value);
  }

  const [passwordRequest,setPasswordRequest]=useState({
    email:email,
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
  useEffect(()=>{
    console.log(passwordRequest)
  })
  const onSubmit= async()=>{
    const response = await axios.post(`${API_URL}/auth/reset-password?token=${token}`, passwordRequest) ;
    if(response.status==200){
        Alert.alert("","Đổi mật khẩu thành công")
        navigation.navigate("Login");
    }
  }
  const [showPassword,setShowPassword]=useState(false);
  const [showComfirmPassword,setShowComfirmPassword]=useState(false);
  const [isValidPassword, setIsValidPassword] = useState();
  const [isValidConfirmPassword, setIsValidConfirmPassword] = useState();
  const validatePassword = (value) => {
    const strongRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
    const password = value;

    if (strongRegex.test(password)) {
        setIsValidPassword(true);
    } else {
        setIsValidPassword(false);
        
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
        
      }
    }
};
  return (
    <View style={styles.root}>
        <View style={{width:'85%'}}>
      <Text style={{fontSize:16}}>Nhập mật khẩu mới</Text>
      <View style={styles.inputView}>
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
              {isValidPassword == null ? null : (isValidPassword ? <Ionicons
                            name='checkmark-circle-outline'
                            size={20} color="green"
                            style={styles.checkIcon }
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
            <Text style={{fontSize:16}}>Nhập lại mật khẩu</Text>
            <View style={styles.inputView}>
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
              {isValidConfirmPassword == null ? null : (isValidConfirmPassword ? <Ionicons
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
        <TouchableOpacity style={{marginTop:30, width:'100%',height:60,
        paddingHorizontal:5,
        
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#0dbbbf'
        }}
        onPress={()=>onSubmit()}
        >
        <Text style={{fontWeight:'bold',fontSize:16, color:'white'}}>Xác nhận mật khẩu</Text>
        </TouchableOpacity>
        </View>
    </View>
  );
};

export default ResetPassword;