import { View, Text } from "react-native"

export const SubscribeItem = ({item}) => {
    return (
        <View>
            <Text style={styles.subItem}>{item}</Text>
        </View>
    )
} 
const styles = {
    subItem: {
        color: "#ffffff",
    }
}