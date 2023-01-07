import { View, Text, Alert } from 'react-native'
import React from 'react'
import { Button, TextInput } from 'react-native-paper'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import firestore from '@react-native-firebase/firestore'

const PaymentScreen = () => {

    const wallet=useSelector(state=>state.ReducerUserInfo.wallet)
    const id=useSelector(state=>state.ReducerUserInfo.id)

    const [value,setvalue]=useState(0)
    
    
    const onGetCash=async()=>{
        if(Number(value)>wallet){
            Alert.alert("Error!","balance is insufficient")
            return;
        }

        await firestore().collection("Users").doc(id).update({
            wallet:wallet-Number(value)
        }).then(()=>{
            Alert.alert("Successfully","Please check out your bank")
        })

    }


  return (
    <View style={{height:"100%",width:"100%"}}>
      <Text style={{fontWeight:"bold",marginLeft:10,marginTop:10}}>Your Wallet:</Text>
      <View style={{marginTop:10,borderTopWidth:2,padding:10,alignItems:"center",justifyContent:"center",height:"30%",borderBottomWidth:1,backgroundColor:"#fff"}}>
        <Text style={{color:"green",fontSize:30}}>{wallet} <Text style={{color:"black",fontSize:15}}>VND</Text></Text>
      </View>
      <View style={{marginTop:10}}>
        <TextInput value={value} onChangeText={setvalue}/>
      </View>
      <View>
        <Button onPress={onGetCash}>Get Cash</Button>
      </View>
    </View>
  )
}

export default PaymentScreen