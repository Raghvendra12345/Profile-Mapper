import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getProfiles } from "../services/profileService";
import { MapViewer } from "../components/MapViewer";
import { Profile } from "../types/Profile";

const ProfileDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const profiles = getProfiles();
  const profile = profiles.find((p) => p.id === id) as Profile | undefined;

  if (!profile) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold text-red-500">Profile not found</h2>
        <button onClick={() => navigate(-1)} className="mt-4 text-blue-600 underline">
          Go back
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-600 underline">
        ← Back
      </button>

      <div className="flex flex-col md:flex-row gap-6 items-start">
        <img src={profile.photo} alt={profile.name} className="w-48 h-48 object-cover rounded-lg shadow" />

        <div>
          <h1 className="text-2xl font-bold mb-2">{profile.name}</h1>
          <p className="text-gray-700 mb-2">{profile.description}</p>
          <p><strong>Address:</strong> {profile.address}</p>
          {profile.email && <p><strong>Email:</strong> {profile.email}</p>}
          {profile.interests && profile.interests.length > 0 && (
            <p><strong>Interests:</strong> {profile.interests.join(", ")}</p>
          )}
        </div>
      </div>

      {profile.lat && profile.lng && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Map Location</h2>
          <MapViewer profile={profile} />
        </div>
      )}
    </div>
  );
};

export default ProfileDetailsPage;
