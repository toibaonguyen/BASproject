import { View, Text,ScrollView,SafeAreaView,StyleSheet,Image,FlatList } from 'react-native'
import React,{useEffect,useState} from 'react'
import { Button } from 'react-native'
import auth from "@react-native-firebase/auth"
import { Alert,TouchableOpacity } from 'react-native'
import CartProductItem from '../../components/CartProductItem'
import CustomButton from "../../components/CustomButton"
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import firestore from '@react-native-firebase/firestore'

const ShoppingCartScreen = () => {

  const shoppingCart=useSelector(state=>state.ReducerUserInfo.shoppingCart);
  const products=useSelector(state=>state.ReducerListofProducts.products);
  const PList=()=>{
    const list=[]
    shoppingCart.forEach(element => {
      products.forEach(i => {
        if(i.id===element.productid){
          list.push({price:i.price, quantity:element.quantity})
        }
      })
    })
    return list
  }



  const navigation=useNavigation()
  

  
  const onCheckout=()=>{
    console.log("okâys")
    if(shoppingCart.length==0){
      Alert.alert("Notice","There is currently no item in cart");
      return
    }
    const CopiedList=JSON.parse(JSON.stringify(shoppingCart))

    navigation.navigate("Address",{list:CopiedList})
  }

  return (
    
      <View style={styles.root}>
        
        <FlatList 
        ListFooterComponent={()=>(<View style={{marginLeft:5,marginRight:5}}>
          
          <CustomButton 
          text="Proceed to checkout" 
          fgColor="black" 
          bgColor="#f7e300"
          onPress={onCheckout}
          />
        </View>)}
        data={shoppingCart} 
        showsVerticalScrollIndicator={false}
        keyExtractor={(item,index)=>String(index)}
        renderItem={({item})=><CartProductItem item={item}/>
      }/>
      </View>    
  )
}

const styles=StyleSheet.create({
  root:{},
  image:{},
})

export default ShoppingCartScreen