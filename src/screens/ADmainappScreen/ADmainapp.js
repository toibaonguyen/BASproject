import {View, Text, Alert, ScrollView, Pressable, ActivityIndicator} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import firestore from "@react-native-firebase/firestore"
import { setproducts } from '../../redux/store/action';



const RenderI = ({text, onPress}) => {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          alignItems:"center",
          justifyContent:"center",
          height:100,
          marginHorizontal:15,
          borderWidth:1,
          borderRadius:5,
          marginTop:15
        }}>
        <Text>{text}</Text>
      </View>
    </Pressable>
  );
};



const ADmainapp = () => {

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
    const subscriber = firestore().collection('Products')
    .onSnapshot(async querySnapshot => {
        const productslist = [];
        querySnapshot.forEach(documentSnapshot => {
          productslist.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });
        dispatch(setproducts(productslist));
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
    <ScrollView>
      <Text
        style={{
          marginTop: 10,
          alignSelf: 'center',
          fontWeight: 'bold',
          fontSize: 40,
          marginBottom:15
        }}>
        Welcome!
      </Text>
      <RenderI text={'Manage products'} onPress={()=>{navigation.navigate('manageproduct')}}/>
      <RenderI text={'Manage Users'} onPress={()=>{navigation.navigate('manageusers')}}/>
      <RenderI text={'Manage list of Deliveryman'} onPress={()=>{navigation.navigate('managedeliveryman')}}/>
      <RenderI text={'Manage orders'} onPress={()=>{navigation.navigate('manageorders')}}/>
      <RenderI text={'Income'} onPress={()=>{navigation.navigate('manageincome')}}/>
    </ScrollView>
  );
};

export default ADmainapp;
