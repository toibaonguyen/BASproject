import { View, Text,ActivityIndicator } from 'react-native'
import React, { useContext, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignInScreen from '../screens/SignInScreen'
import SignUpScreen from '../screens/SignUpScreen'
import ConfirmEmail from '../screens/ConfirmEmail'
import NewPasswordScreen from '../screens/NewPasswordScreen'
import ResetPasswordScreen from '../screens/ResetPasswordScreen'
//import HomeScreen from '../screens/HomeScreen'
import { useSelector } from 'react-redux'
import auth from '@react-native-firebase/auth'
import MainAppScreen from '../screens/MainAppScreen'




const Stack=createNativeStackNavigator()
const AuthStack=()=>{


 


  return(
    <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name='SignIn' component={SignInScreen} />
            <Stack.Screen name='SignUp' component={SignUpScreen}/>
            <Stack.Screen name='ConfirmEmail' component={ConfirmEmail}/>
            <Stack.Screen name='NewPassword' component={NewPasswordScreen}/>
            <Stack.Screen name='ResetPassword' component={ResetPasswordScreen}/>                   
    </Stack.Navigator>
  )
}





const Navigation = () => {

  const id=useSelector(state=>state.ReducerUserInfo.id)
  const isloading=useSelector(state=>state.ReducerLogicFrontEnd.isLoading)


  if(isloading){
    return(
      <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
        <ActivityIndicator />
      </View>
    )
  }

  if(id==null ){
    return(<AuthStack/>)
  }
  if(id){
    return(<MainAppScreen/>)
  }
}

export default Navigation