import { View, Text,SafeAreaView } from 'react-native'
import React,{useEffect} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../HomeScreen/HomeScreen'
import UserInfoScreen from '../UserInfoScreen'
import { useSelector, useDispatch } from 'react-redux'
import firestore from "@react-native-firebase/firestore"
import storage from "@react-native-firebase/storage"



import {setuseremail,setusername,setuserphone,setuserhintname,setuseravatar} from "../../redux/store/action"



const Tab=createBottomTabNavigator()

const MainAppScreen = () => {

  const id=useSelector(state=>state.ReducerUserInfo.id)
  const fullname=useSelector(state=>state.ReducerUserInfo.name)

  const dispatch=useDispatch()

  async function getavatar(m){
    await storage().ref(`avatar/${id}/avatar`).getDownloadURL().then(url=>{dispatch(setuseravatar(url))})
      .catch(e=>dispatch(setuseravatar(m)))
  }
  useEffect(()=>{

    
    try{
    const subscriber = firestore()
      .collection('Users')
      .doc(id)
      .onSnapshot(documentSnapshot => {
        console.log('User data: ', documentSnapshot.data());
        dispatch(setusername(documentSnapshot.data().username))
        dispatch(setuseremail(documentSnapshot.data().email))
        dispatch(setuserphone(documentSnapshot.data().phonenumber))
        dispatch(setuserhintname(documentSnapshot.data().fullname))
        getavatar(documentSnapshot.data().baseavatar)
      })
      

    // Stop listening for updates when no longer required
    return () => subscriber();
  }catch(e){
    console.error(e)
  }
  },[])








  return (
    <Tab.Navigator screenOptions={{headerShown:false}}>
      
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='UserInfo' component={UserInfoScreen} options={{title:"Me"}} />
       
        

    </Tab.Navigator>
    
  )
}

export default MainAppScreen