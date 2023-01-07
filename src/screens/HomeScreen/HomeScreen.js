import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Image,
  FlatList,
  ActivityIndicator,
  TextInput,
  Pressable,
  Keyboard,
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
        <View style={{marginLeft:5}}> 
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


  const List = ({ searchPhrase, setCLicked, data }) => {
    const renderItem = ({ item }) => {
      // when no input, show all
      if (searchPhrase === "") {
        return <ProductItem item={item} />;
      }
      // filter of the name
      if (item.productname.toUpperCase().includes(searchPhrase.toUpperCase())) {
        return <ProductItem item={item}  />;
      }


      
    };
  
    return (
        <View
          onStartShouldSetResponder={() => {
            setCLicked(false);
          }}
        >
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </View>
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
          console.log(
            'ref: ',
            `products/product/${documentSnapshot.id}/representativeImage/i0`,
          );
          const ref = `products/product/${documentSnapshot.id}/representativeImage/i0.jpg`;
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
    <View style={styles.root} >
      {isfocus == false && (
        <View style={styles.header}>
          <View
            style={{
              width: '50%',
            }}>
            <Text style={{fontWeight: 'bold', fontSize: 30}}>Home</Text>
          </View>
        </View>
      )}

      <View
        style={{
          marginTop: 10,
          width: '100%',
          marginVertical: 30,
          flexDirection: 'row',
        }}>
        <SearchBar
          searchPhrase={textsearch}
          setSearchPhrase={setTextsearch}
          clicked={isfocus}
          setCLicked={setisfocus}
        />
      </View>
      {
        //Game start from here
      }
      {isfocus==false&&
      (
      <View style={styles.body}>
        <ScrollView>
          <HomeProductItem item={products[0]} />
        </ScrollView>
      </View>
      )
      }
      {
        isfocus&&(
          <View>
            <List
            searchPhrase={textsearch}
            setCLicked={setisfocus}
            data={products}
            />

          </View>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  root: {paddingHorizontal: 20, backgroundColor: '#fff'},
  loading: {justifyContent: 'center', alignItems: 'center', flex: 1},
  header: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
  body: {
    width: '100%',
    marginTop: 10,
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
    fontSize: 20,
    marginLeft: 10,
    width: '90%',
  },
});

export default HomeScreen;
