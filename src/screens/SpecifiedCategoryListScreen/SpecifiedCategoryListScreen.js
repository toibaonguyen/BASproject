import {View, Text} from 'react-native';
import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import ProductItem from '../../components/ProductItem';



const SpecifiedCategoryListScreen = ({route, navigation}) => {
  const {name} = route.params;
  const products=useSelector(state=>state.ReducerListofProducts.products)
  return (
    <FlatList
    data={products}
    renderItem={({item})=>{
    if(item.category==name)
    return(<ProductItem item={item}/>)
}}/>
  );
};

export default SpecifiedCategoryListScreen;
