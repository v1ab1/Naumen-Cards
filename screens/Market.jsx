import { useState} from 'react';
import { StyleSheet, View, ImageBackground, Text, TouchableHighlight, KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { NavBar } from '../components/NavBar';
import { TopBar } from '../components/TopBar';

export const Market = ({name}) => {
    return (
        <View style={styles.container}>
            <TopBar />
            <NavBar />
        </View>
    );
};
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: "#492675"
    }
});

Market.defaultProps = {
    name: 'User'
};