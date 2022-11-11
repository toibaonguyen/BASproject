import { View, Text,ScrollView,StyleSheet } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../../components/CustomButton/CustomButton'
import CustomInput from '../../components/CustomInput'
import { useNavigation } from '@react-navigation/native'
const NewPasswordScreen = () => {
  const [code,setcode]=useState("")
  const [newpassword,setnewpassword]=useState("")

  const navigation=useNavigation()
  
  const onSubmitPressed =()=>{
    console.warn("onSubmitPressed")
  }
  const onSignInPressed=()=>{
    navigation.navigate('SignIn')
  }
  return (
    <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
    <View style={styles.root}>
      <Text style={styles.title}>Confirm your email</Text>
      <Text>The email vertification has been sent. Please check your email!</Text>
      <CustomButton text="Back to Sign in" onPress={onSignInPressed} type="TERTIARY"/>

   
     
      
      
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

export default NewPasswordScreen