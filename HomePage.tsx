import React, { useEffect, useState } from "react";
import { Profile } from "../types/Profile";
import { getProfiles } from "../services/profileService";
import { geocodeAddress } from "../services/geocodeService";
import { ProfileCard } from "../components/ProfileCard";
import { MapViewer } from "../components/MapViewer";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { SearchFilter } from "../components/SearchFilter";

const HomePage: React.FC = () => {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      const storedProfiles = getProfiles();

      // Ensure geocoding is available for each profile
      const profilesWithGeo = await Promise.all(
        storedProfiles.map(async (profile) => {
          if (profile.lat && profile.lng) return profile;
          try {
            const coords = await geocodeAddress(profile.address);
            return { ...profile, ...coords };
          } catch {
            return profile;
          }
        })
      );

      setProfiles(profilesWithGeo);
      setFilteredProfiles(profilesWithGeo);
      setLoading(false);
    };

    fetchProfiles();
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = profiles.filter((profile) =>
      profile.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProfiles(filtered);
  };

  const handleSummaryClick = (profile: Profile) => {
    console.log("Clicked Summary for:", profile.name, profile.lat, profile.lng);
    setSelectedProfile(profile);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Profile Viewer</h1>

      <SearchFilter value={searchTerm} onChange={handleSearch} />

      {loading && <LoadingSpinner />}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {filteredProfiles.map((profile) => (
          <ProfileCard
            key={profile.id}
            profile={profile}
            onShowSummary={handleSummaryClick}
          />
        ))}
      </div>

      {selectedProfile && selectedProfile.lat && selectedProfile.lng && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">
            Location of {selectedProfile.name}
          </h2>
          <MapViewer profile={selectedProfile} />
        </div>
      )}
    </div>
  );
};

export default HomePage;


