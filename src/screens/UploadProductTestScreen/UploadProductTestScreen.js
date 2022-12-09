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
  const [maxquantity,setmaxquantity]=useState(0);
  const [description,setDescription]=useState("");
  const [imageList,setImageList]=useState([]);
  const openCamera=async()=>{
        const options={
          storageOptions:{
            path:'images',
            mediaType:'photo',
          },
          includeBase64:true
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
          includeBase64:true
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
          includeBase64:true,
          selectionLimit:0
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
           // console.log("Images = ",images)
          }
        })
      };
    
    
    const postProduct=async ()=>{
      
      setImageList([]);

      const docRef =firestore().collection('Products').add({
        productname:name,
        maxQuantity:maxquantity,
        price:price,
        ratings:ratings,
        avgRating:avgrating,
        sellerID:id,
        description:description,
        images:[],
        status:"invalid",
      })

      const docadded = await docRef

      await storage().ref(`products/product/${docadded.id}/representativeImage/i0`).putFile(image.uri);

      const url = await storage().ref(`products/product/${docadded.id}/representativeImage/i0`).getDownloadURL();

      await firestore().collection('Products').doc(docadded.id).update({'image':url});
      //do something with image list here
      const promises =await images.map(async(file,index) => {
        const ref = storage().ref(`products/product/${docadded.id}/Images/i${index+1}`);
        const uri=file.uri;
        const response = await fetch(uri);
        const blob = await response.blob();
        

        return ref
          .put(blob)
          .then(() => ref.getDownloadURL())

      });
      
      await Promise.all(promises)
      .then(async (fileDownloadUrls) => {
          await firestore().collection('Products').doc(docadded.id).update(
            {
              images:fileDownloadUrls
            }
          )
          console.log("Upload list of images success!")
        
      }
      ).then(async ()=>{
        await firestore().collection('Users').doc(id).update({
          
        })
      })
      .catch(err => console.log("loi 0 la: ",err))
      .catch(err => console.log("loi 1 la: ",err));



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