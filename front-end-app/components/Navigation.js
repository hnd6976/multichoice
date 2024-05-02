
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
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from '@react-navigation/native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Login from './screens/login';
import Register from './screens/register';
import Main from './screens/main';
import Exam from './screens/Exam';
import ActionExam from './screens/ActionExam';
import Result from './screens/Result';
import Document from './screens/Document';
import PDFDocument from './screens/PDFDocument';
import VerifyCode from './screens/VerifyCode';
import VerifyCodePassword from './screens/VertifyCodePassword';
import ForgotPassword from './screens/ForgotPassword';
import ResetPassword from './screens/ResetPassword';
import ChangePassword from './screens/ChangePassword';
import Account from './screens/Account';
import VnPay from './screens/VnPay';
import Download from './screens/Download';
import HistoryDownload from './screens/HistoryDownload';
import HistoryExam from './screens/HistoryExam';
import { AuthProvider,AuthContext } from '../contexts/JWTAuthContext';
const Stack = createStackNavigator();
LogBox.ignoreAllLogs();
const Navigation =()=>{
  const {isAuthenticated,user}=useContext(AuthContext);
  return(
    
    <NavigationContainer>
      
      <Stack.Navigator
          screenOptions={{
              
          }}
          //initialRouteName={"Main"}
      >
        {isAuthenticated?
        (
          <>
          <Stack.Screen options={{headerShown: false}}  name="Main" component={Main} />
          <Stack.Screen options={{headerShown: false}}  name="Dow" component={Download} />
          <Stack.Screen options={{headerShown: true,title:'Tài khoản'}}  name="Account" component={Account} />
          <Stack.Screen options={{headerShown: true,title:'Lịch sử tải xuống'}}  name="HistoryDownload" component={HistoryDownload} />
          <Stack.Screen options={{headerShown: true,title:'Lịch sử làm bài'}}  name="HistoryExam" component={HistoryExam} />
          <Stack.Screen options={{headerShown: true,title:'Trắc nghiệm'}}  name="Exam" component={Exam} />
          <Stack.Screen options={{headerShown: true,title:'Tài liệu'}}  name="Document" component={Document} />
          <Stack.Screen options={{headerShown: true,title:'Tải xuống'}} name="VnPay" component={VnPay} />
          <Stack.Screen options={({ route }) => ({headerShown: true, title: route.params.name })}  name="ActionExam" component={ActionExam} />
          <Stack.Screen options={{headerShown: true,title:'Kết quả'}}  name="Result" component={Result} />
          <Stack.Screen options={({ route }) => ({headerShown: true, title: route.params.name })}  name="Ex" component={PDFDocument} />
          <Stack.Screen options={{headerShown: true,title:'Đổi mật khẩu'}}  name="ChangePassword" component={ChangePassword} />
          </>
        )
        :
        (
          <>
          <Stack.Screen options={{headerShown: false}} name="Login" component={Login} />
         
          <Stack.Screen options={{headerShown: false}}  name="Register" component={Register} />
          
          <Stack.Screen options={{headerShown: true,title:'Nhập mật khẩu mới'}}  name="ResetPassword" component={ResetPassword} />
          <Stack.Screen options={{headerShown: true,title:'Quên mật khẩu'}}  name="ForgotPassword" component={ForgotPassword} />
          <Stack.Screen options={{headerShown: true,title:'Nhập mã xác nhận'}}  name="VerifyCode" component={VerifyCode} />
          <Stack.Screen options={{headerShown: true,title:'Nhập mã'}}  name="VerifyCodePassword" component={VerifyCodePassword} />
          </>
        )
        }
      </Stack.Navigator>
    </NavigationContainer>
    
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

export default Navigation;
