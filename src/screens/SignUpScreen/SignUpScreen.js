import {
  View,
  Text,
  Image,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import Logo from './../../../assets/images/Logo.png';
import useravatar from './../../../assets/defaut_avatar/useravatar.jpg';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import {useNavigation} from '@react-navigation/native';
import auth, {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {setisloading} from '../../redux/store/action';
import storage from '@react-native-firebase/storage';

const SignUpScreen = () => {
  const navigation = useNavigation();
  const baseavatar = useSelector(state => state.ReducerUserInfo.baseavatar);

  const [username, setusername] = useState('');
  const [name, setname] = useState('');
  const [phone, setphone] = useState('');
  const [password, setpassword] = useState('');
  const [email, setemail] = useState('');
  const [passwordrepeat, setpasswordrepeat] = useState('');

  const {height} = useWindowDimensions();
  const dispatch = useDispatch();

  const checkphonevalidation = p => {
    let vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
    return vnf_regex.test(p);
  };

  //Chỗ này là đk tk
  const onRegisterPressed = async () => {
    //there are some code with this before navigating

    if (
      username == '' ||
      password == '' ||
      email == '' ||
      passwordrepeat == '' ||
      phone == '' ||
      name == ''
    ) {
      Alert.alert('Error!', 'Please fill all inputs');
      return;
    }

    if (checkphonevalidation(phone) == false) {
      Alert.alert('Error!', 'Your phone number input is invalid!');
      return;
    }

    if (username.length < 6 || username.length > 30) {
      Alert.alert(
        'Error!',
        'Your username: Must be between 6 and 30 characters long',
      );
      return;
    }

    if (password.length < 8 || password.length > 15) {
      Alert.alert('Error!', 'The password must be 8-15 characters in length');
      return;
    }

    if (password !== passwordrepeat) {
      Alert.alert('Error!', 'Password and confirm password not match');
      return;
    }
    dispatch(setisloading(true));

    //Start from here

    await auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async () => {
        await auth()
          .currentUser.sendEmailVerification()
          .then(() =>
            alert(
              'Vertification email sent, please check the email to complete the process',
            ),
          )
          .catch(e => {
            alert(e.message);
          })
          .then(() => {
            firestore().collection('Users').doc(auth().currentUser.uid).set({
              usertype: 'common',
              username: username,
              email: email,
              fullname: name,
              phonenumber: phone,
              avatar: baseavatar,
              favoriteProducts: [],
              products: [], //những mặt hàng đc đăng lên để bán
              solvingProducts: [], //những đơn hàng cần được xử lý
              boughtProductsHistory: [], //Lịch sử mua hàng
              soldProductsHistory: [], //Lịch sử bán hàng
              shoppingCart: [],
              wallet: 0,
            });
          })
          .catch(e => {
            alert(e.message);
          });
      })
      .catch(e => {
        alert(e.message);
      });
    dispatch(setisloading(false));

    //await baseavatar;

    // navigation.navigate('ConfirmEmail')
  };

  const onSignInFacebook = () => {
    console.warn('OnSignInFacebook');
  };
  const onSignInGoogle = () => {
    console.warn('OnSignInGoogle');
  };
  const onTermsAndPPPressed = () => {
    console.warn('onTermsAndPPPressed');
  };
  const onSignInPressed = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Text style={styles.title}>Create an account</Text>
        <CustomInput
          placeholder="Email"
          value={email}
          setvalue={setemail}
          keyboardType={'email-address'}
        />
        <CustomInput
          placeholder="Username"
          value={username}
          setvalue={setusername}
        />
        <CustomInput placeholder="Full name" value={name} setvalue={setname} />
        <CustomInput
          placeholder="Phone number"
          value={phone}
          setvalue={setphone}
          keyboardType={'phone-pad'}
        />
        <CustomInput
          placeholder="Password"
          value={password}
          setvalue={setpassword}
          secureTextEntry={true}
        />
        <CustomInput
          placeholder="Reapeat password"
          value={passwordrepeat}
          setvalue={setpasswordrepeat}
          secureTextEntry={true}
        />
        <CustomButton text="Register" onPress={onRegisterPressed} />
        <Text style={styles.text}>
          By registering, you confirm that you accept our{' '}
          <Text style={styles.link} onPress={onTermsAndPPPressed}>
            Terms of use and Privacy Policy
          </Text>
        </Text>
        <CustomButton
          text="Have account already? Sign in"
          onPress={onSignInPressed}
          type="TERTIARY"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logo: {width: '70%', height: '30%', maxHeight: 300, maxWidth: 200},
  root: {padding: 20, alignItems: 'center', flex: 1},
  title: {fontSize: 24, fontWeight: 'bold', color: '#051C63', margin: 10},
  text: {color: 'gray', marginVertical: 10},
  link: {color: '#FDB075'},
});
export default SignUpScreen;
