import { View, Text,Image, FlatList, TextInput, Alert, ActivityIndicator } from 'react-native'
import React,{useState} from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import {launchImageLibrary, launchCamera} from "react-native-image-picker"
import { Button } from 'react-native-paper'
import Modal from "react-native-modal"
import CustomInput from '../../components/CustomInput'
import { useNavigation } from '@react-navigation/native'
import { setisloading } from '../../redux/store/action'
import firestore from "@react-native-firebase/firestore"
import storage from "@react-native-firebase/storage"
import { Picker } from '@react-native-picker/picker'
import categories from '../../../Data/categories'





const PostProductScreen = () => {


  const id=useSelector(state=>state.ReducerUserInfo.id);
  const [isloading,setIsloading]=useState(false);
  const [image,setImage]=useState({uri:null});
  const [images,setImages]=useState([]);
  const [name,setName]=useState("");
  const [price,setPrice]=useState(0);
  const [maxquantity,setmaxquantity]=useState(0);
  const [description,setDescription]=useState("");
  const [imageList,setImageList]=useState([]);
  const [isVisible,setIsvisible]=useState(false)
  const [chosenCategory,setChosenCategory]=useState(categories[0].name)
  const navigation=useNavigation()

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
        console.log("Source = ",source);
        setImage(source);
        console.log("Image = ",image);
        setIsvisible(false);
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
        setIsvisible(false)
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
        setIsvisible(false)
      }
    })
  };


  const postProduct=async ()=>{
    
      
    setImageList([]);

    if(name.length==0||price==0||maxquantity==0||image.uri==null||images.length==0){
        Alert.alert("Error!","Please fill in the blank fully")
        return
    }

    await setIsloading(true)
    
    const docRef =firestore().collection('Products').add({
      productname:name,
      maxQuantity:maxquantity,
      price:price,
      oldprice:0,
      sellerID:id,
      description:description,
      images:[],
      status:"pending",
      uploaddate:new Date().toLocaleString(),
      tendtodecreaseQuantity:0,
      category:chosenCategory,
      feedbacks:[]
    })

    const docadded = await docRef

    await storage().ref(`products/product/${docadded.id}/representativeImage/i0`).putFile(image.uri);

    const url = await storage().ref(`products/product/${docadded.id}/representativeImage/i0`).getDownloadURL();

    await firestore().collection('Products').doc(docadded.id).update({'thumbnail':url});
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
      
    }
    )
    .then(async ()=>{
      await firestore().collection('Users').doc(id).update({
        products: firestore.FieldValue.arrayUnion(docadded.id)
      })
    })
    .catch((e)=>{
        Alert.alert("Error",e)
        setIsloading(false)
    })
    .then(()=>{
        //navigation.navigate("PrimaryUI",{screen:"home"})
        
        navigation.navigate("SuccessfulPost")
    })
  }
  if(isloading==true){
    return(
        <View style={{height:"100%",width:"100%",alignItems:"center",justifyContent:"center"}}>
            <ActivityIndicator size="large"/>
        </View>
    )
  }
  else{
    return (
      <View style={{height:"100%",width:"100%"}}>
          <Modal isVisible={isVisible}>
              <View style={{width:"60%",paddingTop:15,alignItems:"center",backgroundColor:"#FFF",borderRadius:15,alignSelf:"center"}}>
                  <Text style={{alignSelf:"center"}}>Where do you want to get it?</Text>
                  <Button onPress={openCamera}>Take a photo now</Button>
                  <Button onPress={openGallery}>Get from my gallery</Button>
                  <Button onPress={()=>{setIsvisible(false)}}>Cancel</Button>
              </View>
          </Modal>
          <ScrollView>
              <View style={{borderWidth:1,marginTop:20,backgroundColor:"#fff",width:200,height:200,alignSelf:"center",marginBottom:5}}>
                  <Image style={{alignSelf:"center",width:200,height:200}} source={{uri:image.uri}}/>
              </View>
              <Button onPress={()=>{setIsvisible(true)}}>Choose representative image</Button>
              <View style={{borderWidth:1,marginTop:10,backgroundColor:"#fff",height:60,marginHorizontal:10,justifyContent:"center",alignItems:"center",marginBottom:5}}>
                  <FlatList horizontal={true}
                  style={{marginTop:5}}
                  data={images}
                  renderItem={
                      ({item})=>(<Image style={{height:50,width:50}} source={{uri:item.uri}}/>)
                  }
                  />
              </View>
              <Button onPress={openGalleryformultiplepickers}>Choose other images</Button>
  
              <Text style={{marginLeft:15,marginTop:10}}>
                Category
              </Text>
              <Picker selectedValue={chosenCategory} onValueChange={setChosenCategory}>
                {
                  categories.map((i)=>(
                    <Picker.Item 
                    key={i.id}
                    value={i.name}
                    label={i.name}
                    />
                  ))
                }
              </Picker>
              <View style={{marginTop:15,paddingHorizontal:10}}>
                <CustomInput placeholder={"Name"} value={name} setvalue={setName}/>
                <CustomInput placeholder={"Price (VNĐ)"} keyboardType={"number-pad"} value={price} setvalue={setPrice}/>
                <CustomInput placeholder={"Max quantity"} keyboardType={"number-pad"} value={maxquantity} setvalue={setmaxquantity}/>
              </View>
              <Text style={{marginLeft:15,marginTop:10}}>Description:</Text>
              <View
               style={{
               backgroundColor: "#fff",
               marginTop:15,
               marginHorizontal:10,
               marginBottom:10,
               borderLeftWidth:1,
               borderRightWidth:1
              }}>
                <TextInput multiline style={{padding:10}} value={description} onChangeText={setDescription} editable={true}/>
              </View>
              <View style={{marginTop:10,marginBottom:10,alignItems:"center"}}>
                  <Button mode="contained" onPress={postProduct}>Submit</Button>
              </View>
              
          </ScrollView>
      </View>
    )
  }



  
}

export default PostProductScreen