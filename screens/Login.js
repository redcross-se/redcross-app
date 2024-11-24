import React from "react";
import SharedForm from "../components/AuthForm/SharedForm";
import { signIn } from "../services/authService";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const handleLogin = async (form) => {
    try {
      const { user, token } = await signIn(form);
      console.log("User logged in:", user);
      // Store the token and navigate to another screen
      console.log("Token:", token);
      await AsyncStorage.setItem("token", token);
      await AsyncStorage.setItem("user", JSON.stringify(user));
      navigation.navigate("Home");
    } catch (error) {
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
