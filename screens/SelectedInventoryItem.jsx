
import { View, Text, TouchableOpacity,TextInput, Image, KeyboardAvoidingView } from "react-native";
import { StyleSheet } from "react-native";
import { useState } from "react";
import { Context } from "../Context";
import { useContext } from "react";
import axios from "axios";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { baseUrl } from "../baseUrl";

const SellItem = (item, price, login, callBack) => {
    axios.post(`${baseUrl}/sell_item?login=${login}&id=${item.id}&price=${price}`, {})
    .then(()=>{ if(callBack) callBack(); });
}
const SendItem = (item, toLogin, fromLogin, callBack) => {
    axios.post(`${baseUrl}/send_item?login=${fromLogin}&id=${item.id}&to=${toLogin}`, {})
    .then(() => {if (callBack) callBack();});
}

export const SelectedInventoryItem = (props) => {
    const [sellCost, setsellCost] = useState("");
    const [tradeLogin, settradeLogin] = useState("");
    const [context, setContext] = useContext(Context);
    const arrow = "../assets/arrow.png";
    const pen = "../assets//pen.png";

    const naviagteToProfile = () => {
        props.navigation.navigate("Profile");
    }

    return (
        <KeyboardAwareScrollView style={styles.keyboard}>
            <View style={styles.body}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backWrapper} onPress={() => {props.setViewItem(false)}}>
                        <Image style={styles.arrow} source={require(arrow)} />
                        <Text style={styles.arrowText}>Назад</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.item}>
                        {props.owned ? <View style={styles.row}>
                            <Text style={styles.arrowText}>Изменить</Text> 
                            <Image style={styles.pen} source={require(pen)} />
                        </View> : null }
                        
                    </TouchableOpacity>
                </View>
                <Text style={styles.name}>{props.item.title}</Text>
                <Image style={styles.image} source={{uri: `${baseUrl}/get_image?name=${props.item.id}`}} />
                <Text style={styles.description}>{props.item.description}</Text>

                {props.owned ? <View style={styles.itemsnav}>
                    <KeyboardAvoidingView behavior='padding'>
                        <TouchableOpacity style={[styles.item, styles.margin]} onPress={() => { 
                            SellItem(props.item, sellCost, context.login, () => {props.setViewItem(false)});
                        }}>
                            <TextInput
                                style={styles.input}
                                onChangeText={setsellCost}
                                value={sellCost}
                                placeholder="Цена"
                                placeholderTextColor="rgba(255,255,255,0.7)"
                            />
                            <Text style={styles.inputText}>Продать</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                    <TouchableOpacity style={[styles.item, styles.margin]} onPress={() => {
                        SendItem(props.item, tradeLogin, context.login, () => {props.setViewItem(false)})
                    }}>
                        <TextInput
                            style={styles.input}
                            onChangeText={settradeLogin}
                            value={tradeLogin}
                            placeholder="Логин"
                            placeholderTextColor="rgba(255,255,255,0.7)"
                        />
                        <Text style={styles.inputText}>Подарить</Text>
                    </TouchableOpacity>
                </View> 
                : null}
            </View>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    body:{
        width: "100%",
        justifyContent: "space-between",
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
        fontSize: 30,
        marginTop: 12,
        color: "white"
    },
    image: {
        marginVertical: 20,
        width: "100%",
        height: 230,
        resizeMode: "contain"
    },
    description: {
        color: "white",
        fontSize: 20
    },
    row: {
        flexDirection: "row"
    }
  });