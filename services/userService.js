import axios from "axios";

const API_URL = "https://redcross-backend-production.up.railway.app";

export const updateProfile = async (userDetails, token) => {
  try {
    const response = await axios.put(`${API_URL}/users/update`, userDetails, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error || "An error occurred during profile update");
  }
};
