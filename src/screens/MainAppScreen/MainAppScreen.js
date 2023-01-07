import { View, Text,SafeAreaView } from 'react-native'
import React,{useEffect, useState} from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../HomeScreen/HomeScreen'
import UserInfoScreen from '../UserInfoScreen'
import { useSelector, useDispatch } from 'react-redux'
import firestore from "@react-native-firebase/firestore"
import storage from "@react-native-firebase/storage"
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import  Foundation from "react-native-vector-icons/Foundation"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import Fontisto from "react-native-vector-icons/Fontisto"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import ShoppingCartScreen from "../ShoppingCartScreen"
import ProductScreen from '../ProductScreen'
import AddressScreen from '../AddressScreen'
import SellersPageScreen from '../SellersPageScreen'
import ProductsmanageScreen from '../ProductsmanageScreen'
import {
  setuseremail,
  setusername,
  setuserphone,
  setuserhintname,
  setuseravatar,
  setUserproducts,
  setboughtProductsHistory,
  setfavoriteProducts,
  setshoppingCart,
  setsoldProductsHistory,
  setsolvingProducts,
  setlistofsolvingProducts,
  setwallet
} from "../../redux/store/action"
import FavoriteProductsScreen from '../FavoriteProductsScreen'
import SuccessfullyOrderingScreen from '../SuccessfullyOrderingScreen'
import SolvingProductsScreen from '../SolvingProductsScreen'
import BoughtProductsProcessScreen from '../BoughtProductsProcessScreen'
import SellingProductsProcessScreen from '../SellingProductsProcessScreen'
import PaymentScreen from '../PaymentScreen'
import PostProductScreen from '../PostProductScreen'
import SuccessfulPostingProduct from '../SuccessfulPostingProduct'
import DiscoveryScreen from '../DiscoveryScreen'
import SpecifiedCategoryListScreen from '../SpecifiedCategoryListScreen'




const Tab=createBottomTabNavigator()
const RootStack=createNativeStackNavigator()

const BottomTab=()=>{

  const shoppingCart=useSelector(state=>state.ReducerUserInfo.shoppingCart)
  const solvingProducts=useSelector(state=>state.ReducerUserInfo.solvingProducts)
  const listofsolvingProducts=useSelector(state=>state.ReducerListofSolvingProducts.solvingProducts)
  const cancelledProducts=()=>{
    const k=[];
    solvingProducts.forEach(element => {
      const i=listofsolvingProducts.findIndex(obj=>{
        return obj.id===element
      })
      console.log(i)
      if(i>=0){
        if(listofsolvingProducts[i].status==="cancelled"){
          k.push(i)
        }
      }
    })
    return k.length;
  }
  const doneProducts=()=>{
    const k=[];
    solvingProducts.forEach(element => {
      const i=listofsolvingProducts.findIndex(obj=>{
        return obj.id===element
      })
      console.log(i)
      if(i>=0){
        if(listofsolvingProducts[i].status==="done"){
          k.push(i)
        }
      }
    })
    return k.length;
  }

  return(
  <Tab.Navigator screenOptions={{headerShown:false, tabBarActiveTintColor:"#008BFF", tabBarInactiveTintColor:"#9DD2FF",tabBarShowLabel:false,}} initialRouteName={"Home"}>     
    <Tab.Screen name='Home' component={HomeScreen} 
    options={{title:"Home",
      tabBarIcon:({color})=>(
    <Foundation name='home' color={color} size={25}/>
    )
    }}/>
    <Tab.Screen name='Discover' component={DiscoveryScreen} options={{title:"UploadTest",
    tabBarIcon:({color})=>(
      <Fontisto name='world' color={color} size={25}/>
      )
    }}/>
    <Tab.Screen name='SolvingProducts' component={SolvingProductsScreen} options={{title:"Solving Products",tabBarBadge:(solvingProducts.length-cancelledProducts()-doneProducts()>0)?solvingProducts.length-cancelledProducts()-doneProducts():null,
  tabBarIcon:({color})=>(
    <MaterialCommunityIcons name='format-list-bulleted-square' color={color} size={25}/>
    )
  }} />
    <Tab.Screen name='ShoppingCart' component={ShoppingCartScreen} options={{title:"Cart", tabBarBadge:shoppingCart.length>0?shoppingCart.length:null,
  tabBarIcon:({color})=>(
    <MaterialCommunityIcons name='cart' color={color} size={25}/>
    )
  }} />
    <Tab.Screen name='UserInfo' component={UserInfoScreen} options={{title:"Me",
  tabBarIcon:({color})=>(
    <FontAwesome name='user' color={color} size={25}/>
    )
  }} />
  </Tab.Navigator>
  )
}





