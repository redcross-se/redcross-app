import axios from "axios";

const API_URL = "http://192.168.0.114:3000";

export const signUp = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signup`, userData);
    console.log("response", response);
    return response.data;
  } catch (error) {
    throw new Error(error || "An error occurred during signup");
  }
};

export const signIn = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/signin`, userData);
    //save user data to local storage
    console.log("response", response);
    return response.data;
  } catch (error) {
    throw new Error(
      error.response.data.error || "An error occurred during signin"
    );
  }
};
