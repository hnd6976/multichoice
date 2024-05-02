
import React, { useRef, useState, useEffect,useContext }  from 'react';
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
  TouchableOpacity,Dimensions
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AuthContext from '../../contexts/JWTAuthContext';
const Register =({ route, navigation })=>{
  const {register} = useContext(AuthContext);
  const [isValidUserName, setIsValidUserName] = useState();
    const [isValidEmail, setIsValidEmail] = useState();
    const [isValidPassword, setIsValidPassword] = useState();
    const [isValidConfirmPassword, setIsValidConfirmPassword] = useState();
    const [isValidData, setIsValidData] = useState(false);
    const [userNameMessage, setUserNameMessage] = useState('');
    const [emailMessage, setEmailMessage] = useState('');
    const [passwordMessage, setPasswordMessage] = useState('');
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');
    const [showPassword,setShowPassword]=useState(false);
    const [showComfirmPassword,setShowComfirmPassword]=useState(false);
    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
    })
    const validateUserName = (value) => {
        if (value.length>=4&& value.length<=20) {
            setIsValidUserName(true);
        } else {
            setIsValidUserName(false);
            setUserNameMessage('Tên phải dài tối thiểu 4,tối đa 20 ký tự, ');
        }
    };
    const validateEmail = (value) => {
        const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
        const email = value;
        if (strongRegex.test(email)) {
            setIsValidEmail(true);
        } else {
            setIsValidEmail(false);
            setEmailMessage('Vui lòng nhập đúng định dạng Email');
        }
    };
    const validatePassword = (value) => {
        const strongRegex = new RegExp("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$");
        const password = value;

        if (strongRegex.test(password)) {
            setIsValidPassword(true);
        } else {
            setIsValidPassword(false);
            setPasswordMessage('Mật khẩu phải chứa ít nhất 8 ký tự gồm chữ viết hoa, chữ thường, ký tự đặc biệt, số');
        }
        validateConfirmPassword(data.confirmPassword)
    };

    const validateConfirmPassword = (value) => {
        const confirmPassword = value;
        if (data.password === value) {
            setIsValidConfirmPassword(true);
        } else {
          if(data.password!=''){
            setIsValidConfirmPassword(false);
            setConfirmPasswordMessage('Mật khẩu phải giống nhau');
          }
        }
    };
    useEffect(()=>{
      if(isValidUserName&&isValidEmail&&isValidPassword&&isValidConfirmPassword){
        setIsValidData(true)
      }else{
        setIsValidData(false)
      }
    },[isValidUserName,isValidEmail,isValidPassword,isValidConfirmPassword])
   // useEffect(() => {
    //    validateConfirmPassword(data.confirmPassword)
   // }, [data.password])
    const handleOnChange = (name, value) => {
      console.log(data)
      setData((preve) => {
          return {
              ...preve,
              [name]: value
          }
      })
    }
    const Signup = async() => {
      const res = await register(data,navigation)
      /*if (res == "Wrong password") {
          Alert.alert("", "Sai mật khẩu !");
      } else {
          if (res == "There is no user with this user name")
          Alert.alert("", "Sai tên đăng nhập !");
      }*/
    }
  return(
    <KeyboardAwareScrollView  style={{backgroundColor:'gray',height:'100%'}}>
          <View style={styles.sectionContainer}>
            <Text style={styles.mainTitle}>Đăng ký tài khoản</Text>
            <View style={[styles.inputView,{borderWidth:isValidUserName==null?0:1,borderColor:isValidUserName?'green':'red'}]}>
              <SimpleLineIcons name='user' size={20}/>
              <TextInput style={styles.input} placeholder='Tên'
                value={data.username}
                onChangeText={(e) => { validateUserName(e), handleOnChange("username", e) }}
              />
              {isValidUserName == null ? null : (isValidUserName ? <Ionicons
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
            {isValidUserName==false &&
                        <Text style={styles.errorMessage}>{userNameMessage}</Text>
            }

            <View style={[styles.inputView,{borderWidth:isValidEmail==null?0:1,borderColor:isValidEmail?'green':'red'}]}>
              <MaterialIcons name='alternate-email' size={20}/>
              <TextInput style={styles.input} placeholder='Email'
                keyboardType='email-address'
                value={data.email}
                onChangeText={(e) => { validateEmail(e), handleOnChange("email", e) }}
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
            {isValidEmail==false&&
                        <Text style={styles.errorMessage}>{emailMessage}</Text>
            }
            <View style={[styles.inputView,{borderWidth:isValidPassword==null?0:1,borderColor:isValidPassword?'green':'red'}]}>
              <MaterialIcons name='lock-outline' size={20}/>
              <TextInput style={styles.input} secureTextEntry={showPassword?false:true} placeholder='Mật khẩu'
                value={data.password}
                onChangeText={(e) => { validatePassword(e), handleOnChange("password", e) }}
              />
              <TouchableOpacity style={styles.showPassword}
                onPress={()=>setShowPassword(!showPassword)}
              >
                <Ionicons name={showPassword?'eye-outline':'eye-off-outline'} size={20}/>
              </TouchableOpacity>
              {isValidPassword == null ? null : (isValidPassword ? <Ionicons
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
            {isValidPassword==false&&
                            <Text style={styles.errorMessage}>{passwordMessage}</Text>
            }
            <View style={[styles.inputView,{borderWidth:isValidConfirmPassword==null?0:1,borderColor:isValidConfirmPassword?'green':'red'}]}>
              <MaterialIcons name='lock-outline' size={20}/>
              <TextInput style={styles.input} secureTextEntry={showComfirmPassword?false:true} placeholder='Xác nhận mật khẩu'
                value={data.confirmPassword}
                onChangeText={(e) => { validateConfirmPassword(e), handleOnChange("confirmPassword", e) }}
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
            {isValidConfirmPassword==false &&
                        <Text style={styles.errorMessage}>{confirmPasswordMessage}</Text>
            }
            <TouchableOpacity 
            disabled={!isValidData}
            style={styles.loginButton}
            onPress={()=>Signup()}
            >
              <Text style={styles.loginButtonText}>Đăng ký</Text>
            </TouchableOpacity>
            
            <View style={styles.register}>
              <Text style={styles.registerText}>Đã có có tài khoản?</Text>
              <TouchableOpacity>
                <Text style={styles.registerLink} onPress={() => navigation.navigate('Login')}>
                    Đăng nhập ngay
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity  style={styles.backArrow} onPress={() => navigation.goBack(null)}>
                <MaterialIcons  name='arrow-back' color='#01ba76' size={28}/>
            </TouchableOpacity>
            
          </View>
          </KeyboardAwareScrollView>
          
  );
}




const styles = StyleSheet.create({
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
  inputView:{
    marginVertical:10,
    width:'85%',
    height:'10%',
    flexDirection:'row',
    paddingHorizontal:5,
    borderRadius:10,
    backgroundColor:'white' ,
    alignItems:'center'
  },
  input:{
    marginLeft:5,
    width:'75%',
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

export default Register;
