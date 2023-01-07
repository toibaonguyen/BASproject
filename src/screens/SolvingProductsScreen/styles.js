import { StyleSheet } from "react-native";

const styles=StyleSheet.create({
    root:{
        flex:1
    },
    container:{
        flex:1
    },
    background:{
        flex:1,
    },
    header:{
        borderBottomLeftRadius:50,
        borderBottomRightRadius:50,
        backgroundColor:"black",
        height:150,
        justifyContent:"center"
    },
    body:{
        marginTop:10,
        paddingTop:20,
        paddingBottom:40
    },
    button:{
        marginLeft:10,
        marginRight:10,
        height:150,
        borderRadius:30,shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
        marginTop:25
    }
})

export default styles