import { useState} from 'react';
import { StyleSheet, View, ScrollView, Image, Text, TouchableHighlight, KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { NavBar } from '../components/NavBar';
import { TopBar } from '../components/TopBar';

const plus = '../assets/plus.png';

export const Market = ({name}) => {
    return (
        <View style={styles.container}>
            <TopBar />
            <NavBar />
            <ScrollView style={styles.items}>
                <Text>Маркет</Text>
            </ScrollView>
        </View>
    );
};
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: "#492675",
        position: 'relative'
    },
    items: {
        width: "100%",
        height: "100%",
        paddingTop: 120
    },
    image: {
        height: 1000,
        color: "white",
        fontSize: 400
    }
});