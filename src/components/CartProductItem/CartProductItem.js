import { View, Text,Pressable,StyleSheet,Image } from 'react-native'
import React,{useEffect} from 'react'
import Icon from "react-native-vector-icons/FontAwesome"
import IconAntDesign from "react-native-vector-icons/AntDesign"
import QuantinySelector from '../QuantinySelector'
import { useState } from 'react'
import { Button } from 'react-native-paper'
import firestore from '@react-native-firebase/firestore'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import Stars from "react-native-stars"



const CartProductItem = ({item}) => {

  const navigation=useNavigation()
  const products=useSelector(state=>state.ReducerListofProducts.products);
  const id=useSelector(state=>state.ReducerUserInfo.id)
  const shoppingCart=useSelector(state=>state.ReducerUserInfo.shoppingCart)
  const index0 = products.findIndex(object => {
    return object.id === item.productid;
  });
  const product=products[index0]
  

  const rt=()=>{
    let r1=0
    product.feedbacks.forEach(element => {
      r1+=Number(element.rating)
    });
    return r1/product.feedbacks.length
  }



  const removeProduct=async()=>{
    console.log(item)
    
    
    await firestore().collection("Users").doc(id).update({
        shoppingCart: shoppingCart.filter(post => post.ownID!==item.ownID)
      }).catch(e=>{console.log('loi la:',e)})
  }
  const buynow=()=>{
    navigation.navigate("Address",{list:[item]})
  }
  
  return ( 
        <View style={styles.root0}>
            
        <View style={styles.root}>
            <Image style={styles.image} source={{uri:product.thumbnail}}/>
            <View style={styles.rightContainer}>
                <Text style={styles.title} maxFontSizeMultiplier={4}>{product.productname}</Text>
            <View>
          <Stars
          half={true}
          display={rt()}
          count={5}
          starSize={25}
          disabled={true}
          emptyStar={<Icon
            name={'star-o'}
            color="#e47911"
            style={styles.star}
            size={25}
          />}
          halfStar={<Icon
            name={'star-half-full'}
            color="#e47911"
            style={styles.star}
            size={25}
          />
          }
          fullStar={
            <Icon
            name={'star'}
            color="#e47911"
            style={styles.star}
            size={25}
          />
          }
          />
        </View>
                <Text style={styles.price}>
                    {products[0].price} VNĐ
                    <Text> </Text>
                    {
                        item.oldPrice&&<Text style={styles.oldPrice}>{product.oldPrice} VNĐ</Text>
                    }
                    
                </Text>
                {
                    item.option&&<Text>{item.option}</Text>
                }
                
            </View>
        </View>
        <View style={styles.quantity}>
            <Text>Quantity: {item.quantity}</Text>
        </View>
        <View style={styles.quantity}>
            {
                item.option&&<Text>Option: {item.option}</Text>
            }
            
        </View>
        <View style={styles.selectionbar}>
            <Button mode="elevated" onPress={removeProduct}>
                <IconAntDesign name='delete' color="#3262A5"/>
            </Button>
            <View style={{marginLeft:10}}>
            <Button mode="elevated" buttonColor='#1452A7' textColor='#fff' onPress={buynow}>
                Buy now
            </Button>
            </View>
            

        </View>
        
        </View>
    
  )
}
const styles=StyleSheet.create({
    root0:{
        margin:10,
        backgroundColor:"#fff",
        borderWidth:1
    },
    root:{
        flexDirection:"row",
        marginVertical:5,
    },
    image:{flex:2,height:150,resizeMode:"contain"},
    rightContainer:{padding:10,flex:3},
    title:{fontSize:18},
    price:{fontSize:18,fontWeight:"bold",color:"black",flexDirection:"row"},
    ratingsContainer:{flexDirection:"row"},
    star:{margin:2},
    oldPrice:{fontSize:12,fontWeight:"normal",textDecorationLine:"line-through"},
    quantity:{marginLeft:10,marginTop:10},
    selectionbar:{flexDirection:"row",marginLeft:10,marginBottom:5,marginTop:5}


})

export default CartProductItem