import { View, Text,FlatList, Pressable,Image, ImageBackground,StyleSheet, Alert } from 'react-native'
import React,{useState} from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useSelector } from 'react-redux'
import AntDesign from "react-native-vector-icons/AntDesign"
import { useNavigation } from '@react-navigation/native'
import { ActivityIndicator, Button,TextInput } from 'react-native-paper'
import Modal from "react-native-modal";
import NoItemHere0 from "../../../assets/images/NoItemHere0.png"
import Stars from "react-native-stars"
import Icon from 'react-native-vector-icons/FontAwesome';
import firestore from "@react-native-firebase/firestore"

const Tab=createMaterialTopTabNavigator()




const ProductItem=({item})=>{
  const navigation=useNavigation()
  const solvingProducts=useSelector(state=>state.ReducerUserInfo.solvingProducts)
  const listofsolvingProducts=useSelector(state=>state.ReducerListofSolvingProducts.solvingProducts)
  const products=useSelector(state=>state.ReducerListofProducts.products);
  const id=useSelector(state=>state.ReducerUserInfo.id)
  const boughtProductsHistory=useSelector(state=>state.ReducerUserInfo.boughtProductsHistory)
  const username = useSelector(state => state.ReducerUserInfo.name);
  const index0=listofsolvingProducts.findIndex(object => {
    return object.id === item;
  });
  const index1=products.findIndex(object => {
    
    return object.id === listofsolvingProducts[index0].productid;

  }
  );
  
  const onpressItem=()=>{
    navigation.navigate("ProductInfo",{id:products[index1].id})
  }
  if(listofsolvingProducts[index0].purchaserID==id&&listofsolvingProducts[index0].status!=="cancelled"&&listofsolvingProducts[index0].status!=="done"){
    return(
      <Pressable onPress={onpressItem}>
        <View style={{
        flexDirection:"row",
        margin:10,
        borderWidth:1,
        borderColor:"#d1d1d1",
        backgroundColor:"#fff",
        height:150,
        flex:1
        }}>
          <View style={{flex:3}}>
            <View style={{flex:5,padding:10}}>
              <Text style={{fontSize:25,color:"blue"}}>{products[index1].productname} <Text style={{fontSize:15,color:"black"}}>x{listofsolvingProducts[index0].quantity}</Text></Text>
            </View>
            <View style={{flex:1,paddingLeft:5,flexDirection:"row-reverse"}}>
              <Text>Status: {listofsolvingProducts[index0].status}</Text>
            </View>
            <View style={{flex:1,paddingRight:5,flexDirection:"row-reverse"}}>
              <Text>order date: {listofsolvingProducts[index0].date}</Text>
            </View>
          </View>
          <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <AntDesign name='right' size={30}/>
          </View>
        </View>
      </Pressable>
    )
  }
  
}
const ProductItem1=({item})=>{

  const navigation=useNavigation()
  const solvingProducts=useSelector(state=>state.ReducerUserInfo.solvingProducts)
  const listofsolvingProducts=useSelector(state=>state.ReducerListofSolvingProducts.solvingProducts)
  const products=useSelector(state=>state.ReducerListofProducts.products);
  const id=useSelector(state=>state.ReducerUserInfo.id)
  const boughtProductsHistory=useSelector(state=>state.ReducerUserInfo.boughtProductsHistory)
  const username = useSelector(state => state.ReducerUserInfo.name);
  const index0=listofsolvingProducts.findIndex(object => {
    return object.id === item;
  });
  const index1=products.findIndex(object => {
    
    return object.id === listofsolvingProducts[index0].productid;
  }
  );
  
  const onpressItem=()=>{
    navigation.navigate("ProductInfo",{id:listofsolvingProducts[index0].productid})
  }
  if(listofsolvingProducts[index0].purchaserID==id&&listofsolvingProducts[index0].status=="cancelled"){
    return(
      <Pressable onPress={onpressItem}>
        <View style={{
        flexDirection:"row",
        margin:10,
        borderWidth:1,
        borderColor:"#d1d1d1",
        backgroundColor:"#fff",
        height:150,
        flex:1
        }}>
          <View style={{flex:3}}>
            <View style={{flex:5,padding:10}}>
              <Text style={{fontSize:25,color:"blue"}}>{products[index1].productname} <Text style={{fontSize:20,color:"black"}}>x{listofsolvingProducts[index0].quantity}</Text></Text>
            </View>
            <View style={{flex:1,paddingLeft:5,flexDirection:"row-reverse"}}>
              <Text>Status: <Text style={{fontWeight:"bold",color:"red"}}>{listofsolvingProducts[index0].status}</Text></Text>
            </View>
            <View style={{flex:1,paddingRight:5,flexDirection:"row-reverse"}}>
              <Text>order date: {listofsolvingProducts[index0].date}</Text>
            </View>
          </View>
          <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <AntDesign name='right' size={30}/>
          </View>
        </View>
      </Pressable>
    )
  }
  
  
}


