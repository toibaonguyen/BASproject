import { View, Text,ScrollView,SafeAreaView,StyleSheet,Image,FlatList } from 'react-native'
import React from 'react'
import { Button } from 'react-native'
import auth from "@react-native-firebase/auth"
import { Alert,TouchableOpacity } from 'react-native'
import CartProductItem from '../../components/CartProductItem'
import products from '../../../Data/products'
import CustomButton from "../../components/CustomButton"
import { useNavigation } from '@react-navigation/native'
const ShoppingCartScreen = () => {


  const navigation=useNavigation()


  const totalPrice=products.reduce(
    (summedprice,product)=>summedprice+product.price*32,0,
  )
  const onCheckout=()=>{
    console.log("okâys")
    navigation.navigate("Address")
  }

  return (
    
      <View style={styles.root}>
        
        <FlatList 
        ListFooterComponent={()=>(<View style={{marginLeft:5,marginRight:5}}>
          <Text style={{fontSize:18}}>
            Subtotal ({products.length} items):{" "}
            <Text style={{color:"#E3EE74 ",fontWeight:"bold"}}>{totalPrice}đ</Text>
          </Text>
          <CustomButton 
          text="Proceed to checkout" 
          fgColor="black" 
          bgColor="#f7e300"
          onPress={onCheckout}
          />
        </View>)}
        data={products} 
        showsVerticalScrollIndicator={false}
        renderItem={({item})=>
        <CartProductItem item={item}
        />
      }/>
      </View>    
  )
}

const styles=StyleSheet.create({
  root:{},
  image:{},
})

export default ShoppingCartScreen