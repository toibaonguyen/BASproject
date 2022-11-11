import { View, Text,TextInput,StyleSheet } from 'react-native'
import React from 'react'

const CustomInput = ({placeholder,value,setvalue,secureTextEntry}) => {
  return (
    <View style={styles.container}>
      <TextInput 
      value={value}
      onChangeText={setvalue}
      placeholder={placeholder} 
      style={styles.input}
      secureTextEntry={secureTextEntry}/>
    </View>
  )
}


const styles=StyleSheet.create({
    
    container: {
        backgroundColor:"white",
        width:"100%",
        borderColor:"#e8e8e8",
        borderRadius:5,
        borderWidth:1,
        paddingHorizontal:10,
        marginVertical:5
        
    },
    input:{}
})
export default CustomInput