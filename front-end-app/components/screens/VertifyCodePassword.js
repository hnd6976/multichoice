import React, {useState} from 'react';
import {SafeAreaView, Text,View,Alert, StyleSheet,TouchableOpacity} from 'react-native';
import axios from 'axios';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import { API_URL } from "@env"
const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 16},
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
});

const CELL_COUNT = 6;

const VerifyCodePassword = ({ route, navigation }) => {
  const {email } = route.params;
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });
  const showConfirmDialog = (navigation,msg) => {
    return Alert.alert(
        msg,
        "Đăng nhập để tiếp tục?",
        [
            // The "Yes" button
            {
                text: "Yes",
                onPress: () => {
                  navigation.navigate("Login")
                   // logout();
                },
            },
            // The "No" button
            // Does nothing but dismiss the dialog when tapped
            {
                text: "No",
            },
        ]
    );
};
 const verifyCodePassword = async()=>{
 // console.log(`${API_URL}/auth/resend-verification-token?email=${email}`)
  try{
    const ema=email
    const response = await axios.post(`${API_URL}/auth/reset-password-check?email=${email}&token=${value}`)
    console.log(response.data.data);
    
    Alert.alert("","Xác nhận thành công")
    navigation.navigate("ResetPassword",{email:email,token:response.data.data})
  
/*
  setSession(accessToken);

  dispatch({
    type: 'REGISTER',
    payload: {
      user,
    },
  });*/
}catch(err){
  console.log(`Error: ${JSON.stringify(err)}`);
  Alert.alert("","Mã xác nhận không chính xác hoặc hết hạn")
  }
 }
 const resendCode = async()=>{
  console.log(`${API_URL}/auth/resend-verification-token?email=${email}`)
  try{
    
    const response = await axios.get(`${API_URL}/auth/resend-verification-token?email=${email}`)
    console.log(response.data.message)
    Alert.alert("","Mã xác nhận mới đã được gửi")
/*
  setSession(accessToken);

  dispatch({
    type: 'REGISTER',
    payload: {
      user,
    },
  });*/
}catch(err){
  console.log(`Error: ${JSON.stringify(err)}`);
  }
 }
  return (
    <SafeAreaView style={styles.root}>
      <Text style={styles.title}>Nhập mã xác nhận</Text>
      <CodeField
        ref={ref}
        {...props}
        // Use `caretHidden={false}` when users can't paste a text value, because context menu doesn't appear
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor/> : null)}
          </Text>
        )}
      />
      <View style={{marginTop:10}}>
      <Text>
        Mã xác nhận đã được gửi tới 
        </Text>
        <Text style={{fontSize:16,color:'black'}}>{email}</Text>
        <Text>Vui lòng kiểm tra email để lấy mã xác nhận</Text>
        </View>
        <View style={{alignItems:'center'}}>
        <TouchableOpacity style={{marginTop:30, width:'85%',height:60,
        paddingHorizontal:5,
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#0dbbbf'
        
        }}
        onPress={()=>verifyCodePassword()}
        >
          <Text style={{fontWeight:'bold',fontSize:16, color:'white'}}>Xác nhận</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{marginTop:20}} onPress={()=>resendCode()}>
          <Text style={{fontSize:16,color:''}}>Gửi lại</Text>
        </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

export default VerifyCodePassword;