import { View, Text, FlatList, SafeAreaView } from 'react-native';
import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import firestore from "@react-native-firebase/firestore"
import { useEffect } from 'react';
import { useState } from 'react';
import ProductItemforAD from '../../components/ProductItemforAD';
import { TextInput } from 'react-native-paper';


const Tab = createMaterialTopTabNavigator();

const Pending=()=>{

  const [products,setProducts]=useState([])

  useEffect(()=>{
    const subscriber = firestore()
    .collection('Products')
    .onSnapshot(async querySnapshot => {
      const productslist = [];
      querySnapshot.forEach(documentSnapshot => {
        if(documentSnapshot.data().status=="pending"){
          productslist.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        }
        
      })

      setProducts(productslist)
    })
  return () => subscriber();
  },[])
  return(
    <View>
      <FlatList
      data={products}
      showsVerticalScrollIndicator={false}
      renderItem={({item})=>{
        return(<ProductItemforAD item={item}/>)
    }}
      />
    </View>
  )
}
const Valid=()=>{

  const [products,setProducts]=useState([])
  const [searchtext,setSearchtext]=useState("")

  useEffect(()=>{
    const subscriber = firestore()
    .collection('Products')
    .onSnapshot(async querySnapshot => {
      const productslist = [];
      querySnapshot.forEach(documentSnapshot => {
        if(documentSnapshot.data().status=="valid"){
          productslist.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        }
        
      })

      setProducts(productslist)
    })
  return () => subscriber();
  },[])
  return(

    <SafeAreaView style={{height:"100%",width:"100%"}}>

      <TextInput 
        style={{margin:10}} 
        mode="flat" 
        outlineColor='#fff' 
        value={searchtext} 
        onChangeText={setSearchtext}
      />

      <FlatList
      data={products}
      showsVerticalScrollIndicator={false}
      renderItem={({item})=>{
        if(searchtext==""){
          return(<ProductItemforAD item={item}/>)
        }
        if(item.productname.toUpperCase().includes(searchtext.toUpperCase())){
          return(<ProductItemforAD item={item}/>)
        }
      }}
      />

    </SafeAreaView>
  )
}
const Cancelled=()=>{

  const [products,setProducts]=useState([])
  const [searchtext,setSearchtext]=useState("")

  useEffect(()=>{
    const subscriber = firestore()
    .collection('Products')
    .onSnapshot(async querySnapshot => {
      const productslist = [];
      querySnapshot.forEach(documentSnapshot => {
        if(documentSnapshot.data().status=="cancelled"){
          productslist.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        }
        
      })

      setProducts(productslist)
    })
  return () => subscriber();
  },[])
  return(

    <SafeAreaView style={{height:"100%",width:"100%"}}>

      <TextInput 
        style={{margin:10}} 
        mode="flat" 
        outlineColor='#fff' 
        value={searchtext} 
        onChangeText={setSearchtext}
      />

      <FlatList
      data={products}
      showsVerticalScrollIndicator={false}
      renderItem={({item})=>{
        if(searchtext==""){
          return(<ProductItemforAD item={item}/>)
        }
        if(item.productname.toUpperCase().includes(searchtext.toUpperCase())){
          return(<ProductItemforAD item={item}/>)
        }
      }}
      />

    </SafeAreaView>
  )
}



const ADmanageProductScreen = () => {



  return (
    <Tab.Navigator>
      <Tab.Screen 
      name='Pending' 
      options={{title:"Pending products"}} 
      component={Pending}
      />
      <Tab.Screen 
      name='Valid' 
      options={{title:"Actived products"}} 
      component={Valid}
      />
      <Tab.Screen 
      name='Cancelled' 
      options={{title:"Unactived products"}} 
      component={Cancelled}
      />
    </Tab.Navigator>
  )
}

export default ADmanageProductScreen