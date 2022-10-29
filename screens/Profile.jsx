
import { StyleSheet, View, Text,Image } from "react-native";
import { Inventory } from "./Inventory";
import axios from "axios";
import { useEffect, useState } from "react";
const baseUrl = "http://172.20.10.9:5000"
 
// axios({
//     method: "get",
//     url: `${baseUrl}/get_items?login=stirk`,
    
//   })
//   .then((res) => {
//     //setItems(res.data);
//     console.log(items)
//   })

  


export function Profile() {
    console.log("prof")
    const [items , setItems] = useState([
        {title:"item1"}
    ])

    useEffect(() => {
        axios.get(`${baseUrl}/get_items?login=stirk`)
            .then((res) => setItems(res.data))
    }, [])

    

    let balance = 0;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.headerContent}>
                  {/* <Image style={styles.avatar}
                    source={{uri: 'https://bootdey.com/img/Content/avatar/avatar6.png'}}/> */}
  
                
                  <Text style={styles.name}>John Doe </Text>
                  
                  <Text style={styles.userInfo}>Balance: {balance} </Text>
              </View>
            </View>
  
            <View style={styles.body}>

                    <Inventory items={items}/>


              {/* <View style={styles.item}>
                <View style={styles.iconContent}>
                  <Image style={styles.icon} source={{uri: 'https://img.icons8.com/color/70/000000/cottage.png'}}/>
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.info}>Home</Text>
                </View>
              </View>
  
              <View style={styles.item}>
                <View style={styles.iconContent}>
                  <Image style={styles.icon} source={{uri: 'https://img.icons8.com/color/70/000000/administrator-male.png'}}/>
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.info}>Settings</Text>
                </View>
              </View>

  
              <View style={styles.item}>
                <View style={styles.iconContent}>
                  <Image style={styles.icon} source={{uri: 'https://img.icons8.com/color/70/000000/facebook-like.png'}}/>
                </View>
                <View style={styles.infoContent}>
                  <Text style={styles.info}>Shop</Text>
                </View>
              </View> */}
  
            </View>
        </View>
      );
}

const styles = StyleSheet.create({
    inventory:{
        backgroundColor:"#FF9F40",
        height: "95%",
        width: "95%",
        opacity: 0.6
    },
    header:{
      backgroundColor: "#111134",
    },
    headerContent:{
      padding:30,
      alignItems: 'flex-end',
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "white",
      marginBottom:10,
    },
    name:{
      fontSize:22,
      color:"#ffffff",
      fontWeight:'600',
    },
    userInfo:{
      fontSize:16,
      color:"#778899",
      fontWeight:'600',
    },
    body:{
      
      backgroundColor: "#211134",
      height:1200,
      alignItems:'center',
    },
    item:{
      flexDirection : 'row',
    },
    infoContent:{
      flex:1,
      alignItems:'flex-start',
      paddingLeft:5
    },
    iconContent:{
      flex:1,
      alignItems:'flex-end',
      paddingRight:5,
    },
    icon:{
      width:30,
      height:30,
      marginTop:20,
    },
    info:{
      fontSize:18,
      marginTop:20,
      color: "#FFFFFF",
    }
  });