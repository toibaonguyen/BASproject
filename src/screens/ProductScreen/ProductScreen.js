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

const Feedback = ({name, rating, comment}) => {
  return (
    <View style={{padding: 10}}>
      <Text style={{fontWeight: 'bold', marginLeft: 10}}>{name}</Text>
      <View style={{width: '50%'}}>
        <Stars
          default={rating}
          count={5}
          starSize={25}
          disabled={true}
          emptyStar={
            <Icon
              name={'star-o'}
              color="#e47911"
              style={styles.star}
              size={25}
            />
          }
          halfStar={
            <Icon
              name={'star-half-full'}
              color="#e47911"
              style={styles.star}
              size={25}
            />
          }
          fullStar={
            <Icon name={'star'} color="#e47911" style={styles.star} size={25} />
          }
        />
      </View>
      <Text style={{marginHorizontal: 15}}>{comment}</Text>
      <View
        style={{
          borderBottomWidth: 1,
          marginTop: 5,
          width: '50%',
          alignSelf: 'center',
        }}></View>
    </View>
  );
};

const ProductScreen = ({route, navigation}) => {
  const id = route.params.id;
  const userid = useSelector(state => state.ReducerUserInfo.id);
  const username = useSelector(state => state.ReducerUserInfo.name);
  const favoriteProducts = useSelector(
    state => state.ReducerUserInfo.favoriteProducts,
  );
  const products = useSelector(state => state.ReducerListofProducts.products);
  const baseavatar = useSelector(state => state.ReducerUserInfo.baseavatar);
  const product =
    products[products.findIndex(object => {
        return object.id === id;
      })
    ];

  const [sellername, setSellername] = useState('');
  const [selleravatar, setSelleravatar] = useState(baseavatar);
  const [sellerType, setSellerType] = useState('common');
  const [selectedOption, setselectedOption] = useState(
    product.options ? product.options[0] : '',
  );
  const [quantity, setQuantity] = useState(
    Number(product.maxQuantity) - Number(product.tendtodecreaseQuantity) <= 0
      ? 0
      : 1,
  );
  const [favoriteOne, setFavoriteOne] = useState(favoriteProducts.includes(id));
  const [quantityWanttosetmax, setQuantityWanttosetmax] = useState(
    product.maxQuantity,
  );
  const [newPrice, setNewPrice] = useState(null);
  const [isloading, setIsloading] = useState(false);
  const [yourRating, setyourRating] = useState(3);
  const [yourComment, setyourComment] = useState('');

  //Can you leave a feedback is here

  const rt = () => {
    let r1 = 0;
    product.feedbacks.forEach(element => {
      r1 += Number(element.rating);
    });
    return r1 / product.feedbacks.length;
  };

  const pushtosellerspage = () => {
    navigation.push('Sellerspage', {
      id: product.sellerID,
      avatar: selleravatar,
      username: sellername,
    });
  };

  const postfeedback = async () => {
    await firestore()
      .collection('Products')
      .doc(id)
      .update({
        feedbacks: firestore.FieldValue.arrayUnion({
          name: username,
          rating: yourRating,
          comment: yourComment,
        }),
      })
      .then(() => {
        Alert.alert('Thanks for your feedback');
      });
  };

  const getuser = async () => {
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

  const onUpdateQuantityPressed = async () => {
    await firestore()
      .collection('Products')
      .doc(id)
      .update({
        maxQuantity: quantityWanttosetmax,
      })
      .then(() => {
        Alert.alert('Notice', 'Update Successfully');
        navigation.goBack();
      })
      .catch(e => {
        Alert.alert('Error', e);
      });
  };
  const onUpdatePrice = async () => {
    if (newPrice > 0) {
      await firestore()
        .collection('Products')
        .doc(id)
        .update({
          price: newPrice,
          oldprice: product.price,
        })
        .then(() => {
          Alert.alert('Notice', 'Update Successfully');
        })
        .catch(e => {
          Alert.alert('Error', e);
        });
    } else {
      Alert.alert('Error', 'Please fill in new price!');
    }
  };

  const onRemoveProduct = async () => {
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

  const onAddtoCartPressed = async () => {
    console.log('Add to cart');
    await firestore()
      .collection('Users')
      .doc(userid)
      .update({
        shoppingCart: firestore.FieldValue.arrayUnion({
          productid: id,
          quantity: quantity,
          option: selectedOption,
          ownID: String(new Date()) + '_' + id + '_' + userid,
        }),
      });
  };
  const onBuyNowPressed = () => {
    console.log('Buy now');
  };

  const onFavorite = async () => {
    if (favoriteOne) {
      await firestore()
        .collection('Users')
        .doc(userid)
        .update({
          favoriteProducts: firestore.FieldValue.arrayRemove(id),
        })
        .then(() => {
          setFavoriteOne(false);
        });
      return;
    } else {
      await firestore()
        .collection('Users')
        .doc(userid)
        .update({
          favoriteProducts: firestore.FieldValue.arrayUnion(id),
        })
        .then(() => {
          setFavoriteOne(true);
        });
      return;
    }
  };

  if (product.status == 'cancelled') {
    return (
      <View
        style={{
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>This product has been removed!</Text>
      </View>
    );
  } else {
    return (
      <ScrollView style={{backgroundColor: 'white'}}>
        <View style={styles.root}>
          <ImageCarousel images={JSON.parse(JSON.stringify(product.images))} />
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
          {product.sellerID == userid && (
            <TextInput
              placeholder="New Price (VNĐ)"
              keyboardType="numeric"
              onChangeText={setNewPrice}
            />
          )}
          <View style={{flexDirection: 'row-reverse'}}>
            {product.sellerID == userid && (
              <Button onPress={onUpdatePrice}>Set new price</Button>
            )}
          </View>
          <View style={{marginTop: 15}}>
            <Text style={{fontWeight: 'bold'}}>Rating:</Text>
            {
              <Stars
                half={true}
                display={rt()}
                count={5}
                starSize={25}
                disabled={true}
                emptyStar={
                  <Icon
                    name={'star-o'}
                    color="#e47911"
                    style={styles.star}
                    size={25}
                  />
                }
                halfStar={
                  <Icon
                    name={'star-half-full'}
                    color="#e47911"
                    style={styles.star}
                    size={25}
                  />
                }
                fullStar={
                  <Icon
                    name={'star'}
                    color="#e47911"
                    style={styles.star}
                    size={25}
                  />
                }
              />
            }
            <Text style={{alignSelf: 'center'}}>
              (<Text>{product.feedbacks.length}</Text>)
            </Text>
          </View>

          <Text style={styles.descriptionTitle}>Features & details</Text>
          <View style={styles.description}>
            <Text>{product.description}</Text>
          </View>

          {product.sellerID != userid && (
            <View style={styles.favoriteIcon}>
              <Pressable onPress={onFavorite}>
                {favoriteOne ? (
                  <AntDesign name="heart" color={'#E31100'} size={35} />
                ) : (
                  <AntDesign name="hearto" color={'#000'} size={35} />
                )}
              </Pressable>
            </View>
          )}
          {product.sellerID != userid &&
            Number(product.maxQuantity) -
              Number(product.tendtodecreaseQuantity) <=
              10 && (
              <Text style={{marginBottom: 5}}>
                In stock currently:{' '}
                <Text style={{color: 'red'}}>
                  {Number(product.maxQuantity) -
                    Number(product.tendtodecreaseQuantity) <
                  0
                    ? 0
                    : Number(product.maxQuantity) -
                      Number(product.tendtodecreaseQuantity)}
                </Text>
              </Text>
            )}
          {product.sellerID != userid && (
            <QuantinySelector
              quantity={quantity}
              setQuantity={setQuantity}
              maxQuantity={
                Number(product.maxQuantity) -
                Number(product.tendtodecreaseQuantity)
              }
            />
          )}
          {product.sellerID != userid && (
            <CustomButton
              text="Add to Cart"
              onPress={onAddtoCartPressed}
              fgColor="black"
              bgColor="#4B8CE5"
            />
          )}
          {product.sellerID != userid && (
            <CustomButton
              text="Buy Now"
              onPress={onBuyNowPressed}
              bgColor="#d1d1d1"
              fgColor="black"
            />
          )}
          {product.sellerID == userid && (
            <View>
              <View style={{marginTop: 15, marginBottom: 15}}>
                <Text>Max quantity: </Text>
                <QuantinySelector
                  quantity={quantityWanttosetmax}
                  setQuantity={setQuantityWanttosetmax}
                />
              </View>
              <CustomButton
                text="Update Quantity"
                bgColor={'#E77B27'}
                onPress={onUpdateQuantityPressed}
              />
              <CustomButton
                text="Remove"
                bgColor={'#D7D7D7'}
                onPress={onRemoveProduct}
              />
            </View>
          )}
          {product.sellerID != userid && (
            <View style={styles.avatarseller}>
              <Pressable onPress={pushtosellerspage}>
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
              </Pressable>
            </View>
          )}
        </View>
        <View>
          <Text
            style={{
              marginLeft: 10,
              fontSize: 25,
              color: 'black',
              textDecorationLine: 'underline',
            }}>
            Feedback:
          </Text>
          {product.feedbacks.length > 0 ? (
            <ScrollView>
              {product.feedbacks.map((i, index) => (
                <Feedback
                  key={index}
                  name={i.name}
                  comment={i.comment}
                  rating={i.rating}
                />
              ))}
            </ScrollView>
          ) : (
            <View>
              <Text style={{alignSelf: 'center', margin: 10}}>
                There is no feedback here
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
};

export default ProductScreen;
