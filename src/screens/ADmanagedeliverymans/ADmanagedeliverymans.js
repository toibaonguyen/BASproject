import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Alert,
  Pressable,
} from 'react-native';
import React from 'react';
import {useState} from 'react';
import {ActivityIndicator, FAB, Avatar, Searchbar} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const DMItem = ({item}) => {
  const navigation = useNavigation();

  const [isloading, setIsloading] = useState(false);
  const onLongPressItem = async () => {
    Alert.alert(
      'Are you sure?',
      'Do you want to remove this user from system?',
      [
        {
          text: 'No',
        },
        {
          text: 'Yes',
          style: 'destructive',
          onPress: async () => {
            setIsloading(true);
            await firestore()
              .collection('Deliverymans')
              .doc(item.id)
              .delete()
              .catch(() => {
                setIsloading(false);
              });
          },
        },
      ],
    );
  };

  const baseavatar = useSelector(state => state.ReducerUserInfo.baseavatar);

  if (isloading) {
    return (
      <View
        style={{
          height: 200,
          margin: 10,
          borderWidth: 1,
          borderRadius: 5,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View
      style={{
        margin: 10,
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#fff',
      }}>
      <Pressable
        style={{height: 200, flexDirection: 'row'}}
        onLongPress={onLongPressItem}
        >
        <View
          style={{
            width: 150,
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000',
          }}>
          <Avatar.Image
            source={{uri: item.avatar ? item.avatar : baseavatar}}
          />
        </View>
        <View style={{height: 150, padding: 10, flexGrow: 1, width: 0}}>
          <Text style={{fontWeight: 'bold'}}>{item.id}</Text>
          <Text>Fullname: {item.fullname}</Text>
          <Text>City: {item.city}</Text>
          <Text>Address: {item.address}</Text>
          <Text>Phone number: {item.phone}</Text>
          <Text>Birthday: {item.birthday}</Text>
        </View>
      </Pressable>
    </View>
  );
};

const ADmanagedeliverymans = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isloading, setIsloading] = useState(true);
  const [deliverymans, setdeliverymans] = useState([]);
  const [searchtext, setSearchtext] = useState('');

  const navigation = useNavigation();
  useEffect(() => {
    const subscriber = firestore()
      .collection('Deliverymans')
      .onSnapshot(query => {
        const listofuser = [];
        query.forEach(i => {
          listofuser.push({...i.data(), id: i.id});
        });
        setdeliverymans(listofuser);
      });

    setIsloading(false);
    return () => subscriber();
  }, []);

  if (isloading) {
    return (
      <View
        style={{
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <SafeAreaView style={{height: '100%', width: '100%'}}>
      <Searchbar
        placeholder="Search with cccd"
        style={{margin: 10}}
        value={searchtext}
        onChangeText={setSearchtext}
      />

      <FlatList
        showsVerticalScrollIndicator={false}
        onScroll={() => {
          setIsScrolling(true);
        }}
        onScrollEndDrag={() => {
          setIsScrolling(false);
        }}
        data={deliverymans}
        renderItem={({item}) => {
          if (searchtext == '') {
            return <DMItem item={item} />;
          }
          if (item.id.toUpperCase().includes(searchtext.toUpperCase())) {
            return <DMItem item={item} />;
          }
        }}
      />
      <SafeAreaView style={{flexGrow: 1}}>
        <FAB
          visible={!isScrolling}
          icon="plus"
          onPress={() => {
            navigation.navigate('createDM');
          }}
          style={{right: 0, margin: 16, bottom: 0, position: 'absolute'}}
        />
      </SafeAreaView>
    </SafeAreaView>
  );
};

export default ADmanagedeliverymans;
