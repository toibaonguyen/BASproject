import { View, Text,ScrollView,StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../../components/CustomButton/CustomButton'
import CustomInput from '../../components/CustomInput'
import { useNavigation } from '@react-navigation/native'
import auth from '@react-native-firebase/auth'
const ResetPasswordScreen = () => {


    const navigation=useNavigation();
    const [email,setemail]=useState("");
    const onSendPressed =async()=>{
      //There are some code to check validity of username
      if(email.length==0){
        Alert.alert("Error","The email input is blank!")
        return
      }
      
      await auth()
        .sendPasswordResetEmail(email)
        .then(()=>{navigation.navigate('NewPassword')})
        .catch((e)=>{
          if(e.code=="auth/invalid-email"){
            Alert.alert("Error","The email address is badly formatted.")
          }
          else if(e.code=="auth/user-not-found")
          {
            Alert.alert("Error","There is no user record corresponding to this identifier.")
          }
          else{
            Alert.alert("Error","Error000")
          }
        })
      
      
        
    }
  
    const onGoBackPressed=()=>{
      navigation.goBack()
    }
    return (
      <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Reset your password</Text>
        <CustomInput placeholder="Enter your email" value={email} setvalue={setemail}/>
        <CustomButton text="Send" onPress={onSendPressed}/>
        <CustomButton text="Back to Sign in" onPress={onGoBackPressed} type="TERTIARY"/>
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
  
export default ResetPasswordScreen