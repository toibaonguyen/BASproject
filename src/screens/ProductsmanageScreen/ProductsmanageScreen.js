import { View, Text, FlatList,ImageBackground,TouchableOpacity,Image,Alert } from 'react-native'
import Clipboard from '@react-native-clipboard/clipboard'
import React,{useState} from 'react'
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs'
import BG from "../../../assets/images/ProductManageBG.jpg"
import Logo from "../../../assets/images/Logo.png"
import Ionicons from "react-native-vector-icons/Ionicons"
import { Modalize } from 'react-native-modalize'
import { useSelector } from 'react-redux'
import ProductConditionItem from "../../components/ProductConditionItem"
import { Item } from 'react-native-paper/lib/typescript/components/List/List'
import Modal from "react-native-modal"

const Tab=createMaterialTopTabNavigator();




const ProductsmanageScreen = ({navigation}) => {

    

    const products=useSelector(state=>state.ReducerListofProducts.products);
    const id=useSelector(state=>state.ReducerUserInfo.id);

    
    const [selectedproduct,setSelectedProduct]=useState(products[0])
    



    const onGoBack=()=>{
     navigation.goBack()
    }

    const onPressValidProduct=(item)=>{
        
        setSelectedProduct(item);
        navigation.navigate("ProductInfo", {id:selectedproduct.id});


    }








    const PendingProductsScreen=()=>{

        return(
            <View style={{flex:1}}>
                <FlatList 
                data={products} 
                renderItem={({item})=>{
                if(item.status=="pending"&&item.sellerID==id)
                return <ProductConditionItem item={item}/>
                }
                } />
            </View>
        )
    }

    const ConfirmedProductsScreen=()=>{
        
        return(
            <View style={{flex:1}}>
                <FlatList 
                data={products} 
                renderItem={({item})=>{
                if(item.status=="valid"&&item.sellerID==id)
                return <ProductConditionItem item={item} onPress={
                    ()=>{
                        setSelectedProduct(item);
                        navigation.navigate("ProductInfo", {id:selectedproduct.id});
                    }
                }/>
                }
                } />
            </View>
        )
    }
    
    const RefusedProductsScreen=()=>{
        return(
            <View style={{flex:1}}>
                <FlatList 
                data={products} 
                renderItem={({item})=>{
                if(item.status=="cancelled"&&item.sellerID==id)
                return <ProductConditionItem item={item} onPress={
                    ()=>{
                        Clipboard.setString(item.id);
                        Alert.alert("Notice","The ID has been copied to clipboard")  
                    }
                }/>
                }
                } />
            </View>
        )
    }

  return(
    
    <ImageBackground
    source={BG}
    style={{height:"100%",width:"100%"}}
    >
        <View style={{flexDirection:"row",width:"100%",paddingHorizontal:20}}>
            <TouchableOpacity
            onPress={onGoBack}
            style={{
                paddingHorizontal:10,
                paddingVertical:13,
                borderRadius:10,
                marginTop:30,
                backgroundColor:'#46A2EE'
            }}>
                <Ionicons name='arrow-back' color="white" size={20}/>
            </TouchableOpacity>
        </View>
        <Image 
        source={Logo}
        style={{height:100,width:100,alignSelf:"center",marginTop:-30}}
        />
        
        <View style={{marginTop:10,backgroundColor:"#FFF",flex:1}}>
            <Tab.Navigator>
                <Tab.Screen name="pending" component={PendingProductsScreen}/>
                <Tab.Screen name="confirmed" component={ConfirmedProductsScreen}/>
                <Tab.Screen name="refused" component={RefusedProductsScreen}/>
            </Tab.Navigator>
        </View>
            
    </ImageBackground>
  )
}

export default ProductsmanageScreen