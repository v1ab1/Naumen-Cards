import { View , Text, Image} from "react-native"
import { StyleSheet } from "react-native";
import { baseUrl } from "../baseUrl";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Inventory } from "../screens/Inventory";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export const SelectedProfile = ({selectedProfile, setisViewUserProfile}) => {
    const arrow = "../assets/arrow.png";
    const [inventoryItems , setInventoryItems] = useState([
        {title:"not connect to server"}
    ])
    const [viewItem, setViewItem] = useState(false)
    const [selectedItem, setselectedItem] = useState();

    useEffect(() => {
        axios.get(`${baseUrl}/get_items?login=${selectedProfile}`)
            .then((res) => setInventoryItems(res.data));
    }, [])



    return (
        <View>
            <TouchableOpacity style={styles.backWrapper} onPress={() => {setisViewUserProfile(false)}}>
                <Image style={styles.arrow} source={require(arrow)} /> 
                <Text style={styles.arrowText}>Назад</Text>
            </TouchableOpacity>
            <Image style={styles.image} source={{uri: `${baseUrl}/get_image?name=${selectedProfile}`}} />
            <Text style={styles.text}>
                {selectedProfile}
            </Text>
            <Inventory login={selectedProfile} items={inventoryItems} selectedItem={selectedItem} selectItem={setselectedItem} viewItem={viewItem} setViewItem={setViewItem}/>
        </View>
    )
}

const styles = StyleSheet.create({
    cardWrapper: {
        flexDirection: "row",
        paddingHorizontal: 15,
        justifyContent: "flex-start",
        width: "80%",
        marginBottom: "5%",
        
    },
    image: {
        width: 80,
        resizeMode: "contain",
        height: 80,
        borderRadius: "50%",
        marginRight: 20,
        alignSelf: "center"
    },
    text: {
        color: "white",
        fontSize: 24,
        alignSelf: "center",
        marginTop: "2%",
        marginLeft: "-5%"
    },
    backWrapper: {
        flexDirection: "row",
        alignItems: "center"
    },
    arrow: {
        resizeMode: "contain",
        width: 25,
        height: 25,
        marginRight: 10
    },
    arrowText: {
        color: "white",
        alignSelf: "center",
        fontSize: 20
    },
});