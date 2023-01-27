
//



import {View, Text, SafeAreaView, FlatList, Pressable, Alert} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import {useState, useRef} from 'react';
import firestore from '@react-native-firebase/firestore';
import {Searchbar, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import Modal from 'react-native-modal';
import CustomButton from '../../components/CustomButton';

const OrderItem = ({item, onPress}) => {
  const navigation = useNavigation();

  if (item.status != 'ordering') {
    const longpress = () => {
      navigation.navigate('productScreen', {id: item.productid});
    };
    return (
      <Pressable onLongPress={longpress} onPress={onPress}>
        <View
          style={{
            height: 70,
            borderRadius: 5,
            borderWidth: 1,
            backgroundColor: '#fff',
            flexDirection: 'row',
          }}>
          <View
            style={{flex: 3, justifyContent: 'center', alignItems: 'center'}}>
            <Text>{item.id}</Text>
          </View>
          {item.status == 'confirmed' && (
            <View
              style={{
                backgroundColor: 'gray',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#fff'}}>{item.status}</Text>
            </View>
          )}
          {item.status == 'cancelled' && (
            <View
              style={{
                backgroundColor: 'red',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#fff'}}>{item.status}</Text>
            </View>
          )}
          {item.status == 'done' && (
            <View
              style={{
                backgroundColor: 'green',
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: '#fff'}}>{item.status}</Text>
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
  }
};

const OrderInfo = ({item}) => {

  const [dmID,setDmID]=useState("")
  const [st,setSt]=useState(item.status)



  const onChosethisdm = async() => {

   const DM= await firestore().collection("Deliverymans").doc(dmID).get();
    if(dmID&&DM.data()){
      await firestore().collection("SolvingProducts").doc(item.id).update({
        dmID:dmID
      }).then(async()=>{
        await firestore().collection("SolvingProducts").doc(item.id).update({
          status:"deliverying"
        }).then(()=>{
          setSt("deliverying")
        })
      })
      .catch(()=>{
        Alert.alert("Error","There are some mistakes here!")
      })
    }
    else{
      Alert.alert("Error","Please fill the ID of deliveryman")
    }
  };
  const onConfirm=async()=>{
    await firestore().collection("SolvingProducts").doc(item.id).update({
      status:"confirmed"
    }).then(()=>{
      setSt("confirmed")
      Alert.alert("Notice","You have just confirmed this order!")
    })
  }
  const onCancel=async()=>{
    await firestore().collection("SolvingProducts").doc(item.id).update({
      status:"cancelled"
    }).then(()=>{
      setSt("cancelled")
      Alert.alert("Notice","You have just cancelled this order!")
    })
  }
  return (
    <View style={{borderRadius: 5, backgroundColor: '#fff', padding: 15}}>
      <Text>Address: {item.address}</Text>
      <Text>City: {item.city}</Text>
      <Text>Order time: {item.date}</Text>
      <Text>Receiver: {item.fullname}</Text>
      {item.option && <Text>option: {item.option}</Text>}
      <Text>Receiver's phone number: {item.phone}</Text>
      <Text>Purchaser's UID: {item.purchaserID}</Text>
      <Text>Seller's UID: {item.sellerID}</Text>
      <View style={{marginTop: 10}}>
        {st == 'confirmed' && (
          <View>
            <TextInput value={dmID} onChangeText={setDmID}/>
            <CustomButton
              text={'Choose this delivery man'}
              bgColor={'#0097FF'}
              onPress={onChosethisdm}
            />
          </View>
        )}

        <Text
          style={{
            alignSelf: 'center',
            fontWeight: 'bold',
            textDecorationLine: 'underline',
          }}>
          Use these buttons in case of emergency!
        </Text>
        <CustomButton text={'Confirm this order'} bgColor={'red'} onPress={onConfirm}/>
        <CustomButton text={'Cancel this order'} bgColor={'red'} onPress={onCancel}/>
      </View>
    </View>
  );
};

const ADmanageorders = () => {
  const [solvingProducts, setSolvingProducts] = useState([]);
  const [searchtext, setSearchtext] = useState('');
  const [orderitem0, setOrderitem0] = useState({});
  const [isvis, setisvis] = useState(false);

  useEffect(() => {
    const sub = firestore()
      .collection('SolvingProducts')
      .onSnapshot(query => {
        const li = [];
        query.forEach(it => {
          li.push({...it.data(), id: it.id});
        });
        setSolvingProducts(li);
      });
  }, []);

  return (
    <SafeAreaView style={{paddingHorizontal: 5}}>
      <Modal
        isVisible={isvis}
        useNativeDriverForBackdrop
        swipeDirection={['down']}
        onSwipeComplete={() => {
          setisvis(false);
        }}>
        <OrderInfo item={orderitem0} />
      </Modal>
      <Searchbar
        style={{marginVertical: 10}}
        value={searchtext}
        onChangeText={setSearchtext}
      />

      <FlatList
        data={solvingProducts}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          if (searchtext == '') {
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
          if (item.id.toUpperCase().includes(searchtext.toUpperCase())) {
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
        }}
      />
    </SafeAreaView>
  );
};

export default ADmanageorders;
