import { View, Text, Alert,ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native'
import React, {useState} from 'react'
import styles from "./styles"
import { Picker } from '@react-native-picker/picker'
import cities from '../../../Data/cities'
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import firestore from '@react-native-firebase/firestore'
import { useSelector } from 'react-redux'




const AddressScreen = ({route,navigation}) => {


  const {list}=route.params
  const products=useSelector(state=>state.ReducerListofProducts.products);
  const userid=useSelector(state=>state.ReducerUserInfo.id);
  const shoppingCart=useSelector(state=>state.ReducerUserInfo.shoppingCart);


  const [isloading,setisloading]=useState(false)
  const [fullname,setFullname]=useState("")
  const [phone,setPhone]=useState("")
  const [address,setAddress]=useState("")
  const [building,setBuilding]=useState("")
  const [chosenCity,setChosenCity]=useState(cities[0].city)
  const [addresserr,setAddresserr]=useState('')



  const onUseAddress=async()=>{

    console.log("List is: ",list)



    setisloading(true)
    const checkphonevalidation=(p)=>{
      let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
      return vnf_regex.test(p)  
    }
    if(!fullname){
      Alert.alert("Please fill in the fullname field!")
      return
    }
    if(!checkphonevalidation(phone)){
      Alert.alert("Phone number is invalid!")
      return
    }
    if(!address){
      Alert.alert("Please fill in the address field!")
      return
    }

    //start from here
    
    for(let i=0;i<list.length;i++){
      const index0 = products.findIndex(object => {
        return object.id === list[i].productid;
      });
      const product=products[index0]

      if(Number(products[index0].maxQuantity)>=(Number(list[i].quantity)+Number(products[index0].tendtodecreaseQuantity))){
        const docadded=await firestore().collection("SolvingProducts").add({
          ...list[i],
          address:address+", "+building+", "+chosenCity,
          fullname:fullname,
          phone:phone,
          sellerID:product.sellerID,
          purchaserID:userid,
          status:"ordering",
          date: String(new Date)+" ",
          city:chosenCity
        })
        await firestore().collection("Users").doc(product.sellerID).update({
          solvingProducts:firestore.FieldValue.arrayUnion(docadded.id)
        })
        await firestore().collection("Users").doc(userid).update({
          solvingProducts:firestore.FieldValue.arrayUnion(docadded.id),
          shoppingCart:firestore.FieldValue.arrayRemove(list[i])
        })
      }
    }
    setisloading(false)

/*
    await list.forEach(async (element,index) => {
      const index0 = products.findIndex(object => {
        return object.id === element.productid;
      });
      const product=products[index0]
      console.log("num1 ",Number(product.maxQuantity))
      console.log("num2 ",Number(element.quantity))
      console.log("num3 ",Number(product.tendtodecreaseQuantity))

      if(Number(product.maxQuantity)>=(Number(element.quantity)+Number(product.tendtodecreaseQuantity))){

        const docadded=await firestore().collection("SolvingProducts").add({
          ...element,
          address:address+", "+building+", "+chosenCity,
          fullname:fullname,
          phone:phone,
          sellerID:product.sellerID,
          purchaserID:userid,
          status:"ordering",
          date: String(new Date)+" "
        })
        await firestore().collection("Users").doc(product.sellerID).update({
          solvingProducts:firestore.FieldValue.arrayUnion(docadded.id)
        })
        await firestore().collection("Users").doc(userid).update({
          solvingProducts:firestore.FieldValue.arrayUnion(docadded.id),
          shoppingCart:firestore.FieldValue.arrayRemove(element)
        }).then(async()=>{
          await firestore().collection("Products").doc(product.id).update({
          tendtodecreaseQuantity: firestore.FieldValue.increment(Number(element.quantity))
        })
        })
      }
    })
    */
    
    navigation.navigate("SuccessfulOrder");
    


    
  }
  const onChangeAddressText=(t)=>{
    setAddress(t); 
    setAddresserr('')
  }
  if(isloading){
    return(
      <View style={{height:"100%",width:"100%"}}>
        <ActivityIndicator/>
      </View>
    )
  }
  return (
    <KeyboardAvoidingView
    behavior={Platform.OS==='ios'?"padding":"height"}
    keyboardVerticalOffset={Platform.OS==='ios'?10:0}
    >
      <ScrollView style={styles.root}>
      <View style={styles.row}>
        <Picker
        selectedValue={chosenCity}
        onValueChange={setChosenCity}
        >
          {
            cities.map((i)=>(<Picker.Item key={i.area} value={i.city} label={i.city}/>))
          }
        </Picker>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Full name (First and last name)</Text>
        <CustomInput placeholder="Full name" value={fullname} setvalue={setFullname}/>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Phone number</Text>
        <CustomInput placeholder="Phone number" keyboardType="phone-pad" value={phone} setvalue={setPhone}/>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Address</Text>
        <CustomInput onEndEditing={()=>{if(!address){
          setAddresserr("Invalid address")
        }
        
        }} placeholder="Street Address or P.O.BOX" value={address} setvalue={onChangeAddressText}/>
        {
          addresserr&&<Text style={{color:"red"}}>{addresserr}</Text>
        }
        <CustomInput placeholder="Apt, Suite, Unit, Building (optional)" value={building} setvalue={setBuilding}/>
      </View>
      <CustomButton text="Use this address" onPress={onUseAddress}/>
    </ScrollView>
    </KeyboardAvoidingView>
    
  )
}

export default AddressScreen