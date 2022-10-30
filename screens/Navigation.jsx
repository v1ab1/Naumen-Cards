import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { Login } from './Login';
import { Profile } from './Profile';
import { AddingItem } from './AddingItem';
import { Market } from './Market';
import { TopBar } from '../components/TopBar';
const Stack = createNativeStackNavigator();



export const Navigation = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{headerShown: false }} />
          <Stack.Screen name="Profile" component={Profile} options={{headerShown: false }} />
          <Stack.Screen name="AddingItem" component={AddingItem} options={{headerShown: false }} />
          <Stack.Screen name="Market" component={Market} options={{headerShown: false }} />
        </Stack.Navigator>
        <TopBar/>
      </NavigationContainer>
    );
};