const ProductItem2=({item})=>{
  
  const [isVisible,setIsvisible]=useState(false)
  const [yourRating,setyourRating]=useState(3)
  const [yourComment,setyourComment]=useState("")
  const [senddingFeedback,setsenddingFeedback]=useState(false)
  const navigation=useNavigation()
  const solvingProducts=useSelector(state=>state.ReducerUserInfo.solvingProducts)
  const listofsolvingProducts=useSelector(state=>state.ReducerListofSolvingProducts.solvingProducts)
  const products=useSelector(state=>state.ReducerListofProducts.products);
  const id=useSelector(state=>state.ReducerUserInfo.id)
  const boughtProductsHistory=useSelector(state=>state.ReducerUserInfo.boughtProductsHistory)
  const username = useSelector(state => state.ReducerUserInfo.name);

console.log("here",item.solvingID)
  const index0=listofsolvingProducts.findIndex(object => {
    return object.id === item.solvingID;
  });

  const index1=products.findIndex(object => {
    return object.id === listofsolvingProducts[index0].productid;
  }
  );
  const postfeedback=async()=>{
    setsenddingFeedback(true)
    await firestore().collection("Products").doc(listofsolvingProducts[index0].productid).update({
      feedbacks:firestore.FieldValue.arrayUnion({name:username,rating:yourRating,comment:yourComment})
    }).then(async()=>{
      await firestore().collection("Users").doc(id).update({
        boughtProductsHistory:firestore.FieldValue.arrayUnion({solvingID:item.solvingID,already_giveFeedback:
          true,receiveddate:item.receiveddate
        })
      })
    }).then(async()=>{
      await firestore().collection("Users").doc(id).update({
        boughtProductsHistory:firestore.FieldValue.arrayRemove(item)
      })
    }).then(()=>{
      setsenddingFeedback(false)
      Alert.alert("Thanks for your feedback")
    })
  }

  const onpressItem=()=>{

    setIsvisible(true)
  }
  if(senddingFeedback){
    <View style={{margin:10,borderWidth:1,borderRadius:5,alignItems:"center",justifyContent:"center"}}>
      <ActivityIndicator size={"large"}/>
    </View>
  }
  if(listofsolvingProducts[index0].purchaserID==id&&listofsolvingProducts[index0].status=="done"){
    return(
      <View style={{margin:10,borderWidth:1,borderRadius:5}}>
        <Pressable onPress={onpressItem}>
      
        <View style={{
        flexDirection:"row",
        borderWidth:1,
        borderColor:"#d1d1d1",
        backgroundColor:"#fff",
        height:150,
        flex:1
        }}>
          <View style={{flex:3}}>
            <View style={{flex:5,padding:10}}>
              <Text style={{fontSize:25,color:"blue"}}>{products[index1].productname} <Text style={{fontSize:20,color:"black"}}>x{listofsolvingProducts[index0].quantity}</Text></Text>
            </View>
            <View style={{flex:1,paddingRight:5,flexDirection:"row-reverse"}}>
              <Text>Received date: {item.receiveddate}</Text>
            </View>
          </View>
          <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
            <AntDesign name='checkcircle' size={30} color={"green"}/>
          </View>
        </View>
      </Pressable>

{ item.already_giveFeedback==false&&
    <View style={{
      borderWidth:1,
    }}>
      
      <View style={{width:"100%",backgroundColor:"gray",padding:10}}>
      <Stars
          default={3}
          count={5}
          starSize={25}
          update={(val)=>{

            setyourRating(val)

          }}
          emptyStar={
            <Icon
              name={'star-o'}
              color="#e47911"
              style={styles.star}
              size={25}
            />
          }
          halfStar={
            <Icon
              name={'star-half-full'}
              color="#e47911"
              style={styles.star}
              size={25}
            />
          }
          fullStar={
            <Icon
              name={'star'}
              color="#e47911"
              style={styles.star}
              size={25}
            />
          }
        />
      </View>
      <View>
        <TextInput 
        multiline={true}
        value={yourComment}
        onChangeText={setyourComment}
        />
      </View>
      <View>
        <Button onPress={postfeedback}>Post</Button>
      </View>
    </View>
  }
      </View>
      
    )
  }
  
}

