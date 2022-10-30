
import { View, Text, TouchableOpacity,TextInput, Image, KeyboardAvoidingView } from "react-native";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { Context } from "../Context";
import { useContext } from "react";
import axios from "axios";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { baseUrl } from "../baseUrl";
import { BlurView } from 'expo-blur';

const SellItem = (item, price, login) => {
    axios.post(`${baseUrl}/sell_item?login=${login}&id=${item.id}&price=${price}`, {});
}
const SendItem = (item, toLogin, fromLogin) => {
    axios.post(`${baseUrl}/send_item?login=${fromLogin}&id=${item.id}&to=${toLogin}`, {});
}

export const SelectedMarketItem = (props) => {
    const [sellCost, setsellCost] = useState("");
    const [tradeLogin, settradeLogin] = useState("");
    const [context, setContext] = useContext(Context);
    const arrow = "../assets/arrow.png";
  
    return (
        <View style={styles.body}>
            <BlurView>
                <TouchableOpacity style={styles.backWrapper} onPress={() => {props.setViewItem(false)}}>
                    <Image style={styles.arrow} source={require(arrow)} />
                    <Text style={styles.arrowText}>Назад</Text>
                </TouchableOpacity>
                {/* <Text style={styles.name}>{props.item.title}</Text> */}
                <Text style={styles.name}>Name</Text>
                {/* <Image style={styles.image} source={{uri: `${baseUrl}/get_image?name=${props.item.id}`}} /> */}
                {/* <Text style={styles.description}>{props.item.description}</Text> */}
                <Text style={styles.description}>Desc</Text>
                <View style={styles.itemsnav}>
                    <TouchableOpacity>
                        <Text>
                            Купить
                        </Text>
                    </TouchableOpacity>
                </View>
            </BlurView>
        </View>
    )
}

const styles = StyleSheet.create({
    body:{
        width: "100%",
        height: "100%"
    },
    backWrapper: {
        flexDirection: "row",
        alignItems: "center"
    },
    arrow: {
        resizeMode: "contain",
        width: 25,
        height: 25,
        marginRight: 10
    },
    pen: {
        resizeMode: "contain",
        width: 25,
        height: 25,
        marginLeft: 10
    },
    arrowText: {
        color: "white",
        alignSelf: "center",
        fontSize: 20
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    item: {
        flexDirection: "row",
        alignItems: "center"
    },
    margin: {
        marginVertical: 10,
        width: "90%"
    },
    input: {
        width: "60%",
        fontSize: 24,
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: "white",
        borderColor: "white",
        borderWidth: 2,
        borderRadius: 40
    },
    inputText: {
        color: "white",
        marginLeft: "5%",
        alignSelf: "center"
    },
    name: {
        fontSize: 42,
        color: "white"
    },
    image: {
        width: "100%",
        height: 200,
        resizeMode: "contain"
    },
    description: {
        color: "white",
        fontSize: 20
    }
  });