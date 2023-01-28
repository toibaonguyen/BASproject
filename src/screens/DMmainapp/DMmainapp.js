import {View, Text, Alert, ScrollView, Pressable, ActivityIndicator, SafeAreaView} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import firestore from "@react-native-firebase/firestore"
import { setlistofsolvingProducts } from '../../redux/store/action';
import {createMaterialTopTabNavigator} from "@react-navigation/material-top-tabs"
import { Searchbar } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';




const Tab=createMaterialTopTabNavigator()



  
const OrderItem = ({item, onPress}) => {
  const navigation = useNavigation();

  if (item.status == 'deliverying') {
    return (
      <Pressable onPress={onPress}>
        <View
          style={{
            height: 70,
            borderRadius: 5,
            borderWidth: 1,
            backgroundColor: '#fff',
            flexDirection: 'row',
          }}>
          <View
            style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
            <Text>{item.id}</Text>
          </View>
          
            <View
              style={{
                backgroundColor: '#0097FF',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#fff'}}>{item.status}</Text>
            </View>
        </View>
      </Pressable>
    );
  }
};





const Needtodelivery=()=>{



  const listofsolvingProduct=useSelector(state=>state.ReducerListofSolvingProducts.solvingProducts)

  const DMid=useSelector(state=>state.ReducerDM.DMid)



  return(
    <SafeAreaView>
      <Searchbar/>
      <FlatList
      data={listofsolvingProduct}
      showsVerticalScrollIndicator={false}
      renderItem={({item})=>{
        if(item.dmID==DMid)
        return(<OrderItem item={item} />)
      }}
      />
    </SafeAreaView>
  )
}





const DMmainapp = () => {

  const dispatch=useDispatch();
  const [isloading,setIsloading]=useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      Alert.alert('Sign out?', 'Are you sure?', [
        {text: "Don't leave", style: 'cancel', onPress: () => {}},
        {
          text: 'Yes',
          style: 'destructive',
          onPress: () => navigation.dispatch(e.data.action),
        },
      ]);
    });
    const subscriber = firestore().collection('SolvingProducts')
    .onSnapshot(async querySnapshot => {
        const productslist = [];
        querySnapshot.forEach(documentSnapshot => {
          productslist.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });
        dispatch(setlistofsolvingProducts(productslist));
        setIsloading(false);
      });
    return () => subscriber();
  }, []);

  if(isloading){
    return(
    <View>
      <ActivityIndicator />
    </View>
    )
  }
  return (
    <Tab.Navigator>
      <Tab.Screen name='needtoship' component={Needtodelivery}/>
    </Tab.Navigator>
  );
};

export default DMmainapp;
