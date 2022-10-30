import { StyleSheet, View, Image, Text, TouchableHighlight, KeyboardAvoidingView } from 'react-native';
import { BlurView } from 'expo-blur';
import { baseUrl } from '../baseUrl';
import { TouchableOpacity } from 'react-native-gesture-handler';
const nau = "../assets/naucoins.png";

export const MarketCards = (props) => {
    let item = props.item;
    let name = item.title;
    return (
        <TouchableOpacity onPress={() => {props.onPress()}}>
            <View style={styles.cardWrapper}>
                <Image style={styles.image} source={{uri: `${baseUrl}/get_image?name=${item.id}`}} />
                <View style={styles.contentWrapper}>
                    <Text style={styles.name}>
                        {name}
                    </Text>
                    <Text style={styles.descText}>
                        Подробнее
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    cardWrapper: {
        flexDirection: "row",
        paddingHorizontal: 15,
        marginTop: 30,
        justifyContent: "center"
    },
    image: {
        
        width: 100,
        resizeMode: "contain",
        height: 100,
        flexShrink: 0,
        alignSelf: "center"
    },
    coins: {
        resizeMode: "contain",
        width: 20,
        height: 20,
        alignSelf: "flex-start",
        justifyContent: "center",
        marginLeft: 10
    },
    number: {
        fontSize: 30,
        marginRight: 15,
        color: "white",
        alignSelf: "center",
        justifyContent: "center"
    },
    name: {
        color: "white",
        fontSize: 30
    },
    contentWrapper: {
        paddingHorizontal: 10,
        width: "62%",
        paddingVertical: 10,
        justifyContent: "space-between"
    },
    author: {
        color: "white",
        opacity: "0.7"
    },
    price: {
        color: "white",
        alignSelf: "center"
    },
    priceWrapper: {
        flexDirection: "row"
    },
    desc: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    descText: {
        color: "white",
        opacity: "0.7"
    }
});

MarketCards.defaultProps = {
    name: 'Name',
    author: 'Author',
    coins: 9999,
    key: 1
};