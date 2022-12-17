import { View, Text, Alert,ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
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






  const [fullname,setFullname]=useState("")
  const [phone,setPhone]=useState("")
  const [address,setAddress]=useState("")
  const [building,setBuilding]=useState("")
  const [chosenCity,setChosenCity]=useState(cities[0].city)
  const [addresserr,setAddresserr]=useState('')
  console.log(chosenCity)



  const onUseAddress=async()=>{

    console.log("List is: ",list)
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
    await list.forEach(async (element,index) => {
      const index0 = products.findIndex(object => {
        return object.id === element.id;
      });
      const product=products[index0]

      const docadded=await firestore().collection("SolvingProducts").add({
        ...element,address:address+", "+building+", "+chosenCity,fullname:fullname,phone:phone,sellerID:product.sellerID,purchaserID:userid,status:"ordering"
      })
      await firestore().collection("Users").doc(product.sellerID).update({
        solvingProducts:firestore.FieldValue.arrayUnion(docadded.id)
      })
      await firestore().collection("Users").doc(userid).update({
        solvingProducts:firestore.FieldValue.arrayUnion(docadded.id),
        shoppingCart:firestore.FieldValue.arrayRemove(element)
      })
      console.log(index)

    })
    
      navigation.navigate("SuccessfulOrder");
    


    
  }
  const onChangeAddressText=(t)=>{
    setAddress(t); 
    setAddresserr('')
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