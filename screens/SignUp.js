import React from "react";
import SharedForm from "../components/AuthForm/SharedForm";
import { signUp } from "../services/authService";
import { Alert } from "react-native";

const SignUp = ({ navigation }) => {
  console.log("Sign Up screen");
  const handleSignUp = async (form) => {
    try {
      const user = await signUp({ ...form, role: "user" });

      console.log("User signed up:", user);
      // Navigate to another screen or show a success message
      Alert.alert("Success", "Sign up successful");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Sign Up Error:", error.message);
      // Show error message to the user
    }
  };

  return (
    <SharedForm
      isSignUp={true}
      onSubmit={handleSignUp}
      navigation={navigation}
    />
  );
};

export default SignUp;
