import { View, Text,ScrollView,Pressable,ActivityIndicator } from 'react-native'
import React, {useState,useEffect} from 'react'
import styles from './styles'
import { Picker } from '@react-native-picker/picker'
import QuantinySelector from '../../components/QuantinySelector'
import CustomButton from '../../components/CustomButton'
import ImageCarousel from '../../components/ImageCarousel'
import { Avatar } from 'react-native-paper'
import firestore from "@react-native-firebase/firestore"
import storage from "@react-native-firebase/storage"
import { useSelector } from 'react-redux'



const ProductScreen = ({ route, navigation }) => {

  const {id}=route.params;
  const [options,setOptions]=useState([])
  const [images,setImages]=useState([])
  const [productname,setProductname]=useState("")
  const [price,setPrice]=useState(0)
  const [oldprice,setOldprice]=useState("")
  const [description,setDescription]=useState("")
  const [maxQuantity,setMaxQuantity]=useState(0)
  const [sellerid,setsellerid]=useState("")
  const [selleravatar,setSelleravatar]=useState("https://www.linkpicture.com/q/useravatar.jpg")
  const [sellername,setSellername]=useState("Username")


  const pushtosellerspage=()=>{
    navigation.push("Sellerspage",{id:sellerid,avatar:selleravatar,username:sellername})
  }

  useEffect(() => {
    
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
        setImages(documentSnapshot.data().images);
        setsellerid(documentSnapshot.data().sellerID);
        
      });
    return () => subscriber();
  }, []);
  useEffect(() => {
    
    const getuser =async () => {
      await firestore().collection("Users").doc(sellerid).get().then(
        async (q)=>{
          await setSellername(q.data().username);
          await setSelleravatar(q.data().avatar);
          
        }
      ).catch(e=>{console.log(e)})
    }

    getuser();
  }, [sellerid]);
  
  

  
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
      <Pressable style={styles.traderinfo} onPress={pushtosellerspage}>
        <Avatar.Image source={{uri:selleravatar}}/>
        <Text style={{marginLeft:10}}>{sellername}</Text>
      </Pressable>
      </View>
    </View>
  </ScrollView>
  )

}



export default ProductScreen