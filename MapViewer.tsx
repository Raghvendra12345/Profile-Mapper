import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { Profile } from "../types/Profile";

const containerStyle = { width: "100%", height: "400px" };

export const MapViewer = ({ profile }: { profile: Profile }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY!,
  });

  if (loadError) return <p>Map failed to load</p>;
  if (!isLoaded) return <p>Loading Map...</p>;

  return (
    <GoogleMap
      center={{ lat: profile.lat!, lng: profile.lng! }}
      zoom={14}
      mapContainerStyle={containerStyle}
    >
      <Marker position={{ lat: profile.lat!, lng: profile.lng! }} />
    </GoogleMap>
  );
};
