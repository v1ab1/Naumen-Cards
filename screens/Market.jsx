import React, { useState} from 'react';
import { StyleSheet, View, ScrollView, Image, Text, TouchableHighlight, KeyboardAvoidingView, ImageBackground } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { NavBar } from '../components/NavBar';
import { MarketCards } from '../components/MarketCards';
import { BlurView } from 'expo-blur';
import { FlatList } from 'react-native-gesture-handler';
const plus = '../assets/plus.png';
import axios from 'axios';
import { useEffect } from 'react';
import { baseUrl } from '../baseUrl';
import { SelectedMarketItem } from './SelectedMarketItem';


// ({name, navigation}) =>

export const Market = (props) => {
    const [isItemSelected, setIsItemSelected] = useState(false);
    const [selectedItem, setselectedItem] = useState();

    return (<MarketClass isItemSelected={isItemSelected} {...props} setIsItemSelected={setIsItemSelected} selectedItem={selectedItem} setselectedItem={setselectedItem}/>);
} 

export class MarketClass extends React.Component  {


    componentDidMount(){
        axios.get(`${baseUrl}/get_market`)
            .then((res) => this.setState({items : res.data}));
    };

    render() {
        let props = this.props;
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../assets/4.png')} resizeMode="cover" style={styles.imageBack}>
                    <NavBar navigation={props.navigation}/>
                    <View style={styles.itemsWrapper}>
                        <Text style={styles.header}>Маркет</Text>
                        <View style={styles.rounded}>
                            <BlurView style={styles.items}>
                                {props.isItemSelected ? <SelectedMarketItem setIsItemSelected={props.setIsItemSelected} selectedItem={props.selectedItem}/> : 
                                <FlatList
                                    data={this?.state?.items ? this?.state?.items : []}
                                    renderItem={({item}) =>  <MarketCards setselectedItem={props.setselectedItem} setIsItemSelected={props.setIsItemSelected} item={item}/>}
                                    />}
                            </BlurView>
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
    
};


// export const Market = ({name, navigation}) => {
//     const background = '../assets/4.png';

//     const [items, setItems] = useState([{
//         name:"server",
//         author:"not connected",
//         coins: 400
//     }]);
//     const [isItemSelected, setIsItemSelected] = useState(false);
//     const [selectedItem, setselectedItem] = useState();

//     useEffect(() => {
//         axios.get(`${baseUrl}/get_market`)
//             .then((res) => setItems(res.data));
//     }, [])


//     return (
//         <View style={styles.container}>
//             <ImageBackground source={require(background)} resizeMode="cover" style={styles.imageBack}>
//                 <NavBar navigation={navigation}/>
//                 <View style={styles.itemsWrapper}>
//                     <Text style={styles.header}>Маркет</Text>
//                     <View style={styles.rounded}>
//                         <BlurView style={styles.items}>
//                             {isItemSelected ? <SelectedMarketItem setIsItemSelected={setIsItemSelected} selectedItem={selectedItem}/> : 
//                             <FlatList
//                                 data={items}
//                                 renderItem={({item}) =>  <MarketCards setselectedItem={setselectedItem} setIsItemSelected={setIsItemSelected} item={item}/>}
//                                 />}
//                         </BlurView>
//                     </View>
//                 </View>
//             </ImageBackground>
//         </View>
//     );
// };
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '90%',
        width: '100%',
        backgroundColor: "#492675",
        position: 'relative'
    },
    itemsWrapper: {
        width: "100%",
        height: "100%",
        paddingTop: "30%"
    },
    image: {
        height: 1000,
        color: "white",
        fontSize: 400,
    },
    header: {
        fontSize: 40,
        color: "white",
        paddingHorizontal: 30
    },
    rounded: {
        overflow: "hidden",
        borderRadius: 40,
        background: "black",
        marginTop: 15,
        width: "90%",
        alignSelf: "center",
        height: "72%"
    },
    items: {
        height: "100%"
    }
});