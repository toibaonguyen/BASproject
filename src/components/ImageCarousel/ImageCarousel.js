import { View, Text,FlatList,Image,StyleSheet,Dimensions } from 'react-native'
import React from 'react'
import { Item } from 'react-native-paper/lib/typescript/components/List/List'
import { useState } from 'react';
import { useCallback } from 'react';

const height=Dimensions.get("window").height;
const width=Dimensions.get("window").width;
const ImageCarousel = ({images}) => {

  const [activeIndex,setActiveIndex]=useState(0)


  const onFlatlistUpdate=useCallback(({viewableItems})=>{
    if(viewableItems.length>0){
      setActiveIndex(viewableItems[0].index||0)
    }
    console.log(viewableItems)
  },[])
  return (
    <View style={styles.root}>
      <FlatList 
      snapToInterval={width-20}
      snapToAlignment={"center"}
      decelerationRate={"fast"}
      showsHorizontalScrollIndicator={false}
      viewabilityConfig={{viewAreaCoveragePercentThreshold:50}}
      onViewableItemsChanged={onFlatlistUpdate}
      horizontal={true}
      data={images} 
      renderItem={({item})=>(
        <Image style={styles.image} source={{uri:item}}/>
      )}
      />
      <View style={styles.dots}>
        {
          images.map((images,index)=>(
            <View key={index} style={[styles.dot,{
              backgroundColor: index === activeIndex ? '#c9c9c9' : '#ededed'
            }]}/>
          ))
        }
      </View>
      
    </View>
  )
}

const styles=StyleSheet.create({
    root:{},
    image:{height:250,resizeMode:"contain",margin:10,width:width-40},
    dot:{width:10,height:10,borderRadius:25,borderWidth:1,borderColor:"#c9c9c9",margin:5,backgroundColor:"#ededed"},
    dots:{flexDirection:"row",justifyContent:"center"},

    
})

export default ImageCarousel