

import React, {useState,useContext} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ActivityIndicator,Alert,Image
} from 'react-native';
import {WebView} from 'react-native-webview';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { API_URL } from "@env"
import AuthContext from '../../contexts/JWTAuthContext';
//import VnpayMerchant, { VnpayMerchantModule } from './react-native-vnpay-merchant'
const VnPay = ({route, navigation}) => {
  const {user}=useContext(AuthContext);
  const {document } = route.params;
  const [showGateway, setShowGateway] = useState(false);
  const [prog, setProg] = useState(false);
  const [progClr, setProgClr] = useState('#000');
  const [checkOut, setCheckOut] = useState(false);
  const [vnPayUrl,setVnPayUrl]=useState("");
  function onMessage(e) {
    let data = e.nativeEvent.data;
    setShowGateway(false);
    console.log(data);
   let payment = data;
    if (payment === 'COMPLETED') {
      Alert.alert('Thanh toán thành công !');
      setCheckOut(true)
    } else {
      Alert.alert('Thanh toán không thành công !');
    }
  }
  const pay=async()=>{
    try{
      const response = await axios.get(`${API_URL}/vnPay/pay?price=${document.price}&id=1224`)
      setVnPayUrl(response.data);
      setShowGateway(true);

    }
    catch(err){
    console.log(`Error: ${JSON.stringify(err)}`);
    
    }
  }
  const download=async()=>{
    try{
      const response = await axios.post(`${API_URL}/document/download/29/${document.id}`)
      Alert.alert("","Link tải tài liệu đã được gửi tới email của bạn");
      navigation.goBack();
    }
    catch(err){
    console.log(`Error: ${JSON.stringify(err)}`);
    Alert.alert("","Đã xảy ra lỗi")
    }
  }
  const check= async(url)=>{
    try{
      const response= await axios.get(url);
      console.log(response);
    }catch(err){
      console.log(`Error: ${JSON.stringify(err)}`);
      Alert.alert("","Đã xảy ra lỗi")
      }
    
    
  }
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
      <Text style={{fontWeight:'bold',fontSize:18}}>{document.name}</Text>
      <Text style={{fontWeight:'bold',fontSize:18,marginTop:20,marginBottom:30}}>{document.price+" VNĐ"}</Text>
        {checkOut||document.price==0?
          <View style={styles.btnConSuccess}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => download()}>
            <Text style={styles.btnTxt}>Tải xuống</Text>
          </TouchableOpacity>
        </View>:
          <View style={styles.btnCon}>
          <TouchableOpacity
            style={styles.btn}
            //onPress={() => setShowGateway(true)}
            onPress={()=>{pay()}}
            >
            <Image style={{width:250,height:80,resizeMode:'contain'}}
             source={require("../../assets/images/logo-vi-vnpay.png")}/>
          </TouchableOpacity>
        </View>
        }
      </View>
      {showGateway ? (
        <Modal
          visible={showGateway}
          onDismiss={() => setShowGateway(false)}
          onRequestClose={() => setShowGateway(false)}
          animationType={'fade'}
          transparent>
          <View style={styles.webViewCon}>
            <View style={styles.wbHead}>
              <TouchableOpacity
                style={{padding: 13}}
                onPress={() => setShowGateway(false)}>
                <Feather name={'x'} size={24} />
              </TouchableOpacity>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#00457C',
                }}>
                Thanh toán
              </Text>
              <View style={{padding: 13, opacity: prog ? 1 : 0}}>
                <ActivityIndicator size={24} color={progClr} />
              </View>
            </View>
            <WebView
              source={{uri:vnPayUrl}}
              //source={{ html: "./index.html" }}
              style={{flex: 1}}
              onNavigationStateChange={(webViewState)=>{
                console.log(webViewState.url);
                
               if(webViewState.url.startsWith("http://10.13.129.57/result")){
                 if(webViewState.url==="http://10.13.129.57/result/success.html"){
                  Alert.alert("Thanh toán thành công !")
                  setShowGateway(false)
                  download();
                 }else{
                  Alert.alert("Thanh toán không thành công !")
                  setShowGateway(false)
                 }
               }
              }
              }
              onLoadStart={() => {
                setProg(true);
                setProgClr('#000');
              }}
              onLoadProgress={() => {
                setProg(true);
                setProgClr('#00457C');
              }}
              onLoadEnd={() => {
                setProg(false);
              }}
              onLoad={() => {
                setProg(false);
              }}
              
              onMessage={onMessage}
              originWhitelist={['*']}
        allowsInlineMediaPlayback
        javaScriptEnabled={true}
        scalesPageToFit
        mediaPlaybackRequiresUserAction={false}
        javaScriptEnabledAndroid
        useWebkit
        startInLoadingState={true}
        //renderLoading={Spinner}
        geolocationEnabled={true}
            />
          </View>
        </Modal>
      ) : null}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  btnCon: {
    height: 80,
    width: '70%',
    //elevation: 1,
    //backgroundColor: '#00457C',
    //borderRadius: 3,marginTop:30
  },
  btnConSuccess: {
    height: 45,
    width: '70%',
    elevation: 1,
    backgroundColor: 'green',
    borderRadius: 3,marginTop:30
  },
  btn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    color: '#fff',
    fontSize: 18,
  },
  webViewCon: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  wbHead: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    zIndex: 25,
    elevation: 2,
  },
});



export default VnPay;
