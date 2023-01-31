import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Pressable,
  Alert,
} from 'react-native';
import React from 'react';
import firestore from '@react-native-firebase/firestore';
import {useState} from 'react';
import {useEffect} from 'react';
import {Avatar, ActivityIndicator, Searchbar} from 'react-native-paper';
import CustomButton from '../../components/CustomButton';
import {useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';

const ADmanageUsersScreen = () => {
  const [users, setUsers] = useState([]);
  const [searchtext, setSearchtext] = useState('');
  const [solvingproducts, setSolvingProducts] = useState([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('Users')
      .onSnapshot(query => {
        const listofuser = [];
        query.forEach(i => {
          listofuser.push({...i.data(), id: i.id});
        });
        setUsers(listofuser);
      });
    return () => subscriber();
  }, []);

  //Custom component
  const UserItem = ({item}) => {
    const [onp, setOnp] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const onLongPressItem = () => {
      navigation.navigate('usersproducts', {userid: item.id});
    };
    const onpressauthentic = async () => {
      setLoading(true);
      await firestore()
        .collection('Users')
        .doc(item.id)
        .update({
          usertype: 'authentic',
        })
        .then(() => {
          setLoading(false);
        });
    };

    const onpresslicensed = async () => {
      setLoading(true);
      await firestore()
        .collection('Users')
        .doc(item.id)
        .update({
          usertype: 'licensed',
        })
        .then(() => {
          setLoading(false);
        });
    };

    const onpresscommon = async () => {
      setLoading(true);
      await firestore()
        .collection('Users')
        .doc(item.id)
        .update({
          usertype: 'common',
        })
        .then(() => {
          setLoading(false);
        });
    };

    return (
      <SafeAreaView
        style={{
          padding: 10,
          borderWidth: 1,
          borderRadius: 5,
          backgroundColor: '#fff',
          marginVertical: 10,
        }}>
        {loading ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              height: 150,
            }}>
            <ActivityIndicator />
          </View>
        ) : (
          <View>
            <Pressable
              onLongPress={onLongPressItem}
              onPress={() => {
                setOnp(!onp);
              }}>
              <View style={{height: 150, flexDirection: 'row'}}>
                <View
                  style={{
                    width: 150,
                    height: 150,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#000',
                  }}>
                  <Avatar.Image source={{uri: item.avatar}} />
                </View>
                <View
                  style={{
                    height: 150,
                    paddingHorizontal: 10,
                    width: 0,
                    flexGrow: 1,
                    flex: 1,
                  }}>
                  <Text style={{fontWeight: 'bold'}}>{item.email}</Text>
                  <Text style={{textDecorationLine: 'underline'}}>
                    UID:{' '}
                    <Text style={{textDecorationLine: 'none'}}>{item.id}</Text>
                  </Text>

                  <Text>{item.username}</Text>
                  <Text>
                    Type: {item.usertype == 'common' && <Text>common</Text>}
                    {item.usertype == 'authentic' && (
                      <Text style={{color: '#DFC800'}}>authentic</Text>
                    )}
                    {item.usertype == 'licensed' && (
                      <Text style={{color: '#007ED5'}}>licensed</Text>
                    )}
                  </Text>
                  <Text>Fullname: {item.fullname}</Text>
                  <Text>Fullname: {item.phonenumber}</Text>
                </View>
              </View>
            </Pressable>

            {onp == true && (
              <View style={{paddingHorizontal: 5}}>
                <CustomButton
                  text={'Authentic'}
                  bgColor={'#DFC800'}
                  onPress={onpressauthentic}
                />
                <CustomButton
                  text={'Licensed'}
                  bgColor={'#007ED5'}
                  onPress={onpresslicensed}
                />
                <CustomButton
                  text={'Common'}
                  bgColor={'#000'}
                  onPress={onpresscommon}
                />
              </View>
            )}
          </View>
        )}
      </SafeAreaView>
    );
  };
  return (
    <SafeAreaView style={{height: '100%', width: '100%'}}>
      <Searchbar
        placeholder="Search with email or id"
        style={{margin: 10}}
        value={searchtext}
        onChangeText={setSearchtext}
      />
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{padding: 10}}
        data={users}
        renderItem={({item}) => {
          if (searchtext == '') {
            return <UserItem item={item} />;
          }
          if (item.email.toUpperCase().includes(searchtext.toUpperCase())) {
            return <UserItem item={item} />;
          }
          if (item.id.toUpperCase().includes(searchtext.toUpperCase())) {
            return <UserItem item={item} />;
          }
        }}
      />
    </SafeAreaView>
  );
};

export default ADmanageUsersScreen;
