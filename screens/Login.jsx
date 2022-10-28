import { useState} from 'react';
import { StyleSheet, View, ImageBackground, Text, TouchableHighlight, KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

const background = '../assets/login-background.png';

export const Login = () => {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    return (
        <View style={styles.container}>
        <ImageBackground source={require(background)} resizeMode="cover" style={styles.image}>
          <View>
              <Text style={styles.text}>Добро пожаловать</Text>
          </View>
          <KeyboardAvoidingView behavior='padding' style={styles.loginWrapper}>
              <TextInput
                  style={styles.input}
                  onChangeText={setEmail}
                  value={email}
                  placeholder="Email"
                  placeholderTextColor="white"
              />
              <TextInput 
                  style={styles.input}
                  onChangeText={setPass}
                  value={pass}
                  placeholder="Password"
                  placeholderTextColor="white"
              />
              <TouchableHighlight style={styles.button} underlayColor="white">
                  <Text style={styles.buttonText}>
                      Погрузимся в мир NFT
                  </Text>
              </TouchableHighlight>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    );
};
  
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
      fontSize: 28,
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
        marginBottom: 40,
        marginHorizontal: 68,
        marginTop: 20
    },
    buttonText: {
        color: "white",
        letterSpacing: -0.36,
        fontSize: 16,
        lineHeight: 20,
        fontWeight: "bold"
    },
    input: {
        width: 300,
        height: 70,
        color: "white",
        fontSize: 30,
        letterSpacing: 0.32,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 0,
        marginVertical: 20
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