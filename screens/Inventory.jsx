import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native"

import { FlatList } from "react-native-gesture-handler";
import { baseUrl } from "../baseUrl";



  

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

const styles = StyleSheet.create(
    {
        inventory:{
            backgroundColor:"#FF9F40",
            height: "95%",
            width: "95%",
            opacity: 0.6
        },
        item:{
            marginTop: 5,
            marginHorizontal: 10,
            flexWrap: 'wrap', 
            alignItems: 'flex-start',
            flexDirection:'row',
        },
        itemimg:{
            width: 50,
            height: 50,
            marginEnd: 5
        },
        
    }
)