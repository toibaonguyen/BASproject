import { View, ScrollView,TouchableOpacity, StyleSheet,Dimensions,ImageBackground,Pressable,Image,Alert } from 'react-native'
import React, {useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux'
import firestore from '@react-native-firebase/firestore'
import { Caption,title,Avatar,TouchableRipple,Text, Button } from 'react-native-paper'
import CustomButton from '../../components/CustomButton'
import CustomBtnWithIcon from '../../components/CustomBtnWithIcon'
import auth from "@react-native-firebase/auth"
import UserInfoScreenBG from "../../../assets/images/UserInfoScreenBG.jpg"
import ImagePicker from "react-native-image-picker"
import * as Progress from "react-native-progress"
import storage from "@react-native-firebase/storage"
import {launchImageLibrary, launchCamera} from "react-native-image-picker"
import Modal from "react-native-modal";
import {setuseremail,setusername,setuserphone,setuserhintname,setuseravatar} from "../../redux/store/action"
import CustomInput from '../../components/CustomInput'







const width=Dimensions.get("window").width;
const height=Dimensions.get("window").height;

const UserInfoScreen = () => {


  const [image, setImage] = useState({uri:""});
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [isVisible, setisVisible] = useState(false);
  const [isVisible1,setisVisible1]=useState(false)


  const email=useSelector(state=>state.ReducerUserInfo.email)
  const id=useSelector(state=>state.ReducerUserInfo.id)
  const username=useSelector(state=>state.ReducerUserInfo.user)
  const fullname=useSelector(state=>state.ReducerUserInfo.name)
  const phone=useSelector(state=>state.ReducerUserInfo.phone)
  const avatar=useSelector(state=>state.ReducerUserInfo.avatar)
  

  const [username0,setusername0]=useState(username)
  const [fullname0,setfullname0]=useState(fullname)
  const [phone0,setphone0]=useState(phone)
  const dispatch=useDispatch()



  

 
  const onChangeInfo=async()=>{
    const checkphonevalidation=(p)=>{
      let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
      return vnf_regex.test(p)
    }
    if(username0==""||phone0==""||fullname0==""){
      Alert.alert("Error!","Please fill all inputs")
      return
    }
    if(checkphonevalidation(phone0)==false){
      Alert.alert("Error!","Your phone number input is invalid!")
      return 
    }
    if(username0.length<6||username0.length>30){
      Alert.alert("Error!","Your username: Must be between 6 and 30 characters long")
      return    
    }
    await firestore().collection('Users').doc(id).update({
      username:username0,
      fullname:fullname0,
      phonenumber:phone0,
    }).then(()=>{
      setisVisible1(false)
      Alert.alert("Message","Change successfully!");
    }).catch(()=>Alert.alert("Message","Change failed! Please try again"))
  }
  const EditProfile=()=>{
    console.log("clicked")
  }
  const onPressSignOut=()=>{
    auth().signOut().then(() => console.log('User signed out!'));
  }
  const onChangeAvatar=()=>{
    console.log("Avatar clicked")
  }
  const openCamera=async()=>{
    const options={
      storageOptions:{
        path:'images',
        mediaType:'photo',
      },
      //includeBase64:true
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
  }
  const openGallery=async()=>{
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
        //uploadImage()
      }
    })
    //setisVisible(false)
  }
  const uploadImage = async ()=>{
    const uri= image.uri;
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    setUploading(true);
    setTransferred(0);
    const task = storage().ref(`avatar/${id}/avatar`).putFile(uploadUri);
    task.on('state_changed', snapshot => {
      setTransferred(
        Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
      );
    });
    try {
    await task;
    } 
    catch(e) {
     console.error(e);
    }
    setUploading(false);
    Alert.alert(
     'Avatar changed successfully!',
     'Your avatar has been changed'
    );
    setImage({uri:""});
    setisVisible(false);
    const url=await storage().ref(`avatar/${id}/avatar`).getDownloadURL()
    dispatch(setuseravatar(url))
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={{flex:1,alignItems:"center"}}>
        <Modal isVisible={isVisible} animationOutTiming={500}>
          {image.uri===""?
          (
          <View style={{backgroundColor:"white",alignItems:"center",borderRadius:10,borderWidth:2}}>
            <Button onPress={openCamera}>
              Take photo
            </Button>
            <Button onPress={openGallery}>
              Choose from library
            </Button>
            <Button onPress={()=>{setisVisible(false)}}>
              Cancel
            </Button>         
          </View>
          ):(
            <View style={{backgroundColor:"white",borderRadius:10,borderWidth:2}}>
              <Image source={{uri: image.uri}} style={{alignSelf:"center",width:300,height:300}}/>
              {uploading?
              (
                <View style={styles.progressBarContainer}>
                  <Progress.Bar progress={transferred} width={300} />
                </View>
              )
              :
              (
              <View style={{flexDirection:"row-reverse",marginTop:10,marginLeft:30}}>
                <View>
                <Button mode="elevated" onPress={()=>{setImage({uri:""}); setisVisible(false)}}>
                  Cancel
                </Button>
                </View>
                <View style={{marginRight:10}}>
                <Button mode="elevated" onPress={uploadImage}>
                  Upload
                </Button>
                </View>
              </View>
              )
              }
            </View>

          )     
          }  
        </Modal>
        <Modal isVisible={isVisible1} animationOutTiming={500}>
          <View style={{backgroundColor:"white",alignItems:"center",borderRadius:10,borderWidth:2}}>
            <CustomInput placeholder="Username" value={username0} setvalue={setusername0}/>
            <CustomInput placeholder="Full name" value={fullname0} setvalue={setfullname0}/>
            <CustomInput placeholder="Phone number" value={phone0} setvalue={setphone0}/>
            <CustomButton text="Change" onPress={onChangeInfo}/>
            <CustomButton text="Cancel" onPress={()=>{setisVisible1(false)}}/>
          </View>
        </Modal>
        <View style={{width:width,flexDirection:"row",height:height*0.3,flex:1}}>
          <ImageBackground source={UserInfoScreenBG} resizeMode="cover" style={{flex: 1,justifyContent: "center"}}>
          <View style={{marginTop:10,marginLeft:10}}>
            <Pressable onPress={()=>{setisVisible(true)}}>
              <Avatar.Image source={{uri:avatar}}/>
            </Pressable>
          </View>
          <View style={{marginLeft:15,marginTop:15}}>
            <Text style={{fontWeight:"bold",fontSize:20,color:"#DDE5F0"}} >{username}</Text>
            <Text style={{color:"#DDE5F0"}}>{id}</Text>
          </View>
          </ImageBackground>
        </View>
        <View style={{width:width-40,borderRadius:15,borderWidth:2,marginTop:30,padding:15}}>
          <Text style={{fontWeight:"bold",fontSize:15,bottom:10}}>Details:</Text>
          <Text>Full name: {fullname}</Text>      
          <Text>Email: {email}</Text>
          <Text>Phone number: {phone}</Text>
        </View>
        <View style={{marginTop:10}}>
        <Button mode="elevated" onPress={()=>{setisVisible1(true)}} textColor="#3B71F3">
          Edit profile
        </Button>
        </View>
        <View style={{marginTop:15,width:width-40}}>
          <CustomBtnWithIcon text="My Favorites" iconname="heart" bgColor="white" fgColor="black" type='TERTIARY' />
          <CustomBtnWithIcon text="Payment" iconname="creditcard" bgColor="white" fgColor="black" type='TERTIARY' />
          <CustomBtnWithIcon text="Support" iconname="solution1" bgColor="white" fgColor="black" type='TERTIARY' />          
        </View>
        <View style={{flexDirection:"column-reverse",width:width-50}}>
          <CustomButton text="Sign Out" onPress={onPressSignOut} bgColor="#BFBFBF"/>
        </View>
     
      </View>
    </ScrollView>
  )
}
const styles=StyleSheet.create(
  {
    container:{
      flex:1,
      backgroundColor:"white"
    },
    progressBarContainer: {
      marginTop: 20,
      alignSelf:"center"
    },
  
  }
)

export default UserInfoScreen