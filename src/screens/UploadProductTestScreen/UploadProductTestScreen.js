import { View, Text,TextInput,Alert, Image, ScrollView, ActivityIndicator} from 'react-native'
import React,{useState} from 'react'
import firestore from "@react-native-firebase/firestore"
import storage from "@react-native-firebase/storage"
import CustomInput from '../../components/CustomInput'
import CustomButton from '../../components/CustomButton'
import {launchImageLibrary, launchCamera} from "react-native-image-picker"
import { useSelector } from 'react-redux'
import { setisloading } from '../../redux/store/action'





const UploadProductTestScreen = () => {


  const id=useSelector(state=>state.ReducerUserInfo.id)

  const [isloading,setIsloading]=useState(false)
  const [image,setImage]=useState({uri:null})
  const [images,setImages]=useState([])
  const [name,setName]=useState("");
  const [price,setPrice]=useState(0);
  const [avgrating,setAvgrating]=useState(0);
  const [ratings,setRatings]=useState(0);
  const [maxquantity,setmaxquantity]=useState(0)
  const [description,setDescription]=useState("")
  const [imageList,setImageList]=useState([])
  const openCamera=async()=>{
        const options={
          storageOptions:{
            path:'images',
            mediaType:'photo',
          },
        };
        await launchCamera(options,response=>{
          console.log('response = ',response);
          if(response.didCancel){
            console.log('User cancelled image picker');
          }
          else if(response.error){
            console.log('ImagePicker error',response.error)
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }
          else {
            const source={uri: response.assets[0].uri};
            console.log("Source = ",source)
            setImage(source)
            console.log("Image = ",image)
            //uploadImage()
          }
        })
        //setisVisible(false)
      };
    const openGallery=async() => {
        const options={
          storageOptions:{
            path:'images',
            mediaType:'photo',
          },
          //includeBase64:true
        };
        await launchImageLibrary(options, response=>{
          console.log('response = ', response);
          if(response.didCancel){
            console.log('User cancelled image picker');        
          }
          else if(response.error){
            console.log('ImagePicker error', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }
          else {
            const source={uri: response.assets[0].uri};
            console.log("Source = ",source)
            setImage(source)
            console.log("Image = ",image)
          }
        })
      };
      


      const openGalleryformultiplepickers=async() => {
        const options={
          storageOptions:{
            path:'images',
            mediaType:'photo',
          },
          //includeBase64:true,
          selectionLimit:8
        };
        await launchImageLibrary(options, response=>{
          console.log('response = ', response);
          if(response.didCancel){
            console.log('User cancelled image picker');        
          }
          else if(response.error){
            console.log('ImagePicker error', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }
          else {
            const list=[];
            response.assets.forEach(
              i=>{
                list.push(i);
              }
            )
           
            console.log("Source images = ",list)
            setImages(list)
            console.log("Images = ",images)
          }
        })
      };
      /*
    const uploadImage = async()=>{
        const uri= image.uri;
        const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
        const task = storage().ref(`avatar/${id}/avatar`).putFile(image);
        
        try {
        await task;
        } 
        catch(e) {
         console.error(e);
        }
        Alert.alert(
         'Avatar changed successfully!',
         'Your avatar has been changed'
        );
        setImage({uri:""});
        setisVisible(false);
        const url=await storage().ref(`avatar/${id}/avatar`).getDownloadURL()
        await firestore().collection('Users').doc(id).update({'avatar':url})
    }*/


    const postProduct=async ()=>{
      
      setImageList([]);

        const uploadImage = async (photo,id,index) => {

        const uri = photo.uri;

        const childPath = `products/product/${id}/Images/i${index}`;

        console.log(childPath);

        const response = await fetch(uri);

        const blob = await response.blob();
    
        const snapshot = await storage().ref(childPath).put(blob);
        const downloadURL = await storage().ref(childPath).getDownloadURL();
        console.log(downloadURL);
        console.log("List is: ",imageList)
        await setImageList([...imageList,downloadURL])
        return 1
      };

      const docRef =firestore().collection('Products').add({
        productname:name,
        maxQuantity:maxquantity,
        price:price,
        ratings:ratings,
        avgRating:avgrating,
        sellerID:id,
        description:description
      })

      const docadded = await docRef
      await storage().ref(`products/product/${docadded.id}/representativeImage/i0`).putFile(image.uri);
      const url = await storage().ref(`products/product/${docadded.id}/representativeImage/i0`).getDownloadURL();
      await firestore().collection('Products').doc(docadded.id).update({'image':url});
      
      await Promise.all(images.map(async(i,index)=>{await uploadImage(i,docadded.id,index+1)}));

      await firestore().collection('Products').doc(docadded.id).update({'imagessssssss':imageList});
    }

  if(isloading){

    return(
      <ActivityIndicator/>
    )
  }


  return (
    <ScrollView>
    <View style={{flex:1,alignItems:"center"}}>

      <Image source={{uri:image.uri}} style={{width:300,height:300}}/>
      
      <CustomButton text={"Open camera"} onPress={openCamera}/>
      <CustomButton text={"Open gallery"} onPress={openGallery}/>
      <CustomButton text={"Open gallery for multipickers"} onPress={openGalleryformultiplepickers}/>
      <Text style={{fontSize:30,color:"black"}}>Upload</Text>

      <CustomInput placeholder={"Name"} value={name} setvalue={setName}/>
      <CustomInput placeholder={"Average rating"} keyboardType={"decimal-pad"} value={avgrating} setvalue={setAvgrating}/>
      <CustomInput placeholder={"Price"} keyboardType={"number-pad"} value={price} setvalue={setPrice}/>
      <CustomInput placeholder={"Ratings"} keyboardType={"number-pad"} value={ratings} setvalue={setRatings}/>
      <CustomInput placeholder={"Max quantity"} keyboardType={"number-pad"} value={maxquantity} setvalue={setmaxquantity}/>
      <View>
        <TextInput placeholder='Description' multiline value={description} onChangeText={setDescription}/>
      </View>
      


      <CustomButton text={"Post"} onPress={postProduct} />
    </View>
    </ScrollView>
  )
}

export default UploadProductTestScreen