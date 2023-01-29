import { View, Text, SafeAreaView, FlatList, Pressable } from 'react-native'
import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Searchbar } from 'react-native-paper'
import firestore from "@react-native-firebase/firestore"




const Renderi=({item})=>{
    const [isview,setisview]=useState(false)
    return(
        <Pressable style={{margin:0}} onPress={()=>{setisview(!isview)}}>
            <View style={{borderWidth:1,backgroundColor:"#fff",borderRadius:5}}>
            <View style={{paddingLeft:10,justifyContent:"center",height:60,borderBottomWidth:1}}>
                <Text style={{fontWeight:"bold",color:"black"}}>{item.id}</Text>
            </View>
            {
                isview&&(
                    <View style={{height:100,justifyContent:"center",alignItems:"center"}}>
                        <Text style={{color:"green",fontSize:40}}>{item.income} <Text style={{fontSize:10}}>VNĐ</Text></Text>
                    </View>
                )
            }
            </View>
            
        </Pressable>
    )
}

const ADmanageIncome = () => {


    const [IncomeList,setIncomeList]=useState([])
    const [searchtext,setsearchtext]=useState("")

    useEffect(() => {
        const subscriber = firestore()
          .collection('CompanyIncome')
          .onSnapshot(querySnapshot => {
            const productslist = [];
            querySnapshot.forEach(documentSnapshot => {
              productslist.push({
                ...documentSnapshot.data(),
                id: documentSnapshot.id,
              });
            });
            setIncomeList(productslist)
          });
        return () => subscriber();
      }, []);

  return (
    <SafeAreaView style={{padding:5}}>
        <Searchbar placeholder='Search (Year_month_date)' value={searchtext} onChangeText={setsearchtext}/>
        <FlatList
        showsVerticalScrollIndicator={false}
        data={IncomeList}
        style={{marginTop:15}}
        renderItem={({item})=>{
            if(searchtext==""){
                return <Renderi item={item}/>
            }
            
            if(item.id.includes(searchtext)){
                return <Renderi item={item}/>
            } 
    }}
        />
    </SafeAreaView>
  )
}

export default ADmanageIncome