import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { Login } from './Login';
import { Profile } from './Profile';
const Stack = createNativeStackNavigator();

export const Navigation = () => {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Profile" component={Profile} options={{headerShown: false }} />
          <Stack.Screen name="Login" component={Login} options={{headerShown: false }} />

        </Stack.Navigator>
      </NavigationContainer>
    );
};