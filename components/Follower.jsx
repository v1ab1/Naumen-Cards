import { StyleSheet, View, Image, Text, TouchableHighlight, KeyboardAvoidingView } from 'react-native';
import { BlurView } from 'expo-blur';

const nau = "../assets/naucoins.png";

export const Follower = ({item}) => {
    return (
        <View style={styles.cardWrapper}>
            <Image style={styles.image} source={(nau)} />
            <Text style={styles.text}>
                {item}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    cardWrapper: {
        flexDirection: "row",
        paddingHorizontal: 15,
        justifyContent: "flex-start",
        width: "80%",
        marginBottom: "5%",
        
    },
    image: {
        width: 80,
        resizeMode: "contain",
        height: 80,
        borderRadius: "50%",
        marginRight: 20
    },
    text: {
        color: "white",
        fontSize: 24,
        alignSelf: "center"
    }
});

Follower.defaultProps = {
    name: 'Nameeeeeeeeeeeeeeeeee'
};