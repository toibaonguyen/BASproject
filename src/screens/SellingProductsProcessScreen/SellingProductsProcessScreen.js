import { View, Text, FlatList, Pressable, ScrollView,Dimensions,ActivityIndicator } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import AntDesign from "react-native-vector-icons/AntDesign"
import { useNavigation } from '@react-navigation/native'
import Modal from "react-native-modal";
import { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { Button } from 'react-native-paper'
import firestore from "@react-native-firebase/firestore"
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const Height=Dimensions.get("window").height
const Tab=createMaterialTopTabNavigator()


const SellingProductsProcessScreen = () => {
  const navigation=useNavigation()
  const solvingProducts=useSelector(state=>state.ReducerUserInfo.solvingProducts)
  const listofsolvingProducts=useSelector(state=>state.ReducerListofSolvingProducts.solvingProducts)
  const products=useSelector(state=>state.ReducerListofProducts.products)
  const id=useSelector(state=>state.ReducerUserInfo.id)
  const soldProductsHistory=useSelector(state=>state.ReducerUserInfo.soldProductsHistory)


  const [statewiththismodal,setStatewiththismodal]=useState({})
  const [ismodal,setIsmodal]=useState(false)
  const [loading,setLoading]=useState(false)



  const updateconfirm=async()=>{
    setLoading(true)
    await firestore().collection("SolvingProducts").doc(statewiththismodal.id).update(
      {
        status: "confirmed"
      }
    ).then(()=>{
      setLoading(false)
      setIsmodal(false)
    })
  }


  const updatecancel=async()=>{
    setLoading(true)
    await firestore().collection("SolvingProducts").doc(statewiththismodal.id).update(
      {
        status: "cancelled"
      }
    ).then(async()=>{
      const index0=listofsolvingProducts.findIndex(object => {
        return object.id === statewiththismodal.id;
      });
      
      const index1=products.findIndex(object => {
        return object.id === listofsolvingProducts[index0].productid;
      })
      await firestore().collection("Products").doc(products[index1].id).update({
        tendtodecreaseQuantity: firestore.FieldValue.increment(-(Number(listofsolvingProducts[index0].quantity)))
      }).then(()=>{
        setLoading(false)
        setIsmodal(false)
      })
    })
  }
  

  //custom components

  const ProcessItem=({item})=>{
    const index0=listofsolvingProducts.findIndex(object => {
      return object.id === item;
    });
    const index1=products.findIndex(object => {
      return object.id === listofsolvingProducts[index0].productid;
    }
    );
    const onPress=()=>{
      setStatewiththismodal(listofsolvingProducts[index0])
      setIsmodal(true)
    }
    if(listofsolvingProducts[index0].sellerID==id&&listofsolvingProducts[index0].status!=="cancelled"&&listofsolvingProducts[index0].status!=="done")
    return(
      <View
      style={{flexDirection:"row",height:200,borderWidth:1,margin:5,backgroundColor:"#fff"}}
      >
        <View style={{flex:4}}>
          <View style={{flex:4,padding:15}}>
          <Text style={{fontSize:25,color:"blue"}}>{products[index1].productname} <Text style={{fontSize:15,color:"black"}}>x{listofsolvingProducts[index0].quantity}</Text></Text>
          {
            listofsolvingProducts[index0].option&&<Text>Option: {listofsolvingProducts[index0].option}</Text>
          }
          </View>
          <View style={{flex:1,flexDirection:"row-reverse"}}>
            <Text>Status: {listofsolvingProducts[index0].status}</Text>
          </View>
        </View>
        <Pressable style={{flex:1,justifyContent:"center",alignItems:"center"}} onPress={onPress}>
          <AntDesign name='pluscircle'/>
        </Pressable>
      </View>
    )
  }

  const ProcessItem1=({item})=>{
    const index0=listofsolvingProducts.findIndex( object => {
      return object.id === item.solvingID;
    });
    const index1=products.findIndex(object => {
      return object.id === listofsolvingProducts[index0].productid;
    }
    );
    const onPress=()=>{
      
    }
    if(listofsolvingProducts[index0].sellerID==id&&listofsolvingProducts[index0].status!=="cancelled"&&listofsolvingProducts[index0].status!=="done")
    return(
      <View
      style={{flexDirection:"row",height:200,borderWidth:1,margin:5,backgroundColor:"#fff"}}
      >
        <View style={{flex:4}}>
          <View style={{flex:4,padding:15}}>
          <Text style={{fontSize:25,color:"blue"}}>{products[index1].productname} <Text style={{fontSize:15,color:"black"}}>x{listofsolvingProducts[index0].quantity}</Text></Text>
          {
            listofsolvingProducts[index0].option&&<Text>Option: {listofsolvingProducts[index0].option}</Text>
          }
          </View>
          <View style={{flex:1,flexDirection:"row-reverse"}}>
            <Text>Status: {listofsolvingProducts[index0].status}</Text>
          </View>
        </View>
        <Pressable style={{flex:1,justifyContent:"center",alignItems:"center",borderLeftWidth:1}} onPress={onPress}>
          <Text style={{color:"green"}}>+{item.money}</Text>
        </Pressable>
      </View>
    )
  }

  const History=()=>{
    return(
      <View>
        <FlatList 
         data={soldProductsHistory}
         renderItem={({item})=><ProcessItem1 item={item}/>}
      />
      </View>
    )
  }
  const Orders=()=>{
    return(
      <View>
        <FlatList 
         data={solvingProducts}
         renderItem={({item})=><ProcessItem item={item}/>}
        />
      </View>
    )
  }




  return (
    <View style={{width:"100%",height:"100%"}}>
      <Modal isVisible={ismodal}>
        <ScrollView>
          <View style={{backgroundColor:"#fff",height:Height,padding:20}}>
            <Text>Address: {statewiththismodal.address}</Text>
            <Text>Name: {statewiththismodal.fullname}</Text>
            <Text>Phone: {statewiththismodal.phone}</Text>
            {loading&& <ActivityIndicator size={"large"} color={"#0000ff"}/>} 
            {!loading&&<Button onPress={updateconfirm}>Confirm</Button>}
            {!loading&&<Button onPress={updatecancel}>Cancel</Button>}
            {!loading&&<Button onPress={()=>{setIsmodal(false)}}>Done</Button>}
          </View>
        </ScrollView>
      </Modal>
      <Tab.Navigator>
        <Tab.Screen name='orders' component={Orders}/>
        <Tab.Screen name='history' component={History}/>
      </Tab.Navigator>
    </View>
  )
}

export default SellingProductsProcessScreen