import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native"

import { FlatList } from "react-native-gesture-handler";
import { baseUrl } from "../baseUrl";
import { MarketCards } from '../components/MarketCards';



  

export const Inventory = (props) => {
 
      
    
    return (
        <View style={styles.inventory}>
             <FlatList
        data={props.items}
        renderItem={
            ({item}) => {
                return (
                    <TouchableOpacity onPress={() => {props.selectItem(item); props.setViewItem(true)}}>
                        <View style={styles.item} >
                            <Image style={styles.itemimg} source={{uri: `${baseUrl}/get_image?name=${item.id}`}} />
                            <Text >{item.title} </Text> 
                            <Text >{item.description} </Text>
                        </View>
                    </TouchableOpacity>
                    
                )
            }
        }
        />
        </View>
    )
}

const styles = StyleSheet.create({
});