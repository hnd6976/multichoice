
import React ,{useEffect,useState,useContext} from 'react';
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
  TouchableOpacity,Alert,Dimensions
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AuthContext from '../../contexts/JWTAuthContext';
const Login =({ route, navigation })=>{
  const {login,isAuthenticated} = useContext(AuthContext);
 
  const [isValidEmail, setIsValidEmail] = useState();
  const [isValidPassword, setIsValidPassword] = useState();
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [showPassword,setShowPassword]=useState(false);
  const [data, setData] = useState({
    username: "",
    password: "",
})
const validateUserName = (value) => {
  const strongRegex = new RegExp("^[a-zA-Z0-9_-]{4,16}$");
  const user = value;
  if (strongRegex.test(user)) {
      setIsValidUserName(true);
  } else {
      setIsValidUserName(false);
      setUserNameMessage('Tên phải dài tối thiểu 4 ký tự');
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
};
const handleOnChange = (name, value) => {
  setData((preve) => {
      return {
          ...preve,
          [name]: value
      }
  })
}
const Login = async() => {
  const res = await login(data,navigation)
  /*if (res == "Wrong password") {
      Alert.alert("", "Sai mật khẩu !");
  } else {
      if (res == "There is no user with this user name")
      Alert.alert("", "Sai tên đăng nhập !");
  }*/
}
  return(
    <KeyboardAwareScrollView style={{height:'100%'}}>
          <View style={styles.sectionContainer}>
            <Image style={styles.loginAvatar} source={require('../../assets/images/user3.png')}></Image>
            <Text style={styles.mainTitle}>Đăng nhập để tiếp tục</Text>
            <View style={styles.inputView}>
              <MaterialIcons name='alternate-email' size={20}/>
              <TextInput style={styles.input} 
              placeholder='Email'
              keyboardType='email-address'
              value={data.username}
                onChangeText={(e) => { validateEmail(e), handleOnChange("username", e) }}
              />
            </View>
            {isValidEmail==false&&
                        <Text style={styles.errorMessage}>{emailMessage}</Text>
            }
            <View style={styles.inputView}>
              <MaterialIcons name='lock-outline' size={20}/>
              <TextInput style={styles.input} secureTextEntry={showPassword?false:true} placeholder='Mật khẩu'
               value={data.password}
               onChangeText={(e) => {validatePassword(e),handleOnChange("password", e) }}
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
            <TouchableOpacity onPress={()=>navigation.navigate('ForgotPassword')}>
              <Text style={styles.highlight}>Quên mật khẩu?</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            disabled={!(isValidEmail&&isValidPassword)}
            style={styles.loginButton} onPress={()=>{Login()}}>
              <Text style={styles.loginButtonText}>Đăng nhập</Text>
            </TouchableOpacity>
            <View style={styles.register}>
              <Text style={styles.registerText}>Chưa có tài khoản?</Text>
              <TouchableOpacity>
              <Text style={styles.registerLink} onPress={() => navigation.navigate('Register')}>
                Đăng ký
              </Text>
              </TouchableOpacity>
            </View>
          </View>
          </KeyboardAwareScrollView>
  );
}




const styles = StyleSheet.create({
  sectionContainer: {
    height:Dimensions. get('window').height,
    width:'100%',
    paddingHorizontal: 24,
    alignItems:'center',
    backgroundColor:'#E6E6FA',
    borderWidth:1
  },
  backArrow:{
    position:'absolute',
    top:3,
    left:3,
    color:'#01ba76',
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
    fontWeight:'700',
    width:"80%"
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
  errorMessage:{
    // marginTop:'10px',
     fontSize:14,
     color:'red'
   },
   showPassword:{
 
   },
});

export default Login;
