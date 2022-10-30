import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native"

import { FlatList } from "react-native-gesture-handler";
import { baseUrl } from "../baseUrl";
import { MarketCards } from "../components/InventoryCard";
import { SelectedInventoryItem } from "./SelectedInventoryItem";
import React from "react";
import { useContext } from "react";
import { Context } from "../Context";
import axios from "axios";

export class Inventory extends React.Component{

    componentDidMount(){
        
        if(this.props.login !== undefined){
            axios.get(`${baseUrl}/get_items?login=${this.props.login}`)
            .then((res) => { this.setState({data : res.data}); this.render(); });
        }
        
    }

    render(){
        return (
            <View>
            {this.props.viewItem ? <SelectedInventoryItem navigation={this.props.navigation} owned={this.props.owned} item={this.props.selectedItem} setViewItem={this.props.setViewItem}/>  
            :
            <View style={styles.inventory}>
                <FlatList
                data={this?.state?.data ? this?.state?.data : []}
                renderItem={({item}) => <MarketCards item={item} onPress={() => {this.props.selectItem(item); this.props.setViewItem(true)}} />}
                />
            </View>
        }
        </View>
        )
    }
}

// export const Inventory = (props) => {
//     return (
//         <View>
//             {props.viewItem ? <SelectedInventoryItem owned={props.owned} updateInventory={props.updateInventory} item={props.selectedItem} setViewItem={props.setViewItem}/>  
//             :
//             <View style={styles.inventory}>
//                 <FlatList
//                 data={props.items}
//                 renderItem={({item}) => <MarketCards item={item} onPress={() => {props.selectItem(item); props.setViewItem(true)}} />}
//                 />
//             </View>
//         }
//         </View>
//     )
// }

const styles = StyleSheet.create({
});