import { View, Text } from 'react-native'
import React,{useEffect} from 'react'
import firestore from '@react-native-firebase/firestore'

const SellersPageScreen = ({route,navigation}) => {
  
  const {id,username,avatar}=route.params
  
  



  useEffect(()=>{
    
  },[])

  return (
    <View>
      <Text>{id}</Text>
      <Text>{username}</Text>
      <Text>{avatar}</Text>
    </View>
  )
}

export default SellersPageScreen