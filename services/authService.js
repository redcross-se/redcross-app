import axios from "axios";

const API_URL = "https://public-wasps-wonder.loca.lt";

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
    return response.data;
  } catch (error) {
    throw new Error(
      error.response.data.error || "An error occurred during signin"
    );
  }
};
