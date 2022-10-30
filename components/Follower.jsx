import { StyleSheet, View, Image, Text, TouchableHighlight, KeyboardAvoidingView } from 'react-native';
import { BlurView } from 'expo-blur';
import { baseUrl } from '../baseUrl';
import { TouchableOpacity } from 'react-native-gesture-handler';
const nau = "../assets/naucoins.png";

export const Follower = ({item, setisViewUserProfile, setSelectedProfile}) => {
    return (
        <TouchableOpacity onPress={() => {setSelectedProfile(item); setisViewUserProfile(true)}}>
            <View style={styles.cardWrapper}>
                <Image style={styles.image} source={{uri: `${baseUrl}/get_image?name=${item}`}} />
                <Text style={styles.text}>
                    {item}
                </Text>
            </View>
        </TouchableOpacity>
        
    );
};

const styles = StyleSheet.create({
    cardWrapper: {
        flexDirection: "row",
        paddingHorizontal: 15,
        justifyContent: "flex-start",
        width: "80%",
        marginVertical: "3%"
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