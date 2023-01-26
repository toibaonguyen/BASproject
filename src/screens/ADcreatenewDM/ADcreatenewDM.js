import {Picker} from '@react-native-picker/picker';
import {View, Text, SafeAreaView, ScrollView, Image, Alert} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {ActivityIndicator, Button} from 'react-native-paper';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import cities from '../../../Data/cities';
import {useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import CustomInput from '../../components/CustomInput';
import DatePicker from 'react-native-date-picker';
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'
import { useNavigation } from '@react-navigation/native';



const ADcreatenewDM = () => {



  const [image, setImage] = useState({uri: null});
  const [isVisible, setIsvisible] = useState(false);
  const [chosenCity, setchosenCity] = useState(cities[0].city);
  const [password,setPassword]=useState("");
  const [cccd, setcccd] = useState('');
  const [fullname, setFullname] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setphone] = useState('');
  const [date, setDate] = React.useState("");
  const [open, setOpen] = useState(false);
  const [isposting,setIsposting]=useState(false);
  


  const navigation=useNavigation()


  const postDM = async () => {

    setIsposting(true)
    if(image.uri==null||!cccd||!fullname||!address||!phone||!date||!password){
      Alert.alert("Notice!","Please fill form fully");
      return
    }

    await firestore().collection('Deliverymans').doc(cccd).set({
      avatar:"",
      fullname:fullname,
      address:address,
      phone:phone,
      birthday:date,
      city:chosenCity,
      password:password
    })
    .then(async()=>{
      await storage().ref(`DMavatar/${cccd}/avatar`).putFile(image.uri).then(async()=>{
        const url = await storage().ref(`DMavatar/${cccd}/avatar`).getDownloadURL();
        await firestore().collection('Deliverymans').doc(cccd).update({'avatar':url}).then(()=>{setIsposting(false)})
      })
    })
    .then(()=>{
        navigation.goBack()
    })

  }


  const openCamera = async () => {
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    await launchCamera(options, response => {
      console.log('response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker error', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.assets[0].uri};
        console.log('Source = ', source);
        setImage(source);
        console.log('Image = ', image);
        setIsvisible(false);
      }
    });
    //setisVisible(false)
  };
  const openGallery = async () => {
    const options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };
    await launchImageLibrary(options, response => {
      console.log('response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker error', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {uri: response.assets[0].uri};
        console.log('Source = ', source);
        setImage(source);
        console.log('Image = ', image);
        setIsvisible(false);
      }
    });
  };

  const onDismissSingle = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = React.useCallback(
    params => {
      setOpen(false);
      setDate(params.date);
    },
    [setOpen, setDate],
  );



  if(isposting){
    return(
    <View style={{width:"100%",height:"100%",justifyContent:"center",alignItems:"center"}}>
      <Text>Please do not go out of this screen</Text>
      <ActivityIndicator/>
    </View>
    )
  }

  return (
    <SafeAreaProvider>
        <Modal isVisible={isVisible}>
          <View
            style={{
              width: '60%',
              paddingTop: 15,
              alignItems: 'center',
              backgroundColor: '#FFF',
              borderRadius: 15,
              alignSelf: 'center',
            }}>
            <Text style={{alignSelf: 'center'}}>
              Where do you want to get it?
            </Text>
            <Button onPress={openCamera}>Take a photo now</Button>
            <Button onPress={openGallery}>Get from my gallery</Button>
            <Button
              onPress={() => {
                setIsvisible(false);
              }}>
              Cancel
            </Button>
          </View>
        </Modal>
          
        <DatePicker
        modal
        mode="date"
        
        open={open}
        date={new Date()}
        onConfirm={(date) => {
          setOpen(false)
          setDate(String(date.toLocaleDateString()))
        }}
        onCancel={() => {
          setOpen(false)
        }}
        />

        <ScrollView>
          <View
            style={{
              borderWidth: 1,
              marginTop: 20,
              backgroundColor: '#fff',
              width: 300,
              height: 400,
              alignSelf: 'center',
              marginBottom: 5,
            }}>
            <Image
              style={{alignSelf: 'center', width: 300, height: 400}}
              source={{uri: image.uri}}
            />
          </View>

          <Button
            onPress={() => {
              setIsvisible(true);
            }}>
            Choose Avatar
          </Button>
          <Text style={{marginLeft: 15, marginTop: 10}}>City:</Text>
          <Picker selectedValue={chosenCity} onValueChange={setchosenCity}>
            {cities.map(i => (
              <Picker.Item key={i.area} value={i.city} label={i.city} />
            ))}
          </Picker>

          <View style={{marginTop: 15, paddingHorizontal: 10}}>
            <CustomInput
              placeholder={'CMND/CCCD'}
              value={cccd}
              setvalue={setcccd}
            />
            <CustomInput
              placeholder={'Full name'}
              value={fullname}
              setvalue={setFullname}
            />
            <CustomInput
              placeholder={'Address'}
              value={address}
              setvalue={setAddress}
            />
            <CustomInput
              placeholder={'Phone number'}
              value={phone}
              setvalue={setphone}
            />
            <CustomInput
              placeholder={'Password'}
              value={password}
              setvalue={setPassword}
            />
            <View style={{flexDirection: 'row',alignItems:"center"}}>
              <Text>Date of birth: </Text>
              <Button
                onPress={() => {
                  setOpen(true);
                }}>
                {date ? date : 'Choose date'}
              </Button>
            </View>
          </View>

          <View style={{marginTop: 10, marginBottom: 10, alignItems: 'center'}}>
          {
            <Button mode="contained" onPress={postDM}>Submit</Button>
          }
          </View>
          
        </ScrollView>
    </SafeAreaProvider>
  );
};

export default ADcreatenewDM;
