import {
  View,
  Text,
  Alert,
  ScrollView,
  Pressable,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import firestore, { firebase } from '@react-native-firebase/firestore';
import {setlistofsolvingProducts, setproducts} from '../../redux/store/action';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {Searchbar} from 'react-native-paper';
import {FlatList} from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import CustomButton from '../../components/CustomButton';

const Tab = createMaterialTopTabNavigator();

const OrderItem = ({item, onPress}) => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          height: 70,
          borderRadius: 5,
          borderWidth: 1,
          backgroundColor: '#fff',
          flexDirection: 'row',
        }}>
        <View style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
          <Text>{item.id}</Text>
        </View>

        {item.status == 'done' && (
          <View
            style={{
              backgroundColor: 'green',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff'}}>Done</Text>
          </View>
        )}
        {item.status == 'deliverying' && (
          <View
            style={{
              backgroundColor: '#0097FF',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#fff'}}>{item.status}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

const Needtodelivery = () => {
  const products = useSelector(state => state.ReducerListofProducts.products);
  const [searchtext, setsearchtext] = useState('');
  const listofsolvingProduct = useSelector(
    state => state.ReducerListofSolvingProducts.solvingProducts,
  );
  const DMid = useSelector(state => state.ReducerDM.DMid);
  const [orderitem0, setOrderitem0] = useState({});
  const [isvis, setisvis] = useState(false);
  const navigation=useNavigation()
  useEffect(()=>{navigation.addListener('beforeRemove', e => {
    e.preventDefault();
    Alert.alert('Sign out?', 'Are you sure?', [
      {text: "Don't leave", style: 'cancel', onPress: () => {}},
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => navigation.dispatch(e.data.action),
      },
    ]);
  });},[])

  //
  const OrderInfo = ({item}) => {
    let alreadyCreated=false
    const index1 = products.findIndex(object => {
      return object.id === item.productid;
    });

    const onDone = async () => {
      await firestore()
        .collection('SolvingProducts')
        .doc(item.id)
        .update({
          status: 'done',
        })
        .then(async () => {
          await firestore()
            .collection('Users')
            .doc(item.purchaserID)
            .update({
              boughtProductsHistory: firestore.FieldValue.arrayUnion({
                solvingID: item.id,
                receiveddate: String(new Date().toLocaleString()),
                already_giveFeedback: false,
              }),
              solvingProducts:firestore.FieldValue.arrayRemove(item.id)
            })
            .then(async () => {
              await firestore()
                .collection('Users')
                .doc(item.sellerID)
                .update({
                  soldProductsHistory: firestore.FieldValue.arrayUnion({
                    solvingID: item.id,
                    money: Number(products[index1].price) * 0.9,
                  }),
                  wallet: firestore.FieldValue.increment(
                    Number(Number(products[index1].price) * 0.9)
                  ),
                  solvingProducts:firestore.FieldValue.arrayRemove(item.id)
                }).then(async()=>{
                  let k=new Date().getFullYear()+"_"+Number(Number(new Date().getUTCMonth())+1)+"_"+new Date().getDate()
                  await firestore().collection("CompanyIncome").doc(k).get().then(async(ii)=>{
                    if(ii.data().income){
                      alreadyCreated=true
                    }
                  })
                  .catch(e=>{
                    alreadyCreated=false
                  })


                  if(alreadyCreated){
                    console.log("You got it")
                    await firestore().collection("CompanyIncome").doc(k).update({
                      income:firestore.FieldValue.increment(Number(products[index1].price) * 0.1)
                    })
                    
                  }
                  else{
                    await firestore().collection("CompanyIncome").doc(k).set({
                      income:Number(Number(products[index1].price) * 0.1)
                    })
                  }
                })
                setisvis(false);
            });
        });
    };
    return (
      <View style={{borderRadius: 5, backgroundColor: '#fff', padding: 15}}>
        <Text>Address: {item.address}</Text>
        <Text>City: {item.city}</Text>
        <Text>Order time: {item.date}</Text>
        <Text>Receiver: {item.fullname}</Text>
        {item.option && <Text>option: {item.option}</Text>}
        <Text>Receiver's phone number: {item.phone}</Text>
        <View style={{marginTop: 10}}>
          <CustomButton text={'Done'} bgColor={'green'} onPress={onDone} />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <Modal
        isVisible={isvis}
        useNativeDriverForBackdrop
        swipeDirection={['down']}
        onSwipeComplete={() => {
          setisvis(false);
        }}>
        <OrderInfo item={orderitem0} />
      </Modal>
      <Searchbar value={searchtext} onChangeText={setsearchtext} />
      <FlatList
        data={listofsolvingProduct}
        showsVerticalScrollIndicator={false}
        style={{marginTop: 10, padding: 10}}
        renderItem={({item}) => {
          if (item.dmID == DMid && item.status == 'deliverying') {
            if(searchtext==''){
              return (
                <OrderItem
                  item={item}
                  onPress={() => {
                    setOrderitem0(item);
                    setisvis(true);
                  }}
                />
              );
            }
            if(item.id.includes(searchtext)){
              return (
                <OrderItem
                  item={item}
                  onPress={() => {
                    setOrderitem0(item);
                    setisvis(true);
                  }}
                />
              );
            }
            
          }
        }}
      />
    </SafeAreaView>
  );
};

const History = () => {
  const products = useSelector(state => state.ReducerListofProducts.products);
  const [searchtext, setsearchtext] = useState('');
  const listofsolvingProduct = useSelector(
    state => state.ReducerListofSolvingProducts.solvingProducts,
  );
  const DMid = useSelector(state => state.ReducerDM.DMid);
  const [orderitem0, setOrderitem0] = useState({});
  const [isvis, setisvis] = useState(false);
  //
  const OrderInfo = ({item}) => {
    const index1 = products.findIndex(object => {
      return object.id === item.productid;
    });

    return (
      <View style={{borderRadius: 5, backgroundColor: '#fff', padding: 15}}>
        <Text>Address: {item.address}</Text>
        <Text>City: {item.city}</Text>
        <Text>Order time: {item.date}</Text>
        <Text>Receiver: {item.fullname}</Text>
        {item.option && <Text>option: {item.option}</Text>}
        <Text>Receiver's phone number: {item.phone}</Text>
        <View style={{marginTop: 10}}>
          <Text>
            Received date:{' '}
            <Text style={{color: 'green'}}>{item.receiveddate}</Text>
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <Modal
        isVisible={isvis}
        useNativeDriverForBackdrop
        swipeDirection={['down']}
        onSwipeComplete={() => {
          setisvis(false);
        }}>
        <OrderInfo item={orderitem0} />
      </Modal>
      <Searchbar value={searchtext} onChangeText={setsearchtext} />
      <FlatList
        data={listofsolvingProduct}
        showsVerticalScrollIndicator={false}
        style={{marginTop: 10, padding: 10}}
        renderItem={({item}) => {
          if (item.dmID == DMid&&item.status=="done") {
            if(searchtext==''){
              return (
                <OrderItem
                  item={item}
                  onPress={() => {
                    setOrderitem0(item);
                    setisvis(true);
                  }}
                />
              );
            }
            if(item.id.includes(searchtext)){
              return (
                <OrderItem
                  item={item}
                  onPress={() => {
                    setOrderitem0(item);
                    setisvis(true);
                  }}
                />
              );
            }
          }
        }}
      />
    </SafeAreaView>
  );
};

const DMmainapp = () => {
  const dispatch = useDispatch();
  const [isloading, setIsloading] = useState(true);
  const navigation = useNavigation();
  useEffect(() => {
    
    const subscriber = firestore()
      .collection('SolvingProducts')
      .onSnapshot(async querySnapshot => {
        const productslist = [];
        querySnapshot.forEach(documentSnapshot => {
          productslist.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });
        dispatch(setlistofsolvingProducts(productslist));
        setIsloading(false);
      });
    return () => subscriber();
  }, []);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Products')
      .onSnapshot(async querySnapshot => {
        const productslist = [];
        querySnapshot.forEach(documentSnapshot => {
          productslist.push({
            ...documentSnapshot.data(),
            id: documentSnapshot.id,
          });
        });
        dispatch(setproducts(productslist));
        setIsloading(false);
      });
    return () => subscriber();
  }, []);

  if (isloading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <Tab.Navigator>
      <Tab.Screen name="needtoship" component={Needtodelivery} />
      <Tab.Screen name="History" component={History} />
    </Tab.Navigator>
  );
};

export default DMmainapp;
