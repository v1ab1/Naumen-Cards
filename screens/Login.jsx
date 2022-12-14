import { useState} from 'react';
import { StyleSheet, View, ImageBackground, Text, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { useContext } from "react";
import { Context } from '../Context';
import axios from 'axios';
import { baseUrl } from '../baseUrl';
import { BlurView } from 'expo-blur';
import * as ImagePicker from 'expo-image-picker'

const background = '../assets/login-background.png';

import { UpdateCoins } from '../components/TopBar';
import { UpdateCoinsCallback } from '../components/TopBar';


export const Login = (props) => {
    console.log(props.setIsLogin);
    //props.setIsLogin(true);
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [context, setContext] = useContext(Context);
    const [alreadyHasAccount, setAlreadyHasAccount] = useState(true);

    let LoginRequest = (login, password, callBack) => {
      let resp = axios.get(`${baseUrl}/login?login=${login}&password=${password}`)
      .then((resp)=>{
        if(resp.data === 200){
          context.login = login;
          props.setLogin(login);
          context.coints = 0;
          context.isLogin = true;
          setContext(context);
          UpdateCoins(context, setContext);
          UpdateCoinsCallback(login, props.setCoins);
          callBack();
          props.setIsLogin(true);
        }
      })
    }

    const RegistrateRequest = (login, password, callback) => {
      const createFormData = (photo) => {
        const data = new FormData();
      
        data.append('file', {
          name: photo.fileName,
          type: photo.type,
          uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
        });
        return data;
      };
      const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
        if (!result.cancelled) {
          
          axios.post(`${baseUrl}/register?login=${login}&password=${password}`, createFormData(result))
          .then(() => {callback()});
        }
      };
      pickImage();
    }


    return (
      <View style={styles.container}>
        <ImageBackground source={require(background)} resizeMode="cover" style={styles.image}>
          <View>
              <Text style={styles.text}>?????????? ????????????????????</Text>
          </View>
          <View behavior='padding' style={styles.loginWrapper}>
            <BlurView intensity={20} style={styles.blur}>
              <KeyboardAvoidingView behavior='padding'>
                <TextInput
                    style={styles.input}
                    onChangeText={setEmail}
                    value={email}
                    placeholder="??????????"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                />
                <TextInput 
                    secureTextEntry={true}
                    style={styles.input}
                    onChangeText={setPass}
                    value={pass}
                    placeholder="????????????"
                    placeholderTextColor="rgba(255,255,255,0.6)"
                />


                {alreadyHasAccount ? 
                <View>
                  <TouchableOpacity style={styles.button} underlayColor="white" onPress={() => {
                    LoginRequest(email, pass, () => { props.navigation.navigate("Profile")});
                  }} >
                      <Text style={styles.buttonText}  >
                          ???????????????????? ?? ?????? NFT
                      </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {setAlreadyHasAccount(false)}}>
                    <Text style={styles.question}>?? ???????? ?????? ?????? ????????????????...</Text>
                  </TouchableOpacity>
                </View>
                : 
                <View>
                  <TouchableOpacity style={styles.button} underlayColor="white" onPress={() => {
                    RegistrateRequest(email, pass, () => {LoginRequest(email, pass, () => { props.navigation.navigate("Profile")})});
                  }} >
                      <Text style={styles.buttonText} >
                          ??????????????????????
                      </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => {setAlreadyHasAccount(true)}}>
                    <Text style={styles.question}>?? ???????? ?????? ???????? ??????????????...</Text>
                  </TouchableOpacity>
                </View> }
              </KeyboardAvoidingView>
            </BlurView>
          </View>
        </ImageBackground>
      </View>
    );
};
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: '100%',
      width: '100%',
      marginTop: "-10%"
    },
    image: {
      height: "100%",
      width: "100%",
      justifyContent: "space-between"
    },
    text: {
      fontSize: 28,
      lineHeight: 84,
      fontWeight: "bold",
      textAlign: "center",
      color: "white",
      paddingTop: 140
    },
    button: {
        backgroundColor: "rgba(151, 169, 246, 1)",
        color: "white",
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderRadius: 30,
        fontSize: 15,
        marginBottom: 0,
        marginTop: 20,
        alignSelf: "center"
    },
    buttonText: {
        color: "white",
        letterSpacing: 0,
        fontSize: 12,
        lineHeight: 20,
        fontWeight: "bold"
    },
    input: {
        width: 300,
        height: 60,
        color: "white",
        fontSize: 30,
        letterSpacing: 0.32,
        borderWidth: 1,
        borderRadius: 30,
        borderColor: 'white',
        paddingHorizontal: 20,
        paddingVertical: 0,
        marginVertical: 10
    },
    loginWrapper: {
        BackgroundBlendMode: "overlay",
        backdropFilter: "blur",
        marginBottom: 220,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 40,
        backgroundColor: "rgba(33, 17, 52, 0.4)",
        overflow: "hidden",
        width: "90%",
        height: "35%"
    },
    loginBackground: {
      height: "100%",
      width: "100%"
    },
    blur: {
      padding: 30,
      width: "100%",
      alignItems: 'center',
      alignSelf: 'center',
      height: "100%"
    },
    question: {
      color: "rgba(255,255,255,0.7)",
      marginVertical: 20,
      alignSelf: "center"
    }
  });