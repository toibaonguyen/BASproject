import { View, Text,Pressable,StyleSheet,Image } from 'react-native'
import React from 'react'
import Icon from "react-native-vector-icons/FontAwesome"
import { useNavigation } from '@react-navigation/native'

const ProductItem = ({item}) => {

    const navigation=useNavigation();
    const onItemPressed=()=>{
        console.log(item.id)
        navigation.push('ProductInfo', {id:item.id})
    }
    return ( 
      <Pressable onPress={onItemPressed} key={item.id} style={styles.page}>
        <View style={styles.root}>
            <Image style={styles.image} source={{uri:item.image}}/>
            <View style={styles.rightContainer}>
                <Text style={styles.title} maxFontSizeMultiplier={4}>{item.productname}</Text>
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
                    <Text>
                        <Text> (</Text>
                        {item.ratings}
                        <Text>)</Text>
                    </Text>
                </View>
                <Text style={styles.price}>
                    {item.price} VNĐ
                    <Text> </Text>
                    {
                        item.oldPrice && <Text style={styles.oldPrice}>{item.oldPrice} VNĐ</Text>
                    }
                    
                </Text>
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
        backgroundColor:"#fff",
        
    },
    image:{flex:2,height:150,resizeMode:"contain"},
    rightContainer:{padding:10,flex:3},
    title:{fontSize:18},
    price:{fontSize:18,fontWeight:"bold",color:"black",flexDirection:"row"},
    ratingsContainer:{flexDirection:"row"},
    star:{margin:2},
    oldPrice:{fontSize:12,fontWeight:"normal",textDecorationLine:"line-through"}
})

export default ProductItem