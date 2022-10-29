import { View,Text } from "react-native";
import { useContext } from "react";
import { Context } from "../Context";
import { SubscribeItem } from "./SubscribeItem";
import { FlatList } from "react-native-gesture-handler";
import { Follower } from "./Follower";

export const Subscribes = (props) => {
    const [context, setContext] = useContext(Context);

    return (
        <View>
            <FlatList
        data={props.subscribes}
        renderItem={SubscribeItem}
        />
        </View>
    )
}