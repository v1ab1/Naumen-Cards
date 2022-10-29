import { StyleSheet, View, Image, Text, TouchableHighlight, KeyboardAvoidingView, TouchableOpacity } from 'react-native';
import { BlurView } from 'expo-blur';
import { NavigationContainer } from '@react-navigation/native';

const profile = '../assets/profile.png';
const market = '../assets/market.png';
const plus = '../assets/plus.png';

export const NavBar = (props) => {
    return (
        <View style={styles.br}>
            <BlurView style={styles.navbarWrapper}>
                <TouchableOpacity onPress={() => {
                    props.navigation.navigate("Profile")
                }}>
                    <View style={styles.imageWrapper}>
                        <Image style={styles.image} source={require(profile)} />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    props.navigation.navigate("AddingItem")
                    }}>
                    <View style={styles.imageWrapper}>
                        <Image style={styles.plus} source={require(plus)} />
                    </View>
                </TouchableOpacity>
                <View style={styles.imageWrapper}>
                    <Image style={styles.image} source={require(market)} />
                </View>
            </BlurView>
        </View>
    );
};

const styles = StyleSheet.create({
    br: {
        flex: 1,
        position: "absolute",
        top: "85%",
        width: '100%',
        height: 110,
        overflow: "hidden",
        borderRadius: "50%",
        zIndex: 100
    },
    navbarWrapper: {
        flexDirection: "row",
        justifyContent: "space-around"
    },
    imageWrapper: {
        marginTop: 10,
        marginBottom: 10,
        borderRadius: "50%",
        height: 90,
        width: 90,
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: 80,
        resizeMode: "contain",
        opacity: "0.5"
    },
    plus: {
        width: 100,
        resizeMode: "contain"
    }
});