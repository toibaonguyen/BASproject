import { View, Text,StyleSheet,ScrollView } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../../components/CustomButton/CustomButton'
import CustomInput from '../../components/CustomInput'
import { useNavigation } from '@react-navigation/native'
const ConfirmEmail = () => {
  
  
  const navigation=useNavigation()
  const [code,setcode]=useState("")
  
  
  
  
  const onConfirmPressed =()=>{
    console.warn("onConfirmPressed")
  }
  const onResendPressed=()=>{
    console.warn("onResendPressed")
  }
  const onGoBackSignInPressed=()=>{
    navigation.navigate('SignIn')
  }
  return (
    <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
    <View style={styles.root}>
      <Text style={styles.title}>Confirm your email</Text>
      <CustomInput placeholder="Enter your confirmation code" value={code} setvalue={setcode}/>
      <CustomButton text="Confirm" onPress={onConfirmPressed}/>
      <CustomButton text="Resend" onPress={onResendPressed} type="SECONDARY"/>
      <CustomButton text="Back to Sign in" onPress={onGoBackSignInPressed} type="TERTIARY"/>

   
     
      
      
    </View>
    </ScrollView>
  )
}

const styles=StyleSheet.create({
  logo:{width:'70%',height:"30%",maxHeight:300,maxWidth:200},
  root:{padding:20,alignItems:"center",flex:1},
  title:{fontSize:24, fontWeight:"bold", color:"#051C63",margin:10},
  text:{color:'gray',marginVertical:10},
  link:{color:"#FDB075"}

})

export default ConfirmEmail