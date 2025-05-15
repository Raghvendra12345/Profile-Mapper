import React, { useState, useEffect } from "react";
import { Profile } from "../types/Profile";
import {
  getProfiles,
  saveProfiles,
  deleteProfile,
} from "../services/profileService";
import { ProfileForm } from "../components/ProfileForm";
import { v4 as uuidv4 } from "uuid";

const AdminDashboard: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);

  useEffect(() => {
    setProfiles(getProfiles());
  }, []);

  const handleSave = (profile: Profile) => {
    let updatedProfiles: Profile[];
    if (editingProfile) {
      updatedProfiles = profiles.map((p) =>
        p.id === profile.id ? profile : p
      );
    } else {
      profile.id = uuidv4();
      updatedProfiles = [...profiles, profile];
    }
    setProfiles(updatedProfiles);
    saveProfiles(updatedProfiles);
    setEditingProfile(null);
  };

  const handleEdit = (profile: Profile) => {
    setEditingProfile(profile);
  };

  const handleDelete = (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this profile?");
    if (!confirmed) return;

    const updated = profiles.filter((p) => p.id !== id);
    setProfiles(updated);
    saveProfiles(updated);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <ProfileForm profile={editingProfile} onSave={handleSave} />

      <h2 className="text-xl font-semibold mt-6 mb-2">All Profiles</h2>
      <ul className="space-y-2">
        {profiles.map((profile) => (
          <li key={profile.id} className="border rounded p-2 flex justify-between items-center">
            <div>
              <strong>{profile.name}</strong> — {profile.address}
            </div>
            <div className="space-x-2">
              <button
                className="bg-yellow-400 px-2 py-1 rounded text-white"
                onClick={() => handleEdit(profile)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 px-2 py-1 rounded text-white"
                onClick={() => handleDelete(profile.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
export {};
