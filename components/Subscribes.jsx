import { View,Text,TouchableOpacity } from "react-native";
import { useContext, useState } from "react";
import { Context } from "../Context";
import { SubscribeItem } from "./SubscribeItem";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { Follower } from "./Follower";
import axios from "axios";
import { baseUrl } from "../baseUrl";
export const Subscribes = (props) => {
    const [context, setContext] = useContext(Context);
    const [login, setLogin] = useState("");


    let Subscribe = (from, to, callBack) => {
        axios.post(`${baseUrl}/add_friend?login=${from}&friend=${to}`)
        .then(() => {});
    }

    return (
        <View>
            <FlatList
        data={props.subscribes}
        renderItem={Follower}
        />
        <View>
        <TextInput
            onChangeText={setLogin}
            value={login}
            placeholder="логин"
            
            
            />
        <TouchableOpacity onPress={() => {Subscribe(context.login, login)}}>
            <Text>Подписаться</Text>
        </TouchableOpacity>
        </View>
        </View>
    )
}