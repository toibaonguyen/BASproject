import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Logo from './../../../assets/images/Logo.png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setuserid, setisloading, setDMid} from '../../redux/store/action';
import auth from '@react-native-firebase/auth';
import firestore from "@react-native-firebase/firestore"
import {Button,ActivityIndicator} from 'react-native-paper';





const DMSignInScreen = () => {

  const navigation = useNavigation();
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [issigning,setIssigning]=useState(false);



  const {height} = useWindowDimensions();
  const dispatch = useDispatch();

  const onSignInPressed = async () => {
    setIssigning(true)

    if(!username||!password){
      Alert.alert("Error","Please filling input fully!")
      setIssigning(false)
      return
    }
    
    await firestore().collection("Deliverymans").doc(username).get().then(query=>{
      if(query.data().password){
        dispatch(setDMid(query.id))
        
        navigation.navigate("MainApp")
      }
    })
    .catch(e=>{
      Alert.alert("Error","There are some mistakes here, please try again!")
    })

    setIssigning(false)
  };

  return (
    <ScrollView style={{flex: 1,backgroundColor:"#00D091"}} showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          style={(styles.logo, {height: height * 0.3})}
          source={Logo}
          resizeMode="contain"
        />
        <Text style={{color:"#fff",fontWeight:"bold",marginBottom:10}}>DELIVERYMAN</Text>
        <CustomInput
          placeholder="CCCD"
          value={username}
          setvalue={setusername}
        />
        <CustomInput
          placeholder="Password"
          value={password}
          setvalue={setpassword}
          secureTextEntry={true}
        />
        <Button mode="contained-tonal" onPress={onSignInPressed} disabled={issigning}>
          Login
        </Button>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logo: {width: '70%', height: '30%', maxHeight: 300, maxWidth: 200},
  root: {padding: 20, alignItems: 'center', flex: 1},
});

export default DMSignInScreen;
