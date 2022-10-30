import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native"

import { FlatList } from "react-native-gesture-handler";
import { baseUrl } from "../baseUrl";
import { MarketCards } from "../components/InventoryCard";



  

export const Inventory = (props) => {
 
    return (
        <View style={styles.inventory}>
             <FlatList
        data={props.items}
        renderItem={MarketCards}
        onPress={() => {props.selectItem(item); props.setViewItem(true)}}
        />
        </View>
    )
}

const styles = StyleSheet.create({
});