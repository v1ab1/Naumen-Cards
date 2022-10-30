import { BlurView } from 'expo-blur';
import { StyleSheet, View, Text,Image, TouchableOpacity, ImageBackground } from "react-native";
import { Inventory } from "./Inventory";
import axios from "axios";
import { useEffect, useState } from "react";
const baseUrl = "http://172.20.10.9:5000"
import { NavBar } from '../components/NavBar';
import { SelectedInventoryItem } from "./SelectedInventoryItem";
import { Context } from "../Context";
import { useContext } from "react";
import { Subscribes } from "../components/Subscribes";

const background = '../assets/3.png';

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
    const [viewSubscribes, setviewSubscribes] = useState(false);
    const [image , setImage] = useState();

    const pickImage = async () => {
      // No permissions request is necessary for launching the image library
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result);

      }
    };

    
    
    useEffect(() => {
        axios.get(`${baseUrl}/get_items?login=${context.login}`)
            .then((res) => setItems(res.data));
        axios.get(`${baseUrl}/get_friends?login=${context.login}`)
        .then((res) => setSubscribes(res.data));
    }, [])

    

    return (
      <ImageBackground resizeMode="cover" source={require(background)}>
        <View style={styles.container}>
          <View style={styles.body}>
            <View style={styles.headerWrapper}>
              <TouchableOpacity onPress={() => {
                setviewSubscribes(false);
              }}>
                <Text style={[styles.header, viewSubscribes ? null : styles.active]}>Инвентарь</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                setviewSubscribes(true);
              }}>
                <Text style={[styles.header, viewSubscribes ? styles.active : null]}>Подписки</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.rounded}>
              <BlurView style={styles.blur}>
                {viewSubscribes ? <Subscribes subscribes={subscribes}/> :
                  <Inventory login={context.login} items={items} owned={true} selectedItem={selectedItem} selectItem={setselectedItem} viewItem={viewItem} setViewItem={setViewItem}/>}    
              </BlurView>
            </View>      
          </View>
          
        </View>
        <NavBar navigation={props.navigation}/>
      </ImageBackground>
      );
}

const styles = StyleSheet.create({
    userInfo:{
      fontSize:16,
      color:"#778899",
      fontWeight:'600',
    },
    body:{
      paddingTop: "30%",
      height: "100%",
      alignItems:'center',
    },
    headerWrapper: {
      flexDirection: "row",
      width: "100%",
      justifyContent: "space-between",
      paddingHorizontal: "5%"
    },
    header: {
      color: "white",
      fontSize: 34,
      opacity: "0.6",
      marginBottom: "10%"
    },
    active: {
      opacity: 1
    },
    rounded: {
      overflow: "hidden",
      height: "72%",
      width: "90%",
      borderRadius: 40
    },
    blur: {
      height: "100%",
      padding: 20
    }
});