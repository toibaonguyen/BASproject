import { View, Text,ScrollView,SafeAreaView,StyleSheet,Image,FlatList } from 'react-native'
import React from 'react'
import { Button } from 'react-native'
import auth from "@react-native-firebase/auth"
import { Alert,TouchableOpacity } from 'react-native'
import ProductItem from '../../components/ProductItem'
import products from '../../../Data/products'

const HomeScreen = () => {

  return (
    
      <View style={styles.root}>
        <FlatList 
        data={products} 
        showsVerticalScrollIndicator={false}
        renderItem={({item})=>
        <ProductItem
        id={item.id} 
        name={item.name} 
        price={item.price} 
        image={item.image} 
        avgRating={item.avgRating} 
        ratings={item.ratings}
        />
      }/>
      </View>    
  )
}

const styles=StyleSheet.create({
  root:{},
  image:{}
})

export default HomeScreen