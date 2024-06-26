/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
/*import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import ConfirmEmail from './src/screens/ConfirmEmail';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
import NewPasswordScreen from './src/screens/NewPasswordScreen';*/
import Navigation from './src/Navigation';
import { NavigationContainer } from '@react-navigation/native';
import store from './src/redux/store';
import { Provider } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect,useState } from 'react';
import auth from "@react-native-firebase/auth"
import { setuseremail,setuserid,setusername,setbaseavatar,setbaseproductImage } from './src/redux/store/action';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import InitializingScreen from './src/screens/InitializingScreen';


/* $FlowFixMe[missing-local-annot] The type annotation(s) required by Flow's
 * LTI update could not be added via codemod */


const App= () => {
  const dispatch=useDispatch();

  const [isInitializing,setIsInitializing]=useState(true);

  const onAuthStateChanged=(user)=>{
    try{
      dispatch(setuserid((user.uid)))
      dispatch(setuseremail((user.email)))
    }
    catch(e){
      console.log(e)
      dispatch(setuserid((null)))
    }  
  };
  useEffect(() => {
    async function getbaseavatar(){
      const url=await storage().ref('avatar/baseAvatar/avatar.jpg').getDownloadURL();
      const productbaseurl=await storage().ref('products/baseImage/image.png').getDownloadURL();
    //  await dispatch(setbaseproductImage(productbaseurl));
      await dispatch(setbaseavatar(url));
      await setIsInitializing(false);
    }

    getbaseavatar();
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);


    return subscriber; // unsubscribe on unmount
  }, []);
 


  if(isInitializing){
    return(
      <InitializingScreen/>
    )
  }


  return (
      <Navigation/>
  );
};

const styles = StyleSheet.create({

  root:{
    flex:1
  },
  

});

export default App;
