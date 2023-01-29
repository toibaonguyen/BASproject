import {
  View,
  Text,
  ActivityIndicator,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ConfirmEmail from '../screens/ConfirmEmail';
import NewPasswordScreen from '../screens/NewPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
//import HomeScreen from '../screens/HomeScreen'
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import MainAppScreen from '../screens/MainAppScreen';
import ProductsmanageScreen from '../screens/ProductsmanageScreen';
import ChosenRoleBG from '../../assets/images/ChosenRoleBG.jpg';
import ADSignInScreen from '../screens/ADSignInScreen';
import ADmainappScreen from '../screens/ADmainappScreen';
import ADmanageProductScreen from '../screens/ADmanageProductScreen';
import ProductScreenAD from '../screens/ProductScreenAD';
import ADmanageUsersScreen from '../screens/ADmanageUsersScreen';
import ADviewusersproducts from '../screens/ADviewusersproducts';
import ADmanagedeliverymans from '../screens/ADmanagedeliverymans';
import ADcreatenewDM from '../screens/ADcreatenewDM';
import ADmanageorders from '../screens/ADmanageorders';
import DMSignInScreen from '../screens/DMSignInScreen';
import DMmainapp from '../screens/DMmainapp';
import { setrole } from '../redux/store/action';
import ADmanageIncome from '../screens/ADmanageIncome';


const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignIn" component={SignInScreen}/>
      <Stack.Screen name="SignUp" component={SignUpScreen}/>
      <Stack.Screen name="ConfirmEmail" component={ConfirmEmail}/>
      <Stack.Screen name="NewPassword" component={NewPasswordScreen}/>
      <Stack.Screen name="ResetPassword" component={ResetPasswordScreen}/>
    </Stack.Navigator>
  );
};

const AdminMainApp=()=>{
  return(
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={ADSignInScreen} />
      <Stack.Screen name='MainApp' component={ADmainappScreen} />
      <Stack.Screen name='manageproduct' component={ADmanageProductScreen} />
      <Stack.Screen name='productScreen' component={ProductScreenAD}/>
      <Stack.Screen name='manageusers' component={ADmanageUsersScreen}/>
      <Stack.Screen name='usersproducts' component={ADviewusersproducts}/>
      <Stack.Screen name='managedeliveryman' component={ADmanagedeliverymans}/>
      <Stack.Screen name='createDM' component={ADcreatenewDM}/>
      <Stack.Screen name='manageorders' component={ADmanageorders} />
      <Stack.Screen name='manageincome' component={ADmanageIncome}/>
    </Stack.Navigator>
  )
}
const DMMainAppS=()=>{
  return(
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={DMSignInScreen} />
      <Stack.Screen name='MainApp' component={DMmainapp} />
    </Stack.Navigator>
  )
}

const ChosenRoleScreen = () => {

  const dispatch=useDispatch()
  const Item = ({role, onPress}) => {
    return (
      <TouchableOpacity onPress={onPress}>
        <Text style={{color: '#fff', margin: 10}}>{role}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <ImageBackground
      source={ChosenRoleBG}
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      resizeMode={'cover'}>
      <Text
        style={{
          fontSize: 40,
          color: 'black',
          marginBottom: 10,
          fontWeight: 'bold',
          textDecorationLine: 'underline',
        }}>
        Your role:
      </Text>
      
      <Item
        role={'a customer'}
        onPress={() => {
          dispatch(setrole(1));
        }}
      />
      <Item
        role={'an admin'}
        onPress={() => {
          dispatch(setrole(2));
        }}
      />
      <Item
        role={'a delivery man'}
        onPress={() => {
          dispatch(setrole(3));
        }}
      />
    </ImageBackground>
  );
};

const Navigation = () => {
  const id = useSelector(state => state.ReducerUserInfo.id);
  const isloading = useSelector(state => state.ReducerLogicFrontEnd.isLoading);
  const chosenRole=useSelector(state=>state.ReducerUserRole.role)

  /*
  Nếu chosenRole = 1, thì role là khách hàng
  Nếu chosenRole = 2, thì role là admin
  Nếu chosenRole = 3, thì role là delivery man
   */

  if (isloading) {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!chosenRole) {
    return <ChosenRoleScreen/>;
  } else if (chosenRole == 1) {
    if(!id){
      return(<AuthStack/>)
    }
    else{
      return(<MainAppScreen/>)
    }
  }
  else if (chosenRole == 2) {
    return (
      <AdminMainApp/>
    );
  } else if (chosenRole == 3) {
    return (<DMMainAppS/>);
  }
};

export default Navigation;
