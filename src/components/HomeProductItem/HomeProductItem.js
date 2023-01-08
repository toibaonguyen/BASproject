import {View, Text, Pressable, Image, StyleSheet} from 'react-native';
import React from 'react';
import Logo from '../../../assets/images/Logo.png';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Stars from 'react-native-stars';







const HomeProductItem = ({item}) => {
  const navigation = useNavigation();
  const rt=()=>{
    let r1=0
    item.feedbacks.forEach(element => {
      r1+=Number(element.rating)
    });
    return r1/item.feedbacks.length
  }
  const onItemPressed = () => {
    console.log(item.id);
    navigation.navigate('ProductInfo', {id: item.id});
  };
  return (
    <Pressable
      style={{
        width: 200,
        borderWidth: 1,
        borderColor: 'black',
        height: 250,
        borderRadius: 20,
        alignItems: 'center',
      }}
      onPress={onItemPressed}>
      <View
        style={{
          marginTop: 10,
          width: 180,
          height: '50%',
          borderRadius: 20,
          justifyContent: 'center',
          alignItems: 'center',
          
        }}>
        <Image style={{height: '100%', width: '100%',borderRadius:20}} source={{uri:item.image}} />
      </View>
      <View style={{width: '100%', marginTop: 5, paddingHorizontal: 10}}>
        <Text
          style={{
            fontFamily: 'family',
            fontWeight: 'normal',
          }}>
          {item.productname}
        </Text>{
          /*
          
          <View style={styles.ratingsContainer}>
          {[0, 0, 0, 0, 0].map((el, i) => (
            <Icon
              key={i}
              style={styles.star}
              name={i < Math.floor(item.avgRating) ? 'star' : 'star-o'}
              size={18}
              color="#e47911"
            />
          ))}
          <Text>
            <Text> (</Text>
            {item.ratings}
            <Text>)</Text>
          </Text>
        </View>
          */
        }
        <View>
          <Stars
          half={true}
          display={rt()}
          count={5}
          starSize={25}
          disabled={true}
          emptyStar={<Icon
            name={'star-o'}
            color="#e47911"
            style={styles.star}
            size={25}
          />}
          halfStar={<Icon
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
        </View>

        
        <Text style={styles.price}>
          {item.price} VNĐ
          <Text> </Text>
          {item.oldprice > 0 && (
            <Text style={styles.oldPrice}>{item.oldprice} VNĐ</Text>
          )}
        </Text>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    margin: 10,
    borderWidth: 1,
    borderColor: '#d1d1d1',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  image: {flex: 2, height: 150, resizeMode: 'contain'},
  rightContainer: {padding: 10, flex: 3},
  title: {fontSize: 18},
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    flexDirection: 'row',
  },
  ratingsContainer: {flexDirection: 'row'},
  star: {},
  oldPrice: {
    fontSize: 12,
    fontWeight: 'normal',
    textDecorationLine: 'line-through',
  },
});

export default HomeProductItem;
