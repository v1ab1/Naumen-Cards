import { View,Text,TouchableOpacity, StyleSheet } from "react-native";
import React, { useContext, useState } from "react";
import { Context } from "../Context";
import { SubscribeItem } from "./SubscribeItem";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { Follower } from "./Follower";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import { SelectedProfile } from "./SelectedProfile";

class SubscribesClass extends React.Component{

    componentDidMount(){
        axios.get(`${baseUrl}/get_friends?login=${this.props.context.login}`)
        .then((res) => this.setState({subscribes : res.data}));
        
    }


    render(){
        let props = this.props;
        let Subscribe = (from, to, callBack) => {
            axios.post(`${baseUrl}/add_friend?login=${from}&friend=${to}`)
            .then(() => {});
        }
        return (
            <View>
                {props.isViewUserProfile ? <SelectedProfile setisViewUserProfile={props.setisViewUserProfile} selectedProfile={props.selectedProfile}/> 
                :
                <View>
                    <View style={styles.formWrap}>
                        <TextInput
                            onChangeText={props.setLogin}
                            value={props.login}
                            placeholder="Логин"
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            style={styles.form}
                            />
                        <TouchableOpacity style={styles.formButton} onPress={() => {Subscribe(props.context.login, props.login)}}>
                            <Text style={styles.formText}>Подписаться</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                    data={this?.state?.subscribes ? this?.state?.subscribes : []}
                    renderItem={({item}) => <Follower setisViewUserProfile={props.setisViewUserProfile} setSelectedProfile={props.setSelectedProfile}  item={item}/>}
                    />
                </View>}
            </View>
        )
    }
}

export const Subscribes = (props) => {
    const [context, setContext] = useContext(Context);
    const [login, setLogin] = useState("");
    const [isViewUserProfile, setisViewUserProfile] = useState(false);
    const [selectedProfile, setSelectedProfile] = useState();


    return ( <SubscribesClass {...props} context={context} setContext={setContext} login={login} setLogin={setLogin} isViewUserProfile={isViewUserProfile}
        setisViewUserProfile={setisViewUserProfile} selectedProfile={selectedProfile} setSelectedProfile={setSelectedProfile}/>)
}


// export const Subscribes = (props) => {
//     const [context, setContext] = useContext(Context);
//     const [login, setLogin] = useState("");

//     const [isViewUserProfile, setisViewUserProfile] = useState(false);
//     const [selectedProfile, setSelectedProfile] = useState();


//     let Subscribe = (from, to, callBack) => {
//         axios.post(`${baseUrl}/add_friend?login=${from}&friend=${to}`)
//         .then(() => {});
//     }

//     return (
//         <View>
//             {isViewUserProfile ? <SelectedProfile setisViewUserProfile={setisViewUserProfile} selectedProfile={selectedProfile}/> 
//             :
//             <View>
//                 <View style={styles.formWrap}>
//                     <TextInput
//                         onChangeText={setLogin}
//                         value={login}
//                         placeholder="Логин"
//                         placeholderTextColor="rgba(255,255,255,0.7)"
//                         style={styles.form}
//                         />
//                     <TouchableOpacity style={styles.formButton} onPress={() => {Subscribe(context.login, login)}}>
//                         <Text style={styles.formText}>Подписаться</Text>
//                     </TouchableOpacity>
//                 </View>
//                 <FlatList
//                 data={props.subscribes}
//                 renderItem={({item}) => <Follower setisViewUserProfile={setisViewUserProfile} setSelectedProfile={setSelectedProfile}  item={item}/>}
//                 />
//             </View>}
//         </View>
//     )
// }

const styles = StyleSheet.create({
    cardWrapper: {
        flexDirection: "row",
        paddingHorizontal: 15,
        justifyContent: "flex-start",
        width: "80%",
        marginBottom: "5%"
    },
    form: {
        borderRadius: 40,
        borderWidth: 2,
        borderColor: "white",
        fontSize: 24,
        height: 40,
        paddingHorizontal: 10,
        color: "white",
        width: "60%"
    },
    formWrap: {
        flexDirection: "row"
    },
    formText: {
        color: "white",
        marginLeft: 20,
        fontSize: 18
    },
    formButton: {
        justifyContent: "center"
    }
});