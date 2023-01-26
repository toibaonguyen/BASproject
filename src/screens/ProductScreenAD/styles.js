import { StyleSheet } from "react-native";

const styles=StyleSheet.create({
    root:{padding:10,backgroundColor:"white"},
    title:{fontSize:20,color:"black"},
    price:{fontSize:18,fontWeight:"bold",color:"red"},
    oldPrice:{fontSize:12,fontWeight:"normal",textDecorationLine:"line-through",color:"black"},
    descriptionTitle:{fontWeight:"bold",marginTop:10},
    description:{padding:5,borderLeftWidth:1,borderRightWidth:1,marginTop:10},
    avatarseller:{flexDirection:"row",flex:1,marginTop:10},
    favoriteIcon:{flex:1,margin:15}
    
})

export default styles