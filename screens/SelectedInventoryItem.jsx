
import { View, Text, TouchableOpacity,TextInput } from "react-native"
import { StyleSheet } from "react-native";
import { useState } from "react";

import axios from "axios";

import { baseUrl } from "../baseUrl";

const SellItem = (item, price, login) => {
    axios.post(`${baseUrl}/sell_item?login=${login}&id=${item.id}&price=${price}`, {});
}
const SendItem = (item, toLogin, fromLogin) => {
    axios.post(`${baseUrl}/send_item?login=${fromLogin}&id=${item.id}&to=${toLogin}`, {});
}

export const SelectedInventoryItem = (props) => {
    const [sellCost, setsellCost] = useState("");
    const [tradeLogin, settradeLogin] = useState("");
      

    
    return (
        <View style={styles.body} >
            <TouchableOpacity onPress={() => {props.setViewItem(false)}}>
                <Text>Back</Text>
            </TouchableOpacity>
             <Text>{props.item.title + " " + props.item.description}</Text>
             <View style={styles.itemsnav}>
                <TouchableOpacity style={styles.item} onPress={() => { 
                    SellItem(props.item, sellCost, "stirk")
                }}>
                    <Text>Sell</Text>
                    <TextInput
                        style={{backgroundColor: "#A65E00"}}
                        onChangeText={setsellCost}
                        value={sellCost}
                        placeholder="price"
                        placeholderTextColor="white"
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.item} onPress={() => {
                    SendItem(props.item, tradeLogin, "stirk")
                }}>
                    <Text>Trade</Text>
                    <TextInput
                        style={{backgroundColor: "#A65E00"}}
                        onChangeText={settradeLogin}
                        value={tradeLogin}
                        placeholder="login"
                        placeholderTextColor="white"
                    />
                </TouchableOpacity>
                <TouchableOpacity style={styles.item}>
                    <Text>Edit</Text>
                </TouchableOpacity>
             </View>
             
        </View>
    )
}

const styles = StyleSheet.create({
    body:{
        width: "80%",
        height: "80%",
        backgroundColor: "#ffffff",
    },
    itemsnav:{
        marginTop:"25%"
    },
    item: {
        marginTop: 10
    }
  });