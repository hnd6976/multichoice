
import React, { useRef, useState, useEffect,useContext }  from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,Dimensions
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import { API_URL } from "@env"
import AuthContext from '../../contexts/JWTAuthContext';
import UserAvatar from 'react-native-user-avatar';
import ListTransaction from '../views/ListTransaction';
const HistoryDownload =({ route, navigation })=>{
  const {user}=useContext(AuthContext);
  const [listTransaction,setListTransaction]=useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [total, setTotal] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const onPageChanged = value => {
    setPage(value);
  };
  const getListTransaction=async()=>{
    try{
        const res = await axios.get(`${API_URL}/user/getTransactionByUserId/${user?.id}/${page}/${rowsPerPage}`)
        setListTransaction(res.data.content);
        setTotal(res.data.totalElement);
        setTotalPages(res.data.totalPages);
      }
      catch(err){
      
      }
  }
  useEffect(() => {
    getListTransaction();
  }, []);
  useEffect(() => {
    getListTransaction();
  }, [page, rowsPerPage,]);
  return(
          <View style={styles.sectionContainer}>
            <ListTransaction
             listTransaction={listTransaction}  page={page} totalPages={totalPages} onPageChanged={onPageChanged}
          />
          </View>
         
          
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flex:1,
    height:Dimensions. get('window'). height,
   // justifyContent:'center',
    //paddingHorizontal: 24,
    paddingHorizontal:10,
    paddingVertical:20,
    backgroundColor:'#E6E6FA',
   
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

export default HistoryDownload;
