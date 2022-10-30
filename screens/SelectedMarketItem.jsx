import { StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { BlurView } from 'expo-blur';
import { baseUrl } from "../baseUrl";
import axios from "axios";


export const SelectedMarketItem = (props) => {
    const arrow = "../assets/arrow.png";
    const coins = "../assets/naucoins.png";

    let item = props.selectedItem;

    const buyItem = (item) => {
        axios.post(`${baseUrl}/buy_item?login=${item.owner}&id=${item.id}`, {})
        .then(() => {});
    };

    return (
        <View style={styles.body}>
            <TouchableOpacity style={styles.backWrapper} onPress={() => {props.setIsItemSelected(false)}}>
                <Image style={styles.arrow} source={require(arrow)} />
                <Text style={styles.arrowText}>Назад</Text>
            </TouchableOpacity>
            <Text style={styles.name}>{item.title}</Text>
            <Text style={styles.author}>{item.owner}</Text>
            <Image style={styles.image} source={{uri: `${baseUrl}/get_image?name=${item.id}`}} />
            <Text style={styles.description}>{item.description}</Text>
            <View style={styles.itemsnav}>
                <View style={styles.buttonTextWrap}>
                    <Text style={styles.buttonText}>
                        Купить:
                    </Text>
                </View>
                <TouchableOpacity style={styles.price} onPress={() => {buyItem(item)}}>
                    <View style={styles.rounded}>
                        <BlurView style={styles.buttonBlur}>      
                            <Text style={styles.number}>{item.price}</Text>
                            <Image style={styles.coins} source={require(coins)} />
                        </BlurView>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    body:{
        width: "100%",
        margin: 20,
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
    arrowText: {
        color: "white",
        alignSelf: "center",
        fontSize: 20
    },
    name: {
        fontSize: 34,
        color: "white",
        marginVertical: 5
    },
    image: {
        marginVertical: 20,
        width: "100%",
        height: 250,
        resizeMode: "contain",
        alignSelf: "center"
    },
    description: {
        color: "white",
        fontSize: 26
    },
    author: {
        color: "rgba(255,255,255,0.7)",
        fontSize: 20
    },
    itemsnav: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: "5%",
        width: "90%"
    },
    coins: {
        width: 20,
        height: 20,
        alignSelf: "center",
        marginLeft: 10
    },
    rounded: {
        overflow: "hidden",
        borderRadius: 40,
        flexDirection: "row",
        borderWidth: 1,
        borderColor: "white",
        width: "60%",
        height: 40,
        alignSelf: "flex-end"
    },
    number: {
        color: "white",
        paddingHorizontal: 10,
        alignSelf: "center"
    },
    buttonText: {
        color: "white",
        fontSize: 22
    },
    buttonBlur: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "center"
    },
    buttonTextWrap: {
        alignSelf: "center"
    }
  });