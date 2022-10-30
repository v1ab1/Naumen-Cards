import { Context } from "../Context";
import { useContext } from "react";
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
    return (
      <NavigationContainer>
        <Stack.Navigator>
          {context.isLogin ? null : <Stack.Screen name="Login" component={Login} options={{headerShown: false }} />}
          <Stack.Screen name="Profile" component={Profile} options={{headerShown: false }} />
          <Stack.Screen name="AddingItem" component={AddingItem} options={{headerShown: false }} />
          <Stack.Screen name="Market" component={Market} options={{headerShown: false }} />
        </Stack.Navigator>
        {context.isLogin ? <TopBar/> : null}
      </NavigationContainer>
    );
};