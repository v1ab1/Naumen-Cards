import { useState} from 'react';
import { StyleSheet, View, ImageBackground, Text, TouchableHighlight } from 'react-native';

const background = '../assets/login-background.png';

export const Login = () => (
    <View style={styles.container}>
      <ImageBackground source={require(background)} resizeMode="cover" style={styles.image}>
        <View>
            <Text style={styles.text}>Добро пожаловать</Text>
        </View>
        <View style={styles.loginWrapper}>
            <TouchableHighlight style={styles.button} underlayColor="white">
                <Text style={styles.buttonText}>
                    Погрузимся в мир NFT
                </Text>
            </TouchableHighlight>
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
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 30,
        fontSize: 15,
        marginVertical: 40,
        marginHorizontal: 68,
    },
    buttonText: {
        color: "white",
        letterSpacing: -0.36,
        fontWeight: 600,
        fontSize: 16,
        lineHeight: 20
    },
    loginWrapper: {
        backgroundColor: "rgba(89, 70, 119, 1)",
        BackgroundBlendMode: "overlay",
        backdropFilter: "blur",
        marginVertical: 150,
        alignItems: 'center',
        alignSelf: 'center'
    }
  });