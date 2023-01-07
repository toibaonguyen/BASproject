import { View, Text, ImageBackground, Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import styles from './styles'
import backgroundforSolvingProducts from "../../../assets/images/backgroundforSolvingProducts.png"
import Logo from "../../../assets/images/Logo.png"
import { useNavigation } from '@react-navigation/native'
const SolvingProductsScreen = () => {
  const navigation=useNavigation()
  return (
    <View style={styles.root}>
      <ImageBackground source={backgroundforSolvingProducts} resizeMode="cover" style={styles.background}>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.header}>
              <Image source={Logo} style={{alignSelf:"center",height:100,width:100}}/>
            </View>
            <View style={styles.body}>
              <TouchableOpacity 
              style={styles.button} 
              onPress={()=>{navigation.navigate("BoughtProcess")}}>
                <View style={{backgroundColor:"#70EA3E",flex:1,borderRadius:30,justifyContent:"center"}}>
                  <Text style={{alignSelf:"center",fontSize:15,fontWeight:"bold"}}>Products procession that you did buy</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate("SoldProcess")}}>
                
                <View 
                style={{backgroundColor:"#14E1D3",flex:1,borderRadius:30,justifyContent:"center"}}
                
                >
                  <Text style={{alignSelf:"center",fontSize:15,fontWeight:"bold"}}>Products procession that you sell</Text>
                </View>
                
              </TouchableOpacity>

            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
      
    
    
  )
}

export default SolvingProductsScreen