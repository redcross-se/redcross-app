import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoarding from "./screens/OnBoarding";
import SignUp from "./screens/SignUp";
import Login from "./screens/Login";
import EmergencyCall from "./screens/EmergencyCall";
import EmergencyInfo from "./screens/EmergencyInfo";
import CallAction from "./screens/CallAction";
import Profile from "./screens/Profile";
import EmergencyCard from "./components/EmergencyCall/EmergencyCard";
import Volunteer from "./screens/Volunteer";
import Content from "./screens/VolunteeringContent";
import { SocketProvider } from "./context/SocketContext";
import { AuthProvider } from "./context/authContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import EmergencyDispatched from "./screens/EmergencyDispatched";
import { LogBox } from "react-native";
import RequestsList from "./screens/RequestList";
import VolunteerForm from "./screens/VolunteerForm";
import Settings from "./screens/Settings";
const Stack = createNativeStackNavigator();

export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
        <SocketProvider>
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
                options={{ title: "Sign Up" }}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ title: "Login" }}
              />
              <Stack.Screen
                name="Home"
                component={EmergencyCall}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="EmergencyCard"
                component={EmergencyCard}
                options={{ title: "Emergency Card" }}
              />
              <Stack.Screen
                name="EmergencyInfo"
                component={EmergencyInfo}
                options={{ title: "EmergencyInfo" }}
              />
              <Stack.Screen
                name="CallAction"
                component={CallAction}
                options={{ title: "CallAction" }}
              />
              <Stack.Screen
                name="EmergencyDispatched"
                component={EmergencyDispatched}
                options={{
                  title: "Emergency Dispatched",
                  headerShown: false,
                  animation: "simple_push",
                }}
              />
              <Stack.Screen
                name="VolunteerForm"
                component={VolunteerForm}
                options={{
                  title: "Volunteer Form",
                  animation: "simple_push",
                  presentation: "modal",
                }}
              />
              <Stack.Screen
                name="Profile"
                component={Profile}
                options={{
                  title: "Profile",
                  animation: "simple_push",
                  presentation: "modal",
                }}
              />
              <Stack.Screen
                name="Volunteer"
                component={Volunteer}
                options={{ title: "Volunteer", animation: "simple_push" }}
              />
              <Stack.Screen
                name="Content"
                component={Content}
                options={{
                  title: "Content",
                  animation: "simple_push",
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name="RequestsList"
                component={RequestsList}
                options={{
                  title: "Blood Requests",
                  animation: "simple_push",
                }}
              />
              <Stack.Screen
                name="Settings"
                component={Settings}
                options={{
                  title: "Settings",
                  headerShown: false,
                  animation: "simple_push",
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SocketProvider>
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
