import { Profile } from "../types/Profile";

const STORAGE_KEY = "profiles";

export const getProfiles = (): Profile[] => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
};

export const saveProfiles = (profiles: Profile[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
};

export const addProfile = (profile: Profile) => {
  const profiles = getProfiles();
  profiles.push(profile);
  saveProfiles(profiles);
};

export const updateProfile = (updated: Profile) => {
  const profiles = getProfiles().map(p => (p.id === updated.id ? updated : p));
  saveProfiles(profiles);
};

export const deleteProfile = (id: string) => {
  const profiles = getProfiles().filter(p => p.id !== id);
  saveProfiles(profiles);
};
