import { View, Text, FlatList } from 'react-native'
import React,{useEffect} from 'react'
import firestore from '@react-native-firebase/firestore'
import { Avatar } from 'react-native-paper'
import { useSelector } from 'react-redux'
import ProductItem from '../../components/ProductItem'
const SellersPageScreen = ({route,navigation}) => {
  
  const {id,username,avatar}=route.params
  const products=useSelector(state=>state.ReducerListofProducts.products)

  return (
    <View style={{height:"100%",width:"100%"}}>

      <View style={{flex:1,flexDirection:"row"}}>
        <View style={{flex:1,alignItems:"center",justifyContent:"center",borderBottomLeftRadius:20,backgroundColor:"#2178FF"}}>
          <Avatar.Image source={{uri:avatar}}/>
        </View>
        <View style={{flex:2,justifyContent:"center",paddingLeft:10,backgroundColor:"#fff",borderBottomRightRadius:20}}>
          <Text style={{fontSize:20,color:"black",fontWeight:"normal"}}>{username}</Text>
        </View>
      </View>

      <View style={{flex:3,padding:10}}>
        <FlatList 
        data={products}
        showsVerticalScrollIndicator={false}
        renderItem={({item})=>{
          if(item.sellerID===id)
          return(<ProductItem item={item}/>)
        }}
        />
      </View>
    </View>
  )
}

export default SellersPageScreen