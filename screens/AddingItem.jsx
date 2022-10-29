import { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { NavBar } from '../components/NavBar';
import { TopBar } from '../components/TopBar';
import { StyleSheet } from "react-native";
export function AddingItem(props) {
    
    const [itemName, setitemName] = useState();
    const [itemPrice, setitemPrice] = useState();
    const [itemDescription, setitemDescription] = useState();


    return (
        <View style={styles.body}>
            <TopBar />
            
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
                placeholder="Name"
                placeholderTextColor="white"
            />
            <TextInput
                onChangeText={setitemPrice}
                value={itemPrice}
                placeholder="Name"
                placeholderTextColor="white"
            />
            <NavBar navigation={props.navigation}/>
        </View>
      );
}

const styles = StyleSheet.create({
    body:{
        width: "100%",
        height: "100%",
        backgroundColor: "#67237F",
    }
  });