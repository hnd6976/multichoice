
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
  TouchableOpacity,
  Dimensions,ImageBackground
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AuthContext from '../../contexts/JWTAuthContext';
import UserAvatar from 'react-native-user-avatar';
const Account =({ route, navigation })=>{
  const {showConfirmLogout,user}=useContext(AuthContext);
  return(
   
          <View style={styles.sectionContainer}>
            <ImageBackground
            source={require('../../assets/images/bg3.jpg')}
             style={{height:200, width:'100%',}}>

            </ImageBackground>
            <View style={{marginTop:-67, justifyContent:'center',alignItems:'center'}}>
              <View style={{height:134,width:134,borderRadius:67,padding:2, backgroundColor:'white'}}>
              <UserAvatar size={130} name={user?.username[0]} />
               </View>
           {false&&<TouchableOpacity
            style={{position:'absolute',
            height:26,
            width:26,borderRadius:13,
           right:6,bottom:6,
           backgroundColor:'white',
           alignItems:'center',
           justifyContent:'center'
           }}>
            <Ionicons name="pencil" size={20}/>
           </TouchableOpacity>}
           </View>
           <Text style={{fontSize:18,fontWeight:'bold',marginTop:15, color:'black'}}>{user?.username}</Text>
           <View style={{marginTop:20,width:"100%",paddingLeft:20}}>
           <TouchableOpacity 
           onPress={()=>navigation.navigate('HistoryDownload')}
           style={{flexDirection:'row',alignItems:'center',paddingVertical:15, borderBottomWidth:0.5}}>
              <Ionicons name="download-outline" color="#00aeff" size={30}/>
              <Text style={{marginLeft:15, fontSize:16,fontWeight:'600', color:'black',}}>Tải xuống</Text>
            </TouchableOpacity>
    
            <TouchableOpacity 
           onPress={()=>navigation.navigate('HistoryExam')}
           style={{marginTop:20,flexDirection:'row',alignItems:'center',paddingVertical:15, borderBottomWidth:0.5}}>
              <Ionicons name="reorder-three-sharp" color="#02b5c3" size={30}/>
              <Text style={{marginLeft:15, fontSize:16,fontWeight:'600', color:'black',}}>Bài làm</Text>
            </TouchableOpacity>

            <TouchableOpacity
            onPress={()=>navigation.navigate('ChangePassword')}
             style={{marginTop:20,flexDirection:'row',alignItems:'center',paddingVertical:15, borderBottomWidth:0.5}}>
              <Ionicons name="lock-closed-outline" color="#001dfa" size={30}/>
              <Text style={{marginLeft:15, fontSize:16,fontWeight:'600', color:'black',}}>Đổi mật khẩu</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=>showConfirmLogout()}
             style={{marginTop:20,flexDirection:'row',alignItems:'center',paddingVertical:15, borderBottomWidth:0.5}}>
              <Ionicons name="log-out-outline" color="#3fb8f1" size={30}/>
              <Text style={{marginLeft:15, fontSize:16,fontWeight:'600', color:'black',}}>Đăng xuất</Text>
            </TouchableOpacity>
           </View>
          </View>
         
          
  );
}




const styles = StyleSheet.create({
  sectionContainer: {
    flex:1,
    height:Dimensions. get('window'). height,
   // justifyContent:'center',
    //paddingHorizontal: 24,
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

export default Account;
