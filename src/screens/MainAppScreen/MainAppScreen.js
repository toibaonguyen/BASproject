import { View, Text,SafeAreaView } from 'react-native'
import React,{useEffect, useState} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../HomeScreen/HomeScreen'
import UserInfoScreen from '../UserInfoScreen'
import { useSelector, useDispatch } from 'react-redux'
import firestore from "@react-native-firebase/firestore"
import storage from "@react-native-firebase/storage"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import  Foundation from "react-native-vector-icons/Foundation"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import ShoppingCartScreen from "../ShoppingCartScreen"
import ProductScreen from '../ProductScreen'
import AddressScreen from '../AddressScreen'
import UploadProductTestScreen from '../UploadProductTestScreen'



import {setuseremail,setusername,setuserphone,setuserhintname,setuseravatar} from "../../redux/store/action"



const Tab=createBottomTabNavigator()
const RootStack=createNativeStackNavigator()


const BottomTab=()=>{

  return(
  <Tab.Navigator  screenOptions={{headerShown:false, tabBarActiveTintColor:"#DF9F00", tabBarInactiveTintColor:"#FFE092",tabBarShowLabel:false}} initialRouteName={"Home"}>     
    <Tab.Screen name='Home' component={HomeScreen} 
    options={{title:"Home",
      tabBarIcon:({color})=>(
    <Foundation name='home' color={color} size={25}/>
    )
    }}/>
    <Tab.Screen name='UploadTest' component={UploadProductTestScreen} options={{title:"UploadTest",
    tabBarIcon:({color})=>(
      <Foundation name='home' color={color} size={25}/>
      )
  }} />
    <Tab.Screen name='ShoppingCart' component={ShoppingCartScreen} options={{title:"Cart",
  tabBarIcon:({color})=>(
    <MaterialCommunityIcons name='cart' color={color} size={25}/>
    )
  }} />
    <Tab.Screen name='UserInfo' component={UserInfoScreen} options={{title:"Me",
  tabBarIcon:({color})=>(
    <FontAwesome name='user' color={color} size={25}/>
    )
  }} />
  </Tab.Navigator>
  )
}






const MainAppScreen = () => {

  const id=useSelector(state=>state.ReducerUserInfo.id)
  const fullname=useSelector(state=>state.ReducerUserInfo.name)
  const [isloading,setIsloading]=useState(false)

  const dispatch=useDispatch()

 
  useEffect(()=>{

    
    try{
    const subscriber = firestore()
      .collection('Users')
      .doc(id)
      .onSnapshot(documentSnapshot => {
        //console.log('User data: ', documentSnapshot.data());
        dispatch(setusername(documentSnapshot.data().username))
        dispatch(setuseremail(documentSnapshot.data().email))
        dispatch(setuserphone(documentSnapshot.data().phonenumber))
        dispatch(setuserhintname(documentSnapshot.data().fullname))
        dispatch(setuseravatar(documentSnapshot.data().avatar))
      })

    return () => subscriber();
  }catch(e){
    console.error(e)
  }
  },[])
  








  return (
   <RootStack.Navigator screenOptions={{}} initialRouteName={"PrimaryUI"}>
    <RootStack.Screen component={BottomTab} name="PrimaryUI" options={{headerShown:false}}/>
    <RootStack.Screen component={ProductScreen} name="ProductInfo" options={{headerTitle:"Detail"}}/>
    <RootStack.Screen component={AddressScreen} name="Address" options={{headerTitle:"Address information"}}/>
    
   </RootStack.Navigator>
    
  )
}

export default MainAppScreen