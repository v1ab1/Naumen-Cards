import { StyleSheet, View, Image, Text, TouchableHighlight, KeyboardAvoidingView } from 'react-native';
import { BlurView } from 'expo-blur';
import { Context } from '../Context';
import { useContext } from 'react';
import { baseUrl } from '../baseUrl';

const nau = "../assets/naucoins.png";

import axios from 'axios';
export const UpdateCoins = (context, setContext) => {
    
    axios.get(`${baseUrl}/get_coins?login=${context.login}`).
    then((resp) => {
        context.coins = resp.data;
        setContext(context);
    })
}

export const UpdateCoinsCallback = (login, setContext) => {
    axios.get(`${baseUrl}/get_coins?login=${login}`).
    then((resp) => {
        setContext(resp.data);
    })
}

export const TopBar = ({avatar, name, coins, isLogin}) => {
    const [context, setContext] = useContext(Context);
    console.log(isLogin === true, "islogin");
    return (
        <BlurView style={styles.topbarWrapper}>
            {isLogin ? <View>
                <View>
                <Text style={styles.text}>{name}</Text>
                <Image source={avatar} />
            </View>
            <View style={styles.wrap}>
                <Text style={styles.text}>{coins}</Text>
                <Image style={styles.coin} source={require(nau)} />
            </View>
            </View> : null}
             
        </BlurView>
    
    );
};

const styles = StyleSheet.create({
    topbarWrapper: {
        position: "absolute",
        paddingTop: "15%",
        width: "100%",
        paddingHorizontal: 30,
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 20,
        zIndex: 100
    },
    text: {
        fontSize: 20,
        color: "white",
        marginRight: 8,
        alignSelf: "center"
    },
    coin: {
        width: 25,
        resizeMode: "contain",
        height: 25,
        alignSelf: "center"
    },
    wrap: {
        flexDirection: "row"
    }
});

TopBar.defaultProps = {
    avatar: '../assets/icon.png',
    name: 'User',
    coins: 9999
};