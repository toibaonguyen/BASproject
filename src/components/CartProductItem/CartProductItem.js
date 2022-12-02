import { View, Text,Pressable,StyleSheet,Image } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/FontAwesome"
import IconAntDesign from "react-native-vector-icons/AntDesign"
import QuantinySelector from '../QuantinySelector'
import { useState } from 'react'
import { Button } from 'react-native-paper'

const CartProductItem = ({item}) => {
 
  const [quanTity,setQuanTity]=useState(item.quantity)
  return ( 
        <View style={styles.root0} key={item.id}>
            
        <View style={styles.root}>
            <Image style={styles.image} source={{uri:item.image}}/>
            <View style={styles.rightContainer}>
                <Text style={styles.title} maxFontSizeMultiplier={4}>{item.name}</Text>
                <View style={styles.ratingsContainer}>
                    {
                        [0,0,0,0,0].map((el,i)=>
                        <Icon key={i}
                        style={styles.star} 
                        name={i<Math.floor(item.avgRating)?"star":"star-o"} 
                        size={18} 
                        color="#e47911"/>
                        )
                    }   
                    <Text><Text> (</Text>
                        {item.ratings}
                        <Text>)</Text></Text>
                </View>
                <Text style={styles.price}>
                    {item.price} VNĐ
                    <Text> </Text>
                    {
                        item.oldPrice&&<Text style={styles.oldPrice}>{item.oldPrice} VNĐ</Text>
                    }
                    
                </Text>
                {
                    item.selectedOption&&<Text>{item.selectedOption}</Text>
                }
                
            </View>
        </View>
        <View style={styles.quantity}>
            <QuantinySelector quantity={quanTity} setQuantity={setQuanTity} maxQuantity={item.maxQuantity}/>
        </View>
        <View style={styles.selectionbar}>
            <Button mode="elevated" >
                <IconAntDesign name='delete' color="#3262A5"/>
            </Button>
            <View style={{marginLeft:10}}>
            <Button mode="elevated" buttonColor='#1452A7' textColor='#fff'>
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