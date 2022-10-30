import { View,Text,TouchableOpacity } from "react-native";
import { useContext, useState } from "react";
import { Context } from "../Context";
import { SubscribeItem } from "./SubscribeItem";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { Follower } from "./Follower";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import { SelectedProfile } from "./SelectedProfile";
export const Subscribes = (props) => {
    const [context, setContext] = useContext(Context);
    const [login, setLogin] = useState("");

    const [isViewUserProfile, setisViewUserProfile] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState();


    let Subscribe = (from, to, callBack) => {
        axios.post(`${baseUrl}/add_friend?login=${from}&friend=${to}`)
        .then(() => {});
    }

    return (
        <View>
            {isViewUserProfile ? <SelectedProfile setisViewUserProfile={setisViewUserProfile} selectedProfile={selectedProfile}/> 
            :
        <View>
        <FlatList
        data={props.subscribes}
        renderItem={({item}) => <Follower setisViewUserProfile={setisViewUserProfile} setSelectedProfile={setSelectedProfile}  item={item}/>}
        />
        <TextInput
            onChangeText={setLogin}
            value={login}
            placeholder="логин"
            />
        <TouchableOpacity onPress={() => {Subscribe(context.login, login)}}>
            <Text>Подписаться</Text>
        </TouchableOpacity>
        </View>}
        </View>
    )
}