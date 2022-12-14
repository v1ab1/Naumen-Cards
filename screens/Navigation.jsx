import { Context } from "../Context";
import { useContext, useState } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Login } from './Login';
import { Profile } from './Profile';
import { AddingItem } from './AddingItem';
import { Market } from './Market';
import { TopBar } from '../components/TopBar';
import { NavBar } from '../components/NavBar';
const Stack = createNativeStackNavigator();



export const Navigation = () => {
    const [context, setContext] = useContext(Context);
    const [isLogin, setIsLogin] = useState(false);
    const [login, setLogin] = useState("");
    const [coins, setCoins] = useState(0);


    
    return (
      <NavigationContainer>
        <Stack.Navigator>
          
          <Stack.Screen name="Login" children={({navigation}) => { return (<Login setLogin={setLogin} setCoins={setCoins} setIsLogin={setIsLogin} navigation={navigation}/>)}}  options={{headerShown: false }} />
          <Stack.Screen name="Profile" component={Profile} options={{headerShown: false }} />
          <Stack.Screen name="AddingItem" component={AddingItem} options={{headerShown: false }} />
          <Stack.Screen name="Market" component={Market} options={{headerShown: false }} />
        </Stack.Navigator>
        <TopBar isLogin={isLogin} name={login} coins={coins}/>
      </NavigationContainer>
    );
};