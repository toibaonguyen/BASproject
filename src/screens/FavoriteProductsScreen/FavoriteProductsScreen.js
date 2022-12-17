import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import ProductItem from '../../components/ProductItem'
import { Item } from 'react-native-paper/lib/typescript/components/List/List'
const FavoriteProductsScreen = () => {
  
  const FavoriteProducts=useSelector(state=>state.ReducerUserInfo.favoriteProducts);
  const Products=useSelector(state=>state.ReducerListofProducts.products)
  
  const F_Length=FavoriteProducts.length




  if(F_Length>0){
    return (
        <View style={{flex:1}}>
          <FlatList 
           data={Products} 
           showsVerticalScrollIndicator={false}
           renderItem={({item})=>{
            if(FavoriteProducts.includes(item.id))
            return(<ProductItem item={item}/>)
        }}
        />
        </View>
      )
  }
  else{
    return(
        <View style={{flex:1}}>
            <Text style={{alignSelf:"center",marginTop:10}}>No product here</Text>
        </View>
    )
  }

  
}

export default FavoriteProductsScreen