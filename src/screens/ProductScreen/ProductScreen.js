import { View, Text,ScrollView,Pressable } from 'react-native'
import React, {useState,useEffect} from 'react'
import styles from './styles'
import { Picker } from '@react-native-picker/picker'
import QuantinySelector from '../../components/QuantinySelector'
import CustomButton from '../../components/CustomButton'
import ImageCarousel from '../../components/ImageCarousel'
import { Avatar } from 'react-native-paper'
import firestore from "@react-native-firebase/firestore"
import storage from "@react-native-firebase/storage"



const ProductScreen = ({ route, navigation }) => {


  const {id}=route.params;

  const [options,setOptions]=useState([])
  const [images,setImages]=useState([])
  const [productname,setProductname]=useState("")
  const [price,setPrice]=useState(0)
  const [oldprice,setOldprice]=useState("")
  const [description,setDescription]=useState("")
  const [maxQuantity,setMaxQuantity]=useState(0)

  const getSampleImage = async() => {
    const urls = [];
    await storage().ref().child(`products/product/${id}/images/`).listAll().then(
      res=>res.items.forEach((item)=>{
        console.log(item.name)
      })
    )
    
    console.log("Images000:",images)
  }


  useEffect(() => {
    getSampleImage();
    const subscriber = firestore()
      .collection('Products')
      .doc(id)
      .onSnapshot(documentSnapshot => {
        //console.log('Product data: ', documentSnapshot.data());
        setOptions(documentSnapshot.data().options);
        setProductname(documentSnapshot.data().productname);
        setPrice(documentSnapshot.data().price);
        setOldprice(documentSnapshot.data().oldPrice);
        setDescription(documentSnapshot.data().description);
        setMaxQuantity(documentSnapshot.data().maxQuantity);


      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);
  
  

  
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

      <Text style={styles.price}>
        {price} VNĐ
        <Text> </Text>
        {oldprice && <Text style={styles.oldPrice}>{oldprice} VNĐ</Text>}
      </Text> 
      
      <Text style={styles.descriptionTitle}>Features & details</Text>
      
      <Text style={styles.description}>
        {description}
      </Text>
      <QuantinySelector quantity={quantity} setQuantity={setQuantity} maxQuantity={maxQuantity} />
      <CustomButton text="Add to Cart" onPress={onAddtoCartPressed} fgColor="black" bgColor="#4B8CE5"/>
      <CustomButton text="Buy Now" onPress={onBuyNowPressed} bgColor="#d1d1d1" fgColor="black"/>
      <View style={styles.avatarseller}>
      <Pressable style={styles.traderinfo} onPress={()=>{console.log("okeoke")}}>
        <Avatar.Image />
        <Text style={{marginLeft:10}}>Username</Text>
      </Pressable>
      </View>
    </View>
  </ScrollView>
  )

}



export default ProductScreen