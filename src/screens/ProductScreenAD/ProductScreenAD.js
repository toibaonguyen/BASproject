import {
  View,
  Text,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './styles';
import {Picker} from '@react-native-picker/picker';
import QuantinySelector from '../../components/QuantinySelector';
import CustomButton from '../../components/CustomButton';
import ImageCarousel from '../../components/ImageCarousel';
import {Avatar, Button, TextInput} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {setisloading} from '../../redux/store/action';
import Icon from 'react-native-vector-icons/FontAwesome';
import Stars from 'react-native-stars';
import {FlatList} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductScreenAD = ({route, navigation}) => {
  const id = route.params.id;
  const [sellername, setSellername] = useState('');
  const [selleravatar, setSelleravatar] = useState('');
  const [sellerType, setSellerType] = useState('common');
  const [isloading,setisloading]=useState(true)
  
  const products = useSelector(state => state.ReducerListofProducts.products);
  const product = products[
      products.findIndex(object => {
        return object.id === id;
      })
    ];

    const [selectedOption,setselectedOption]=useState(product.options?product.options[0]:"")
  const getuser = async () => {
    
    await firestore().collection('Products').doc(id)



    await firestore()
      .collection('Users')
      .doc(product.sellerID)
      .get()
      .then(async q => {
        await setSellername(q.data().username);
        await setSelleravatar(q.data().avatar);
        await setSellerType(q.data().usertype);
      })
      .catch(e => {
        console.log(e);
      });
  };

  useEffect(() => {
    setisloading(true);
    getuser().then(() => {
      setisloading(false);
    });
  }, []);

  const onCancelProduct = async () => {
    await firestore()
      .collection('Products')
      .doc(id)
      .update({
        status: 'cancelled',
      })
      .then(() => {
        Alert.alert('Notice', 'Remove Successfully!');
        navigation.goBack();
      });
  };

  const onConfirmProduct = async () => {
    await firestore()
      .collection('Products')
      .doc(id)
      .update({
        status: 'valid',
      })
      .then(() => {
        Alert.alert('Notice', 'Remove Successfully!');
        navigation.goBack();
      });
  };


  if(isloading){
    return(
    <View style={{alignItems:"center",justifyContent:"center"}}>
      <ActivityIndicator/>
    </View>
    )
  }

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={styles.root}>
        <ImageCarousel images={product.images} />
        <Text style={styles.title}>{product.productname}</Text>
        {product.options && (
          <Picker
            selectedValue={selectedOption}
            onValueChange={itemvalue => setselectedOption(itemvalue)}>
            {product.options.map((option, i) => (
              <Picker.Item key={i} label={option} value={option} />
            ))}
          </Picker>
        )}
        <Text style={styles.price}>
          {product.price} VNĐ
          <Text> </Text>
          {product.oldprice > 0 && (
            <Text style={styles.oldPrice}>{product.oldprice} VNĐ</Text>
          )}
        </Text>

        <Text style={styles.descriptionTitle}>Features & details</Text>
        <View style={styles.description}>
          <Text>{product.description}</Text>
        </View>
        <View style={styles.avatarseller}>
          <Avatar.Image source={{uri: selleravatar}} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{marginLeft: 10}}>{sellername}</Text>
            {sellerType === 'licensed' && (
              <FontAwesome
                name="check-circle"
                color={'#1394FF'}
                style={{marginLeft: 5}}
              />
            )}
            {sellerType === 'authentic' && (
              <MaterialCommunityIcons
                name="star-circle"
                color={'#FFBD00'}
                style={{marginLeft: 5}}
              />
            )}
          </View>
        </View>
        {product.status == 'valid' && (
          <CustomButton
            text={'disable'}
            onPress={onCancelProduct}
            bgColor="#C70039"
          />
        )}
        {product.status == 'cancelled' && (
          <CustomButton
            text={'Active'}
            onPress={onConfirmProduct}
            bgColor="#78DA37"
          />
        )}
        {product.status == 'pending' && (
          <View>
            <CustomButton
              text={'Confirm'}
              onPress={onConfirmProduct}
              bgColor="#78DA37"
            />

            <CustomButton
              text={'Cancel'}
              onPress={onCancelProduct}
              bgColor="#C70039"
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default ProductScreenAD;
