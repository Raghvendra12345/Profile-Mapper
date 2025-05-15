import axios from "axios";

export const geocodeAddress = async (address: string) => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json`,
    {
      params: {
        address,
        key: apiKey,
      },
    }
  );

  if (response.data.status === "OK") {
    const location = response.data.results[0].geometry.location;
    return {
      lat: location.lat,
      lng: location.lng,
    };
  } else {
    throw new Error("Geocoding failed");
  }
};

