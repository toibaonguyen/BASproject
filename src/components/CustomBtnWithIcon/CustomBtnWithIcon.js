import { View, Text,TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/AntDesign"

const CustomBtnWithIcon = ({onPress,text,type="PRIMARY",bgColor,fgColor,iconname,iconcolor}) => {
  return (
    <TouchableOpacity 
    onPress={onPress} 
    style={[
        styles.container,
        styles[`container_${type}`],
        bgColor?{backgroundColor:bgColor}:{}
    ]}>
      <Icon name={iconname} color={iconcolor} size={18} style={{alignSelf:"center"}}/>
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
    container:{width:"100%",padding:15,borderRadius:5,flexDirection:"row"},
    container_PRIMARY:{backgroundColor:"#3B71F3",},
    container_TERTIARY:{},
    text:{color:"white",marginLeft:10,alignSelf:"center",fontSize:18},
    text_TERTIARY:{color:"gray"},
    container_SECONDARY:{borderWidth:2,borderColor:"#3B71F3"},
    text_SECONDARY:{color:"#3B71F3"}
})

export default CustomBtnWithIcon