import { View, Text,ScrollView, Pressable,Dimensions } from 'react-native'
import React, {useState} from 'react'
import styles from './styles'
import { Picker } from '@react-native-picker/picker'
import QuantinySelector from '../../components/QuantinySelector'
import CustomButton from '../../components/CustomButton'
import ImageCarousel from '../../components/ImageCarousel'
import { Avatar } from 'react-native-paper'
const width=Dimensions.get("window").width;
const height=Dimensions.get("window").height;


const TradingProductScreen = ({productname,description,options,images,maxQuantity,sellerID}) => {


  const [selectedOption,setselectedOption]=useState(options?options[0]:null)
  const [quantity,setQuantity]=useState(1)

  const onAddtoCartPressed=()=>{
    console.log("Add to cart")
  }
  const onBuyNowPressed=()=>{
    console.log("Buy now")
  }

  return (
  <ScrollView>
    <View style={styles.root}> 
      <ImageCarousel images={images}/>
      

      <Text style={styles.title}>{productname} </Text>
      {
        options &&
        <Picker
        selectedValue={selectedOption}
        onValueChange={(itemvalue)=>setselectedOption(itemvalue)}>
        {
          options.map((option,i)=>(<Picker.Item key={i} label={option} value={option}/>))
        }
        </Picker>
      }

      
      
      <Text style={styles.descriptionTitle}>Features & details</Text>
      
      <Text style={styles.description}>
        {description}
      </Text>
      <QuantinySelector quantity={quantity} setQuantity={setQuantity} maxQuantity={maxQuantity} />
      <CustomButton text="Add to Cart" onPress={onAddtoCartPressed} fgColor="black" bgColor="#4B8CE5"/>
      <CustomButton text="Trade Now" onPress={onBuyNowPressed} bgColor="#d1d1d1" fgColor="black"/>
      <View style={styles.avatartrader}>
      <Pressable style={styles.traderinfo} onPress={()=>{console.log("okeoke")}}>
        
        <Avatar.Image source={{uri:""}}/>
        <Text style={{marginLeft:10}}>Username</Text>
      </Pressable>
      </View>
      

    </View>
  </ScrollView>
  )
}



export default TradingProductScreen