const MainAppScreen = () => {

  const id=useSelector(state=>state.ReducerUserInfo.id)
  const fullname=useSelector(state=>state.ReducerUserInfo.name)
  const [isloading,setIsloading]=useState(false)
  const dispatch=useDispatch()

 
  useEffect(()=>{

    try{
    const subscriber = firestore()
      .collection('Users')
      .doc(id)
      .onSnapshot(documentSnapshot => {

        dispatch(setusername(documentSnapshot.data().username))
        dispatch(setuseremail(documentSnapshot.data().email))
        dispatch(setuserphone(documentSnapshot.data().phonenumber))
        dispatch(setuserhintname(documentSnapshot.data().fullname))
        dispatch(setuseravatar(documentSnapshot.data().avatar))
        dispatch(setUserproducts(documentSnapshot.data().products))
        dispatch(setshoppingCart(documentSnapshot.data().shoppingCart))
        dispatch(setsoldProductsHistory(documentSnapshot.data().soldProductsHistory))
        dispatch(setsolvingProducts(documentSnapshot.data().solvingProducts))
        dispatch(setboughtProductsHistory(documentSnapshot.data().boughtProductsHistory))
        dispatch(setfavoriteProducts(documentSnapshot.data().favoriteProducts))
        dispatch(setwallet(documentSnapshot.data().wallet))
        
      })

    return () => subscriber();
  }catch(e){
    console.error(e)
  }
  },[])

  useEffect(()=>{
    const subscriber=firestore().collection('SolvingProducts').onSnapshot(
      documentSnapshot=>{
        const List=[]
        documentSnapshot.forEach(
          d=>{
            List.push({
              ...d.data(),
              id:d.id
            });
          }
        )
        dispatch(setlistofsolvingProducts(List))
        console.log("List of solving products: ",List)
      }
    )
  },[])
  








  return (
   <RootStack.Navigator screenOptions={{}} initialRouteName={"PrimaryUI"}>
    <RootStack.Screen component={BottomTab} name="PrimaryUI" options={{headerShown:false}}/>
    <RootStack.Screen component={ProductScreen} name="ProductInfo" options={{headerTitle:"Detail"}}/>
    <RootStack.Screen component={AddressScreen} name="Address" options={{headerTitle:"Address information"}}/>
    <RootStack.Screen component={SellersPageScreen} name="Sellerspage" options={{headerTitle:""}}/>
    <RootStack.Screen component={ProductsmanageScreen} name="ProductManage" options={{headerShown:false}}/>
    <RootStack.Screen component={FavoriteProductsScreen} name="FavoriteProducts" options={{headerTitle:"Favorite Products"}}/>
    <RootStack.Screen component={SuccessfullyOrderingScreen} name="SuccessfulOrder" options={{headerShown:false}}/>
    <RootStack.Screen component={BoughtProductsProcessScreen} name="BoughtProcess" options={{headerTitle:"LIST"}}/>
    <RootStack.Screen component={SellingProductsProcessScreen} name="SoldProcess" options={{headerTitle:"LIST"}}/>
    <RootStack.Screen component={PaymentScreen} name="Paymentmethod" options={{headerTitle:""}}/>
    <RootStack.Screen component={PostProductScreen} name="PostProduct" options={{headerTitle:"Post it!"}}/>
    <RootStack.Screen component={SuccessfulPostingProduct} name="SuccessfulPost" options={{headerShown:false}}/>
    <RootStack.Screen component={SpecifiedCategoryListScreen} name="SpecifiedCategorylist" options={({ route }) => ({ title: route.params.name })}/>
   </RootStack.Navigator>
  )
}

export default MainAppScreen