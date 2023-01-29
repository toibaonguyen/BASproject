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
import {setuserid, setisloading, setrole} from '../../redux/store/action';

import auth from '@react-native-firebase/auth';
const SignInScreen = () => {
  const navigation = useNavigation();
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const {height} = useWindowDimensions();
  const dispatch = useDispatch();

  const onSignInPressed = async () => {
    //we have just tested here

    if (username.length == 0 || password.length == 0) {
      Alert.alert('Error!', "Email and password inputs can't be blank", [
        {text: 'OK'},
      ]);
      return;
    }
    //dispatch(setisloading(true))
    await auth()
      .signInWithEmailAndPassword(username, password)
      .then(() => {
        console.warn('perfect');
      })
      .catch(error => {
        console.warn(error);
        if (error.code === 'auth/invalid-email') {
          Alert.alert('Error!', 'Wrong input!', [{text: 'OK'}]);
        } else {
          Alert.alert(
            'Error!',
            'The email address or password is incorrect. Please try again!',
            [{text: 'OK'}],
          );
        }
      });
    //dispatch(setisloading(false))
  };

  const onForgetPasswordPressed = () => {
    navigation.navigate('ResetPassword');
  };

  const onDontHaveAccount = () => {
    navigation.navigate('SignUp');
  };

  return (
    <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          style={(styles.logo, {height: height * 0.3})}
          source={Logo}
          resizeMode="contain"
        />
        <CustomInput
          placeholder="Email"
          value={username}
          setvalue={setusername}
        />
        <CustomInput
          placeholder="Password"
          value={password}
          setvalue={setpassword}
          secureTextEntry={true}
        />
        <CustomButton text="Sign in" onPress={onSignInPressed} />
        <CustomButton
          text="Forgot password?"
          onPress={onForgetPasswordPressed}
          type="TERTIARY"
        />
        <CustomButton
          text="Don't have an account yet? Sign Up"
          onPress={onDontHaveAccount}
          type="TERTIARY"
        />
        <CustomButton
          text="This is not your role? Choose another!"
          onPress={() => {
            dispatch(setrole(null));
          }}
          type="TERTIARY"
          fgColor="#000"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  logo: {width: '70%', height: '30%', maxHeight: 300, maxWidth: 200},
  root: {padding: 20, alignItems: 'center', flex: 1},
});
export default SignInScreen;
