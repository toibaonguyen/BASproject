import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  TextInput,
  Pressable,
  Keyboard,
  ScrollView,
} from 'react-native';
import React from 'react';
import {Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import {Alert, TouchableOpacity} from 'react-native';
import ProductItem from '../../components/ProductItem';
//import products from '../../../Data/products'
import {useSelector, useDispatch} from 'react-redux';
import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {setproducts} from '../../redux/store/action';
import storage from '@react-native-firebase/storage';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import HomeProductItem from '../../components/HomeProductItem';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import producttopushwithadminright from '../../../Data/producttopushwithadminright';
import Logo from '../../../assets/images/Logo.png';

const SearchBar = ({clicked, searchPhrase, setSearchPhrase, setCLicked}) => {
  return (
    <View style={styles.searchBar__container}>
      <View
        style={
          clicked ? styles.searchBar__clicked : styles.searchBar__unclicked
        }>
        {/* search Icon */}
        <Feather
          name="search"
          size={20}
          color="black"
          style={{marginLeft: 1}}
        />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          onFocus={() => {
            setCLicked(true);
          }}
        />
        {/* cross Icon, depending on whether the search bar is clicked or not */}
        {clicked && (
          <Entypo
            name="cross"
            size={20}
            color="black"
            style={{padding: 1}}
            onPress={() => {
              setSearchPhrase('');
            }}
          />
        )}
      </View>
      {/* cancel button, depending on whether the search bar is clicked or not */}
      {clicked && (
        <View style={{marginLeft: 5}}>
          <TouchableOpacity
            onPress={() => {
              Keyboard.dismiss();
              setCLicked(false);
            }}>
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const HomeScreen = () => {
  const [loading, setLoading] = useState(true); // Set loading to true on component mount
  const [checkimageswitch, setCheckimageswitch] = useState(0);
  const [textsearch, setTextsearch] = useState('');
  const [isfocus, setisfocus] = useState(false);
  const products = useSelector(state => state.ReducerListofProducts.products);
  const dispatch = useDispatch();

  const List = ({searchPhrase, setCLicked, data}) => {
    const renderItem = ({item}) => {
      // when no input, show all
      if (searchPhrase === '') {
        return <ProductItem item={item} />;
      }
      // filter of the name
      if (item.productname.toUpperCase().includes(searchPhrase.toUpperCase())) {
        return <ProductItem item={item} />;
      }
    };

    return (
      <SafeAreaView
        onStartShouldSetResponder={() => {
          setCLicked(false);
        }}>
        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    );
  };

  const searchbarpressed = () => {
    console.log('Search bar pressed');
  };

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
        setLoading(false);
      });
    return () => subscriber();
  }, []);

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size={'large'} />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.root}>
      {isfocus == false && (
        <View style={styles.header}>
          <View style={{flexDirection: 'row'}}></View>
        </View>
      )}

      <SearchBar
        searchPhrase={textsearch}
        setSearchPhrase={setTextsearch}
        clicked={isfocus}
        setCLicked={setisfocus}
      />
      {
        //Game start from here
      }
      {isfocus == false && (
        <ScrollView style={styles.body}>
          <Text style={{marginLeft: 15}}>New products:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <HomeProductItem item={products[0]} />
            <HomeProductItem item={products[1]} />
            <HomeProductItem item={products[2]} />
            <HomeProductItem item={products[3]} />
            <HomeProductItem item={products[4]} />
          </ScrollView>
          <View style={{marginTop: 15}}>
            <Text style={{marginLeft: 15}}>Other products:</Text>
            <ProductItem item={products[5]} />
            <ProductItem item={products[6]} />
            <ProductItem item={products[7]} />
            <ProductItem item={products[8]} />
            <ProductItem item={products[9]} />
          </View>
        </ScrollView>
      )}
      {isfocus && (
        <View style={styles.body}>
          <List
            searchPhrase={textsearch}
            setCLicked={setisfocus}
            data={products}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#fff',
    width: '100%',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
  body: {
    width: '100%',
    marginTop: 5,
  },
  searchBar__container: {
    margin: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%',
  },
  searchBar__unclicked: {
    padding: 10,
    flexDirection: 'row',
    width: '95%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
  },
  searchBar__clicked: {
    padding: 10,
    flexDirection: 'row',
    width: '80%',
    backgroundColor: '#d9dbda',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  input: {
    fontSize: 15,
    marginLeft: 10,
    width: '90%',
  },
});

export default HomeScreen;
