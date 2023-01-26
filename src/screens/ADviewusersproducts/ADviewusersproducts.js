import { View, Text, FlatList, SafeAreaView } from 'react-native'
import React from 'react'
import ProductItemforAD from '../../components/ProductItemforAD'
import { useSelector } from 'react-redux'

const ADviewusersproducts = ({route,navigation}) => {


  const userid=route.params.userid
  const products =useSelector(state=>state.ReducerListofProducts.products)
  
  const potu=()=>{
    const list=[];
    products.forEach(element => {
      if(element.sellerID==userid){
        list.push(element)
      }
    });
    return list
  }


  return (
    <SafeAreaView style={{width:"100%",height:"100%"}}>
      <FlatList
      data={potu()}
      renderItem={({item})=>{
        return <ProductItemforAD item={item}/>
      }}
      />

    </SafeAreaView>
  )
}

export default ADviewusersproducts