const BoughtProductsProcessScreen = () => {


  
  const navigation=useNavigation()
  const solvingProducts=useSelector(state=>state.ReducerUserInfo.solvingProducts)
  const listofsolvingProducts=useSelector(state=>state.ReducerListofSolvingProducts.solvingProducts)
  const products=useSelector(state=>state.ReducerListofProducts.products);
  const id=useSelector(state=>state.ReducerUserInfo.id)
  const boughtProductsHistory=useSelector(state=>state.ReducerUserInfo.boughtProductsHistory)
  const username = useSelector(state => state.ReducerUserInfo.name);



  
  
  
  
  
  
  
  
  
  const OrderingScreen=()=>{
    return(
      <View >
        <FlatList
        data={solvingProducts}
        renderItem={({item})=>{
          
          return(<ProductItem item={item} />)
          
        }
        }
        />
        
      </View>
    )
  }
  const Cancelledproducts=()=>{
    return(
      <View >
        <FlatList
        data={solvingProducts}
        renderItem={({item})=>{
          
          return(<ProductItem1 item={item} />)
          
        }
        }
        />
      </View>
    )
  }
  const History=()=>{
    
    return(
      <View>
        <FlatList
        data={boughtProductsHistory}
        renderItem={({item})=>{
          
          return(<ProductItem2 item={item} />)
          
        }
        }
        />
      </View>
    )
  }



  
  return (
    <View style={{width:"100%",height:"100%"}}>
      
      <Tab.Navigator>
        <Tab.Screen component={OrderingScreen} name="ordering" options={{title:"Orders"}}/>
        <Tab.Screen component={Cancelledproducts} name="cancelled" options={{title:"Cancelled products"}}/>
        <Tab.Screen component={History} name="history" options={{title:"History"}}/>
      </Tab.Navigator>
    </View>
    
  )
}


const styles=StyleSheet.create({
  root:{padding:10,backgroundColor:"white"},
  title:{fontSize:20,color:"black"},
  price:{fontSize:18,fontWeight:"bold",color:"red"},
  oldPrice:{fontSize:12,fontWeight:"normal",textDecorationLine:"line-through",color:"black"},
  descriptionTitle:{fontWeight:"bold",marginTop:10},
  description:{padding:5,borderLeftWidth:1,borderRightWidth:1,marginTop:10},
  avatarseller:{flexDirection:"row",flex:1,marginTop:10},
  favoriteIcon:{flex:1,margin:15}
})




export default BoughtProductsProcessScreen