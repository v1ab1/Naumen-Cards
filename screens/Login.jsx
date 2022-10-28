import { useState} from 'react';
import { StyleSheet, View, ImageBackground, Text, Button } from 'react-native';

const background = '../assets/login-background.png';

export const Login = () => (
    <View style={styles.container}>
      <ImageBackground source={require(background)} resizeMode="cover" style={styles.image}>
        <View>
            <Text style={styles.text}>Welcome</Text>
        </View>
        <View style={styles.loginWrapper}>
            <Button style={styles.button} title="Welcome to NFT World" />
        </View>
      </ImageBackground>
    </View>
  );
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      width: '100%'
    },
    image: {
      flex: 1,
      justifyContent: "space-between"
    },
    text: {
      fontSize: 42,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
      color: "white",
      marginTop: 65
    },
    button: {
        backgroundColor: "rgba(151, 169, 246, 1)",
        color: "white",
        padding: "15px 30px",
        gap: "10px",
        borderRadius: "30px",
        fontSize: 15
    },
    loginWrapper: {
        backgroundColor: "rgba(89, 70, 119, 1)",
        BackgroundBlendMode: "overlay",
        backdropFilter: "blur"
    }
  });