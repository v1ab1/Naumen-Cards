import { StyleSheet, View, Image, Text, TouchableHighlight, KeyboardAvoidingView } from 'react-native';
import { BlurView } from 'expo-blur';

const nau = "../assets/naucoins.png";

export const TopBar = ({name, author, coins, key}) => {
    return (
        <View style={styles.cardWrapper}>
            <View>
                <Text>{key}</Text>
                <Image src={require(nau)} />
                <View>
                    <Text>
                        
                    </Text>
                </View>
            </View>
            <View>

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardWrapper: {
        flexDirection: "row"
    }
});

TopBar.defaultProps = {
    name: 'User',
    author: 'Author',
    coins: 9999,
    key: 1
};