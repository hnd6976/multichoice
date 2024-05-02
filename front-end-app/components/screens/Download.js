

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  ActivityIndicator,Alert
} from 'react-native';
import {WebView} from 'react-native-webview';
import Feather from 'react-native-vector-icons/Feather';
import RNFetchBlob from 'react-native-fetch-blob'

const Download = ({route, navigation}) => {
  
    const dowloadPDF=async()=>{
        let dirs = RNFetchBlob.fs.dirs
        const android = RNFetchBlob.android
RNFetchBlob
.config({
    fileCache: true,
      addAndroidDownloads: {
        useDownloadManager : true,
      title : 'Tải xuống tài liệu',
      description : 'An APK that will be installed',
      mime : 'application/vnd.android.package-archive',
      mediaScannable : true,
      notification : true,
      },
  // response data will be saved to this path if it has access right.
  //path : dirs.DocumentDir + '/path-to-file.anything'
})
.fetch('GET', "http://www.example.com/example.pdf", {
  //some headers ..
})
.then((res) => {
    android.actionViewIntent(res.path(), 'application/vnd.android.package-archive')
  // the path should be dirs.DocumentDir + 'path-to-file.anything'
  console.log('The file saved to ', res.path())
})

    config(options).fetch('GET', "http://www.example.com/example.pdf").then((res) => {
      // do some magic here
    })
    }
    
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
      <TouchableOpacity onPress={() => {
                       dowloadPDF()
                      }}
                      style={{
                        height:(50),
                        shadowOffset: {width: 0, height: 0},
                        shadowOpacity: 1,
                        shadowRadius:(8),
                        elevation:(8),
                        borderRadius:(25),
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexDirection: 'row',
                        paddingLeft:(20),
                        paddingRight:(20),
                      }}>
                      <Text
                        style={{
                          color: "black",
                          fontSize:(16),
                        }}>
                      Download Data
                 </Text>
   </TouchableOpacity>
      </View>
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
    height: 45,
    width: '70%',
    elevation: 1,
    backgroundColor: '#00457C',
    borderRadius: 3,marginTop:30
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



export default Download;
