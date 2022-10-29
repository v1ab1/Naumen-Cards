import { useState } from "react";
import { View, Text, TextInput,TouchableOpacity } from "react-native";
import { NavBar } from '../components/NavBar';
import { TopBar } from '../components/TopBar';
import { StyleSheet } from "react-native";
import axios from "axios";
import { baseUrl } from "../baseUrl";


let RegistrateItem = (item, login) => {
    axios.post(`${baseUrl}/upload_item?login=${login}&name=${item.name}&description=${item.description}`, {});
}





export function AddingItem(props) {
    
    const [itemName, setitemName] = useState();
    const [itemPrice, setitemPrice] = useState();
    const [itemDescription, setitemDescription] = useState();


    return (
        <View style={styles.body}>
            <TopBar />
            <View style={styles.content}>
                <Text>Registrate item</Text>
                <TextInput
                    onChangeText={setitemName}
                    value={itemName}
                    placeholder="Name"
                    placeholderTextColor="white"
                />
                <TextInput
                    onChangeText={setitemDescription}
                    value={itemDescription}
                    placeholder="description"
                    placeholderTextColor="white"
                />
                <TouchableOpacity onPress={() => {
                    RegistrateItem({
                        name: itemName,
                        description: itemDescription
                    }, "stirk")
                }}>
                    <Text>Add Item</Text>
                </TouchableOpacity>
                
            </View>
            <NavBar navigation={props.navigation}/>
        </View>
      );
}

const styles = StyleSheet.create({
    body:{
        width: "100%",
        height: "100%",
        backgroundColor: "#67237F",
        
    },
    content:{
        paddingTop: 150,
        marginHorizontal: 20
        
    }
  });