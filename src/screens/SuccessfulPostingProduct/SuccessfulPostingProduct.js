import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import FontAwesome from "react-native-vector-icons/FontAwesome"
import CustomButton from '../../components/CustomButton'

const SuccessfulPostingProduct = () => {
    const navigation=useNavigation()
    const gobacktohome=()=>{
      navigation.navigate("PrimaryUI",{screen:"Home"})
    }
    return (
      <View style={{flex:1}}>
        <View style={{flex:4,justifyContent:"center",alignItems:"center"}}>
          <FontAwesome name='check-circle' color="#8CF237" size={200}/>
        </View>
        <View style={{flex:1,padding:10}}>
          <CustomButton text={"Go back to Home"} onPress={gobacktohome}/>
        </View>
      </View>
    )
}

export default SuccessfulPostingProduct