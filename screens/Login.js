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
      AsyncStorage.setItem("token", token);

      navigation.navigate("Home");
    } catch (error) {
      console.error("Login Error:", error.message);
      // Show error message to the user
    }
  };

  return (
    <SharedForm
      isSignUp={false}
      onSubmit={handleLogin}
      navigation={navigation}
    />
  ); // Pass navigation prop
};

export default Login;
