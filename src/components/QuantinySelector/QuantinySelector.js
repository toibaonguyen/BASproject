import { View, Text,Pressable,StyleSheet,TextInput } from 'react-native'
import React from 'react'

const QuantinySelector = ({quantity,setQuantity,maxQuantity}) => {
  const onMinus=()=>{
    if(maxQuantity<=0){
      setQuantity(0)
      return;
    }
    if(quantity==1||quantity==0){
      return;
    }
    setQuantity(quantity-1)
  }
  const onPlus=()=>{
    if(maxQuantity<=0){
      setQuantity(0)
      return;
    }
    if(quantity==maxQuantity){
      return;
    }
    if(quantity>maxQuantity){
      setQuantity(maxQuantity)
      return;
    }
    setQuantity(Number(quantity)+1)
  }
  return (
    <View style={styles.root}>
      <Pressable onPress={onMinus} style={styles.button}>
        <Text style={styles.buttontext}>-</Text>
      </Pressable>
      <Text style={styles.quantity}>{quantity}</Text>
      <Pressable onPress={onPlus} style={styles.button}>
        <Text style={styles.buttontext}>+</Text>
      </Pressable>
    </View>
  )
}

const styles=StyleSheet.create({
    root:{
        flexDirection:"row",
        alignItems:"center",
        borderWidth:1,
        borderColor:"#e3e3e3",
        justifyContent:"space-between",
        width:130
    },
    button:{
        width:25,
        height:25,
        alignItems:"center",
        justifyContent:"center",
        backgroundColor:"#d1d1d1"
    },
    buttontext:{
        fontSize:18,
    },
    quantity:{
        color:"#007eb9"
    },

})

export default QuantinySelector