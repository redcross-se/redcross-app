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
import {
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-native-sdk";
import { AuthProvider } from "./context/authContext";

const Stack = createNativeStackNavigator();

export default function App() {
  const [streamClient, setStreamClient] = useState(null);
  const { user, token, streamToken } = useAuth();

  useEffect(() => {
    const initializeStreamClient = async () => {
      if (streamToken && user && token && !streamClient) {
        const myclient = StreamVideoClient.getOrCreateInstance({
          apiKey: "3pkfpxv4cver",
          user: user,
          token: streamToken,
        });
        setStreamClient(myclient);
        console.log("streamClient", streamClient);
        return () => {
          myclient.disconnect();
          setStreamClient(null);
        };
      }
    };
    initializeStreamClient();
  }, []);

  return (
    <AuthProvider>
      <StreamVideo client={streamClient}>
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
                component={Login} // Use the Login component here
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
                name="Profile"
                component={Profile}
                options={{ title: "Profile" }}
              />
              <Stack.Screen
                name="Volunteer"
                component={Volunteer}
                options={{ title: "Volunteer" }}
              />
              <Stack.Screen
                name="Content"
                component={Content}
                options={{ title: "Content" }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SocketProvider>
      </StreamVideo>
    </AuthProvider>
  );
}
