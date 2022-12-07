import { View, Text,ScrollView,SafeAreaView,StyleSheet,Image,FlatList,ActivityIndicator } from 'react-native'
import React from 'react'
import { Button } from 'react-native'
import auth from "@react-native-firebase/auth"
import { Alert,TouchableOpacity } from 'react-native'
import ProductItem from '../../components/ProductItem'
//import products from '../../../Data/products'
import { useSelector,useDispatch } from 'react-redux'
import { useEffect,useState } from 'react'
import firestore from "@react-native-firebase/firestore"
import {setproducts} from "../../redux/store/action"
import storage from "@react-native-firebase/storage"

const HomeScreen = () => {

  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [checkimageswitch,setCheckimageswitch]=useState(0);

  const products=useSelector(state=>state.ReducerListofProducts.products)

  const dispatch=useDispatch();

  useEffect(()=>{

    const subscriber = firestore().collection('Products').onSnapshot(
          async (querySnapshot)=>{
            const productslist=[];
            querySnapshot.forEach((documentSnapshot) => {
              console.log("ref: ",`products/product/${documentSnapshot.id}/representativeImage/i0`)
              const ref=`products/product/${documentSnapshot.id}/representativeImage/i0.jpg`
              productslist.push({
                ...documentSnapshot.data(),
                id: documentSnapshot.id
              });
            }
            );
            dispatch(setproducts(productslist));
            setLoading(false);
          }
        )
    return () => subscriber();
  },[])
  if (loading) {
    return(
      <View style={styles.loading}>
        <ActivityIndicator size={"large"}/>
      </View>
    )
  }
  return (
    
      <View style={styles.root}>
        <FlatList 
        data={products} 
        showsVerticalScrollIndicator={false}
        renderItem={({item})=>
        <ProductItem item={item}
        />
      }/>
      </View>    
  )
}

const styles=StyleSheet.create({
  root:{},
  image:{},
  loading:{justifyContent:"center",alignItems:"center",flex:1}
})

export default HomeScreen