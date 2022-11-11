import { View, Text,Pressable,StyleSheet,Image } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/FontAwesome"

const ProductItem = ({id,name,price,avgRating,image,ratings}) => {
  const onItemPressed=()=>{
    console.log(id);
  }
  return ( 
      <Pressable onPress={onItemPressed} key={id} style={styles.page}>
        <View style={styles.root}>
            <Image style={styles.image} source={{uri:image}}/>
            <View style={styles.rightContainer}>
                <Text style={styles.title} maxFontSizeMultiplier={4}>{name}</Text>
                <View style={styles.ratingsContainer}>
                    {
                        [0,0,0,0,0].map((el,i)=>
                        <Icon key={i}
                        style={styles.star} 
                        name={i<Math.floor(avgRating)?"star":"star-o"} 
                        size={18} 
                        color="#e47911"/>
                        )
                    }   
                    <Text>{ratings}</Text>
                </View>
                <Text style={styles.price}>{price}</Text>
            </View>
        </View>
      </Pressable>
    
  )
}
const styles=StyleSheet.create({
    root:{
        flexDirection:"row",
        margin:10,
        borderWidth:1,
        borderColor:"#d1d1d1",
        borderRadius:10,
        backgroundColor:"#fff"
    },
    image:{flex:2,height:150,resizeMode:"contain"},
    rightContainer:{padding:10,flex:3},
    title:{fontSize:18},
    price:{fontSize:18,fontWeight:"bold",color:"black"},
    ratingsContainer:{flexDirection:"row"},
    star:{margin:2}
})

export default ProductItem