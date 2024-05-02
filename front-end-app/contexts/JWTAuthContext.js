import React, { createContext, useEffect, useReducer, } from 'react';
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
    TouchableOpacity,Alert
  } from 'react-native';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { API_URL } from "@env"
import AsyncStorage from '@react-native-async-storage/async-storage';
const initialState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

const isValidToken = (accessToken) => {
  if (!accessToken) {
    return false;
  }
  try{
  const decodedToken = jwtDecode(accessToken);
  const currentTime = Date.now() / 1000;
  return decodedToken.exp > currentTime;
  }catch(err){
    return false
  }
};
const setSession = (accessToken) => {
  if (accessToken) {
    AsyncStorage.setItem('accessToken', accessToken);
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    AsyncStorage.removeItem('accessToken');
    delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        user,
      };
    }
    case 'LOGIN': {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    case 'REGISTER': {
      const { user } = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export const AuthContext = createContext({
  ...initialState,
  method: 'JWT',
  login: () => Promise.resolve(),
  logout: () => {},
  register: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const showConfirmDialog = (navigation,email) => {
    return Alert.alert(
        "Xác nhận",
        "Bạn có muốn xác nhận tài khoản?",
        [
            // The "Yes" button
            {
                text: "Yes",
                onPress: () => {
                  navigation.navigate("VerifyCode",{email:email})
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
const showConfirmLogout= () => {
  return Alert.alert(
      "Xác nhận",
      "Bạn có muốn đăng xuất?",
      [
          // The "Yes" button
          {
              text: "Yes",
              onPress: () => {
               logout();
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
  const login = async (loginRequest,navigation) => {
    try{
      
    const response = await axios.post(`${API_URL}/auth/signin`, loginRequest) ;
   
    const { token, user } = response.data;
    const roles = response.data.roles;
     if(roles.indexOf("ROLE_USER")>-1){
        setSession(token);
        dispatch({
          type: 'LOGIN',
          payload: {
            user,
          },
        });
      }else{
        Alert.alert("Lỗi đăng nhập","Vui lòng đăng nhập bằng tài khoản người dùng !")
      }
       // Alert.alert("","Đăng nhập thành công")
      
    } catch (err) {
      const msg= err?.response?.data.message
      if(msg=="disabled"){
        showConfirmDialog(navigation,loginRequest.username);
      }
      else{
        Alert.alert("Lỗi đăng nhập",err?.response?.data.message)
      }
      //console.log(msg=="Email")
     // console.log(`Error: ${JSON.stringify(err?.response?.data.message)}`);
     // Alert.alert("Lỗi đăng nhập",err?.response?.data.message)
   
    }
    
  };

  const register = async (signupRequest,navigation) => {
    try{
      const emailRes=await axios.get(`https://emailvalidation.abstractapi.com/v1/?api_key=13f16f73f92e498e9836286571c40172&email=${signupRequest.email}`)
      if(emailRes.data.is_smtp_valid.text.toString()=="TRUE"){
      const response = await axios.post(`${API_URL}/auth/signup`, signupRequest)
      //const response= await res.json();
      console.log("of",response.data.data.email)
      Alert.alert("","Đăng ký tài khoản thành công")
      navigation.navigate("VerifyCode",{email:response.data.data.email})
      }else{
        Alert.alert("","Email không hợp lệ !")
      }
/*
    setSession(accessToken);

    dispatch({
      type: 'REGISTER',
      payload: {
        user,
      },
    });*/
  }catch(err){
    Alert.alert("",err?.response?.data.message)
    }
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  useEffect(() => {
    (async () => {
      try {
        
        const accessToken =  AsyncStorage.getItem('accessToken');
        // const accessToken = cookies.accessToken;
      
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const response = await axios.get(`${API_URL}/user/getProfile`);
          const user = response.data;
          dispatch({
            type: 'INIT',
            payload: {
              isAuthenticated: true,
              user: user,
            },
          });
        } else {
          dispatch({
            type: 'INIT',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } catch (err) {
       
        dispatch({
          type: 'INIT',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    })();
  }, []);

  if (!state.isInitialised) {
   
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'JWT',
        login,
        logout,
        register,
        showConfirmLogout,
        AuthContext
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
