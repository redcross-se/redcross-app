import axios from "axios";

const API_URL = "https://redcross-backend-production.up.railway.app";

export const updateProfile = async (userDetails, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/user/update-profile`,
      userDetails,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error || "An error occurred during profile update");
  }
};

export const getBloodRequests = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/requests`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.message || "Failed to fetch blood requests");
  }
};
