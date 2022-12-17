import { View, Text,StyleSheet,Dimensions,Pressable } from 'react-native'
import React from 'react'
import BG from "../../../assets/images/ProductManageBG.jpg"
import Icon from "react-native-vector-icons/FontAwesome"
import { useState } from 'react'
import { useEffect } from 'react'


const ProductConditionItem = ({item,onPress}) => {

  const [icon,setIcon]=useState("minus")
  useEffect(()=>{
    if(item.status=="pending"){
      setIcon("minus")
    }
    else if( item.status=="valid"){
      setIcon("check")
    }
    else{
      setIcon("remove")
    }
  },[])

  return (
        <Pressable style={styles.container} onPress={onPress}>
            <View style={styles.leftside}>
              <Text style={styles.title}>{item.productname}</Text>
              <Text>{item.uploaddate}</Text>
            </View>
            <View style={styles[`rightside_${item.status}`]}>
              <Icon name={icon} size={30} color={"#FFF"}/>
            </View>
        </Pressable>
  )
}

const styles=StyleSheet.create({
  container: {
    width:"95%",
    height:80,
    borderRadius:15,
    backgroundColor:"white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    flexDirection:"row",
    alignSelf:"center",
    marginTop:5,
    marginBottom:5,
    flex:1
  },
  leftside:{
    flex:4,
    padding:10
  },
  rightside_pending:{
    flex:1,
    borderBottomRightRadius:15,
    borderTopRightRadius:15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    backgroundColor:"#FFE000",
    alignItems:"center",
    justifyContent:"center"
  },
  rightside_valid:{
    flex:1,
    borderBottomRightRadius:15,
    borderTopRightRadius:15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    backgroundColor:"#05B100",
    alignItems:"center",
    justifyContent:"center"
  },
  rightside_cancelled:{
    flex:1,
    borderBottomRightRadius:15,
    borderTopRightRadius:15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
    backgroundColor:"#E31100",
    alignItems:"center",
    justifyContent:"center"
  },
  title:{
    fontWeight:"bold",
    color:"#004E8E"
  }





})


export default ProductConditionItem