import { View, Text,StyleSheet,Pressable,TouchableOpacity } from 'react-native'
import React from 'react'

const CustomButton = ({onPress,text,type="PRIMARY",bgColor,fgColor}) => {
  return (
    <TouchableOpacity 
    onPress={onPress} 
    style={[
        styles.container,
        styles[`container_${type}`],
        bgColor?{backgroundColor:bgColor}:{}
    ]}>
      <Text 
      style={[
        styles.text,
        styles[`text_${type}`],
        fgColor?{color:fgColor}:{}
        ]}
        >{text}</Text>
    </TouchableOpacity>
  )
}

const styles=StyleSheet.create({
    container:{width:"100%",padding:15,marginVertical:5,alignItems:"center",borderRadius:5},
    container_PRIMARY:{backgroundColor:"#3B71F3",},
    container_TERTIARY:{},
    text:{fontWeight:"bold",color:"white"},
    text_TERTIARY:{color:"gray"},
    container_SECONDARY:{borderWidth:2,borderColor:"#3B71F3"},
    text_SECONDARY:{color:"#3B71F3"}
})

export default CustomButton