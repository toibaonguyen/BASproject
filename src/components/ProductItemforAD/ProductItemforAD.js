import {View, Text, Pressable, StyleSheet, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import Stars from "react-native-stars";





const ProductItemforAD = ({item}) => {

  const navigation = useNavigation();
  const onItemPressed = () => {
    navigation.navigate('productScreen', {id: item.id});
  };

  const rt=()=>{
    let r1=0
    item.feedbacks.forEach(element => {
      r1+=Number(element.rating)
    });
    return r1/item.feedbacks.length
  }
  //can it be render???
  if (true) {
    return (
      <Pressable onPress={onItemPressed} key={item.id} style={styles.page}>
        <View style={styles.root}>
          <Image style={styles.image} source={{uri: item.thumbnail}} />
          <View style={styles.rightContainer}>
            <Text style={styles.title} maxFontSizeMultiplier={4}>
              {item.productname}
            </Text>
          <View>
        </View>
            <Text style={styles.price}>
              {item.price} VNĐ
              <Text> </Text>
              {item.oldprice > 0 && (
                <Text style={styles.oldPrice}>{item.oldprice} VNĐ</Text>
              )}
            </Text>
            
          </View>
        </View>
      </Pressable>
    );
  }
};
const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    margin: 10,
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  image: {flex: 2, height: 150, resizeMode: 'contain',marginVertical:5},
  rightContainer: {padding: 10, flex: 3},
  title: {fontSize: 18},
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    flexDirection: 'row',
  },
  ratingsContainer: {flexDirection: 'row'},
  star: {margin: 2},
  oldPrice: {
    fontSize: 12,
    fontWeight: 'normal',
    textDecorationLine: 'line-through',
  },
});

export default ProductItemforAD;
