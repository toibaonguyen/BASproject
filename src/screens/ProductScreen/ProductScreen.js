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
import AntDesign from 'react-native-vector-icons/AntDesign'



const ProductScreen = ({ route, navigation }) => {

  const {id}=route.params;
  const userid=useSelector(state=>state.ReducerUserInfo.id);
  const favoriteProducts=useSelector(state=>state.ReducerUserInfo.favoriteProducts);
  const products=useSelector(state=>state.ReducerListofProducts.products);
  const baseavatar=useSelector(state=>state.ReducerUserInfo.baseavatar)

  const index0 = products.findIndex(object => {
    return object.id === id;
  });
  const product=products[index0]
  




  const [sellername,setSellername]=useState("")
  const [selleravatar,setSelleravatar]=useState(baseavatar)
  const [selectedOption,setselectedOption]=useState(product.options?product.options[0]:"")
  const [quantity,setQuantity]=useState(1)
  const [favoriteOne,setFavoriteOne]=useState(favoriteProducts.includes(id))

  const pushtosellerspage=()=>{
    navigation.push("Sellerspage",{id:product.sellerID,avatar:selleravatar,username:sellername})
  }
  useEffect(() => {
    
    const getuser =async () => {
      await firestore().collection("Users").doc(product.sellerID).get().then(
        async (q)=>{
          await setSellername(q.data().username);
          await setSelleravatar(q.data().avatar);
        }
      ).catch(e=>{console.log(e)})
    }

    getuser();
  }, []);
  
  

  
  

  const onAddtoCartPressed=async()=>{
    console.log("Add to cart")
    await firestore().collection("Users").doc(userid).update({

      shoppingCart: firestore.FieldValue.arrayUnion({id:id,quantity:quantity,option:selectedOption,ownID:String(new Date)+"_"+id+"_"+userid})
      
    })
    
  }
  const onBuyNowPressed=()=>{
    console.log("Buy now")
  }

  const onFavorite=async()=>{
    
    if(favoriteOne){
      await firestore().collection("Users").doc(userid).update({
        favoriteProducts:firestore.FieldValue.arrayRemove(id)
      }).then(()=>{setFavoriteOne(false)})
      return
    }
    else{
      await firestore().collection("Users").doc(userid).update({
        favoriteProducts:firestore.FieldValue.arrayUnion(id)
      }).then(()=>{setFavoriteOne(true)})
      return
    }
  }

  
  return (
  <ScrollView>
    <View style={styles.root}> 
      <ImageCarousel images={product.images}/>
      <Text style={styles.title}>{product.productname}</Text>
      {
        product.options &&
        <Picker
        selectedValue={selectedOption}
        onValueChange={(itemvalue)=>setselectedOption(itemvalue)}>
        {
          options.map((option,i)=>(<Picker.Item key={i} label={option} value={option} />))
        }
        </Picker>
      }
      <Text style={styles.price}>
        {product.price} VNĐ
        <Text> </Text>
        {product.oldprice && <Text style={styles.oldPrice}>{product.oldprice} VNĐ</Text>}
      </Text> 
      
      <Text style={styles.descriptionTitle}>Features & details</Text>
      
      <Text style={styles.description}>
        {product.description}
      </Text>
      {
        product.sellerID!=userid &&

      <View style={styles.favoriteIcon}>
        <Pressable onPress={onFavorite}>
          {
            favoriteOne?<AntDesign name='heart' color={"#E31100"} size={35}/>:<AntDesign name='hearto' color={"#000"} size={35}/>
          }
        </Pressable>
      </View>
      }
      <QuantinySelector quantity={quantity} setQuantity={setQuantity} maxQuantity={product.maxQuantity}/>

      {product.sellerID!=userid && <CustomButton text="Add to Cart" onPress={onAddtoCartPressed} fgColor="black" bgColor="#4B8CE5"/>}

      {product.sellerID!=userid && <CustomButton text="Buy Now" onPress={onBuyNowPressed} bgColor="#d1d1d1" fgColor="black"/>}

      <View style={styles.avatarseller}>
      <Pressable onPress={pushtosellerspage}>
        <Avatar.Image source={{uri:selleravatar}}/>
        <Text style={{marginLeft:10}}>{sellername}</Text>
      </Pressable>
      </View>
    </View>
  </ScrollView>
  )

}



export default ProductScreen