import { useState } from "react";
import { View, Text, TextInput,TouchableOpacity, Button, Image, KeyboardAvoidingView, ImageBackground } from "react-native";
import { NavBar } from '../components/NavBar';
import { StyleSheet } from "react-native";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import { BlurView } from 'expo-blur';
import { Context } from "../Context";
import { useContext } from "react";
import * as ImagePicker from 'expo-image-picker'


let RegistrateItem = (item, login, photo, callBack) => {
    
    const createFormData = (photo) => {
        const data = new FormData();
      
        data.append('file', {
          name: photo.fileName,
          type: photo.type,
          uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
        });
        return data;
      };
    data = createFormData(photo)
    
    axios.post(`${baseUrl}/upload_item?login=${login}&name=${item.name}&description=${item.description}`, data)
    .then((res) => {
        if(callBack)
        callBack();
    })
}

const background = '../assets/5.png';



export function AddingItem(props) {
    const [context, setContext] = useContext(Context);
    const [image, setImage] = useState(null);
    const [itemName, setitemName] = useState();
    const [itemPrice, setitemPrice] = useState();
    const [itemDescription, setitemDescription] = useState();

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        
    
        if (!result.cancelled) {
          setImage(result);
        }
      };

    const a = 2;

    return (
        <ImageBackground source={require(background)} style={styles.body}>
            <View style={styles.content}>
                <Text style={styles.header}>Загрузка своего NFT</Text>
                <View style={styles.rounded}>
                    <BlurView intensity={40} style={styles.blurWrap}>
                        <View>
                            <View style={styles.view}>
                                <BlurView intensity={60} style={styles.blur}>
                                    <TextInput
                                    onChangeText={setitemName}
                                    value={itemName}
                                    placeholder="Название..."
                                    placeholderTextColor="rgba(255,255,255,0.75)"
                                    style={styles.input}
                                    />
                                </BlurView>
                            </View>
                            <View style={styles.view}>
                                <BlurView intensity={60} style={styles.blur}>
                                    <TextInput
                                    onChangeText={setitemDescription}
                                    value={itemDescription}
                                    placeholder="Описание..."
                                    placeholderTextColor="rgba(255,255,255,0.75)"
                                    style={styles.input}
                                    />
                                </BlurView>
                            </View>
                            {image && <Image source={{ uri: image.uri }} style={styles.image} />}
                        </View>
                        <View style={styles.pickerView}>
                            <BlurView intensity={70} style={styles.pickerBlur}>
                                <TouchableOpacity style={styles.pickButton} onPress={pickImage}>
                                    <Text style={styles.pickText}>
                                        Выбрать картинку
                                    </Text>
                                </TouchableOpacity>
                            </BlurView>
                        </View>
                    </BlurView>
                </View>
                <View style={[styles.rounded, styles.fix]}>
                    <BlurView intensity={60} style={styles.pickerBlur}>
                        <TouchableOpacity style={styles.pickButton} onPress={() => {
                            RegistrateItem({
                                name: itemName,
                                description: itemDescription
                            }, context.login, image, () => {props.navigation.navigate("Profile")});
                            }}>
                            <Text style={[styles.pickText, styles.fixText]}>Опубликовать</Text>
                        </TouchableOpacity>
                    </BlurView>
                </View>
            </View>
            <NavBar a={a} navigation={props.navigation}/>
        </ImageBackground>
      );
}

const styles = StyleSheet.create({
    body:{
        width: "100%",
        height: "100%",
        backgroundColor: "#492675",
        
    },
    content:{
        paddingTop: "30%",
        marginHorizontal: 20
    },
    header: {
        color: "white",
        fontSize: 32
    },
    image: {
        width: 280,
        height: 280,
        resizeMode: "contain",
        marginVertical: 15,
        alignSelf: "center"
    },
    rounded: {
        marginTop: 15,
        borderRadius: 40,
        overflow: "hidden",
        height: "72%"
    },
    blurWrap: {
        height: "100%",
        paddingVertical: "5%",
        paddingHorizontal: "4%",
        justifyContent: "space-between"
    },
    pickText: {
        color: "white",
        alignSelf: "center",
        fontSize: 24,
        height: "100%",
        paddingVertical: "3%"
    },
    pickerView: {
        overflow: "hidden",
        borderRadius: 40,
        width: "70%",
        height: "10%",
        alignSelf: "center"
    },
    pickerBlur: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center"
    },
    fix: {
        height: "8%",
        width: "60%",
        alignSelf: "center"
    },
    fixText: {
        paddingVertical: "5%"
    },
    view: {
        overflow: "hidden",
        borderRadius: 40,
        height: 40,
        width: "100%",
        paddingVertical: 0,
        marginVertical: 7
    },
    blur: {
        height: "100%"
    },
    input: {
        height: "100%",
        paddingHorizontal: 10,
        fontSize: 18,
        color: "white"
    }
  });