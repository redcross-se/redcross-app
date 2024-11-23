import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoarding from './screens/OnBoarding';
import SignUp from './screens/SignUp';
import Login from './screens/Login'; 
import EmergencyCall from './screens/EmergencyCall';
import EmergencyInfo from './screens/EmergencyInfo';
import CallAction from './screens/CallAction';
import Profile from './screens/Profile';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnBoarding">
        <Stack.Screen
          name="OnBoarding"
          component={OnBoarding}
          options={{ headerShown: false }} 
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ title: 'Sign Up' }}
        />
        <Stack.Screen
          name="Login"
          component={Login} // Use the Login component here
          options={{ title: 'Login' }}
        />
        <Stack.Screen
          name="EmergencyCall"
          component={EmergencyCall} 
          options={{ title: 'EmergencyCall' }}
        />
          <Stack.Screen
          name="EmergencyInfo"
          component={EmergencyInfo}
          options={{ title: 'EmergencyInfo' }}
        />
        <Stack.Screen
          name="CallAction"
          component={CallAction}
          options={{ title: 'CallAction' }}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{ title: 'Profile' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}