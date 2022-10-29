import { StyleSheet, View, Image, Text, TouchableHighlight, KeyboardAvoidingView } from 'react-native';
import { BlurView } from 'expo-blur';

const nau = "../assets/naucoins.png";

export const MarketCards = ({name, author, coins}) => {
    return (
        <View style={styles.cardWrapper}>
            <Image style={styles.image} source={require(nau)} />
            <View style={styles.contentWrapper}>
                <View>
                    <Text style={styles.name}>
                        {name}
                    </Text>
                    <Text style={styles.author}>
                        {author}
                    </Text>
                </View>
                <View style={styles.desc}>
                    <View style={styles.priceWrapper}>
                        <Text style={styles.price}>
                            {coins}
                        </Text>
                        <Image style={styles.coins} source={require(nau)} />
                    </View>
                    <View>
                        <Text style={styles.descText}>
                            Подробнее
                        </Text>
                    </View>
                </View>
            </View>
        </View>
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