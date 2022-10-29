import { useState } from "react";
import { View, Text, TextInput,TouchableOpacity, Button,Image } from "react-native";
import { NavBar } from '../components/NavBar';
import { TopBar } from '../components/TopBar';
import { StyleSheet } from "react-native";
import axios from "axios";
import { baseUrl } from "../baseUrl";

import * as ImagePicker from 'expo-image-picker'

let RegistrateItem = (item, login, photo) => {
    
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
    
    axios.post(`${baseUrl}/upload_item?login=${login}&name=${item.name}&description=${item.description}`, data);
}





export function AddingItem(props) {
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

    return (
        <View style={styles.body}>
            <TopBar />
            <View style={styles.content}>
                <Text>Registrate item</Text>
                <Button title="Pick an image from camera roll" onPress={pickImage} />
                {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
                <TextInput
                    onChangeText={setitemName}
                    value={itemName}
                    placeholder="Name"
                    placeholderTextColor="white"
                />
                <TextInput
                    onChangeText={setitemDescription}
                    value={itemDescription}
                    placeholder="description"
                    placeholderTextColor="white"
                />
                <TouchableOpacity onPress={() => {
                    RegistrateItem({
                        name: itemName,
                        description: itemDescription
                    }, "stirk", image);
                }}>
                    <Text>Add Item</Text>
                </TouchableOpacity>
                
            </View>
            <NavBar navigation={props.navigation}/>
        </View>
      );
}

const styles = StyleSheet.create({
    body:{
        width: "100%",
        height: "100%",
        backgroundColor: "#67237F",
        
    },
    content:{
        paddingTop: 150,
        marginHorizontal: 20
        
    }
  });