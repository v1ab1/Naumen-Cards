import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native"

import { FlatList } from "react-native-gesture-handler";
import { baseUrl } from "../baseUrl";
import { MarketCards } from "../components/InventoryCard";
import { SelectedInventoryItem } from "./SelectedInventoryItem";


  

export const Inventory = (props) => {
    console.log(props.updateInventory);
    
    return (
        <View>
            {props.viewItem ? <SelectedInventoryItem owned={props.owned} updateInventory={props.updateInventory} item={props.selectedItem} setViewItem={props.setViewItem}/>  
            :
            <View style={styles.inventory}>
                <FlatList
                data={props.items}
                renderItem={({item}) => <MarketCards item={item} onPress={() => {props.selectItem(item); props.setViewItem(true)}} />}
                />
            </View>
        }
        </View>
    )
}

const styles = StyleSheet.create({
});