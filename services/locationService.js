import axios from "axios";
// import { GOOGLE_MAPS_API_KEY } from "@env";

export const getAddressFromCoordinates = async (latitude, longitude) => {
  const apiKey = "AIzaSyBKUilOn2UjmAVpgXM-az1StDBaDyZi8n8";
  console.log("API Keys:", apiKey);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    return response.data.results[3].formatted_address;
  } catch (error) {
    console.error("Error fetching address:", error);
    throw new Error("Unable to fetch address");
  }
};

export const getDirections = async (origin, destination) => {
  const apiKey = "AIzaSyBKUilOn2UjmAVpgXM-az1StDBaDyZi8n8";
  const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin.latitude},${origin.longitude}&destination=${destination.latitude},${destination.longitude}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const route = response.data.routes[0].legs[0];
    return {
      distance: route.distance.value,
      duration: route.duration.value / 60, // Convert seconds to minutes
      polyline: route.overview_polyline.points,
    };
  } catch (error) {
    console.error("Error fetching directions:", error);
    throw new Error("Unable to fetch directions");
  }
};
