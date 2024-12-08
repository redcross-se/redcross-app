import React from "react";
import SharedForm from "../components/AuthForm/SharedForm";
import { signIn } from "../services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../context/authContext";
import { Alert } from "react-native";

const Login = ({ navigation }) => {
  const { setUser, setToken, setStreamToken } = useAuth();
  const handleLogin = async (form) => {
    try {
      const { user, token, streamToken } = await signIn(form);
      console.log("User logged in:", user);
      // Store the token and navigate to another screen
      console.log("Token:", token);
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      await AsyncStorage.setItem("streamToken", streamToken);
      setUser(user);
      setToken(token);
      setStreamToken(streamToken);
      navigation.navigate("Home");
    } catch (error) {
      console.log("Error:", error);
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SharedForm
      isSignUp={false}
      onSubmit={handleLogin}
      navigation={navigation}
    />
  );
};

export default Login;
