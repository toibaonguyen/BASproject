import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Pressable,
  FlatList,
  Image,
} from 'react-native';
import React from 'react';
import categories from '../../../Data/categories';
import { useNavigation } from '@react-navigation/native';

const wHeight = Dimensions.get('window').height;
const wWidth = Dimensions.get('window').width;

const DiscoveryScreen = () => {
  const Item = ({item}) => {

    const navigation=useNavigation()

    const PressItem=()=>{
      navigation.navigate("SpecifiedCategorylist",{name:item.name})
    }

    return (
      <Pressable 
      style={styles.item}
      onPress={PressItem}
      >
        <View style={{flex: 2}}>
          <Text
            style={{
              marginHorizontal: 5,
              marginTop: 15,
              fontWeight: 'bold',
              alignSelf: 'center',
            }}>
            {item.name}
          </Text>
        </View>

        <View style={{flex: 5, justifyContent: 'center'}}>
          <Image
            source={item.image}
            style={{
              resizeMode: 'stretch',
              width: '50%',
              height: '50%',
              alignSelf: 'center',
            }}
          />
        </View>
      </Pressable>
    );
  };

  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={categories}
      style={{width: '100%'}}
      contentContainerStyle={{alignItems: 'center'}}
      numColumns={2}
      renderItem={({item}) => <Item item={item} />}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    borderRadius: 4,

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.19,
    shadowRadius: 5.62,
    elevation: 6,
    height: wHeight * 0.35,
    width: wWidth * 0.4,
    margin: 15,
    backgroundColor: '#FFF',
  },
});

export default DiscoveryScreen;
