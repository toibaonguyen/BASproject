import { View, Text,Image } from 'react-native'
import React from 'react'
import styles from './styles'
import Logo from "../../../assets/images/Logo.png"

const InitializingScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={Logo} resizeMode={"contain"} />
    </View>
  )
}

export default InitializingScreen