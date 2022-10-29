
import { StyleSheet, View, Text,Image, TouchableOpacity } from "react-native";
import { Inventory } from "./Inventory";
import axios from "axios";
import { useEffect, useState } from "react";
const baseUrl = "http://172.20.10.9:5000"
import { NavBar } from '../components/NavBar';
import { TopBar } from '../components/TopBar';
import { SelectedInventoryItem } from "./SelectedInventoryItem";
import { Context } from "../Context";
import { useContext } from "react";
import { Subscribes } from "../components/Subscribes";


export function Profile(props) {
    const [context, setContext] = useContext(Context);
    const [items , setItems] = useState([
        {title:"not connect to server"}
    ])
    const [subscribes , setSubscribes] = useState([
      "not connect to server"
  ])
    const [viewItem, setViewItem] = useState(false)
    const [selectedItem, setselectedItem] = useState();
    const [viewSubscribes, setviewSubscribes] = useState(true);


    useEffect(() => {
        axios.get(`${baseUrl}/get_items?login=${context.login}`)
            .then((res) => setItems(res.data));
        axios.get(`${baseUrl}/get_friends?login=${context.login}`)
        .then((res) => setSubscribes(res.data));
    }, [])

    

    return (
        <View>
          <TopBar/>
          <View style={styles.container}>
            
  
            <View style={styles.body}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => {
                setviewSubscribes(false);
              }}>
                <Text>Inventory</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setviewSubscribes(true);
              }}>
                <Text>Subscribes</Text>
              </TouchableOpacity>
            </View>
              {viewSubscribes ? <Subscribes subscribes={subscribes}/> :
              viewItem ? <SelectedInventoryItem item={selectedItem} setViewItem={setViewItem}/> : <Inventory items={items} selectItem={setselectedItem} setViewItem={setViewItem}/>}
                    
                    
            </View>
            
          </View>
          <NavBar navigation={props.navigation}/>
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
      
      backgroundColor: "#ffffff",
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
      paddingTop: 150,

      backgroundColor: "#211134",
      height: "100%",
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