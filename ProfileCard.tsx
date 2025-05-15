import { Profile } from "../types/Profile";

export const ProfileCard = ({
  profile,
  onShowSummary,
}: {
  profile: Profile;
  onShowSummary: (profile: Profile) => void;
}) => (
  <div className="card">
    <img src={profile.photo} alt={profile.name} width={100} height={100} />
    <h3>{profile.name}</h3>
    <p>{profile.description}</p>
    <button onClick={() => onShowSummary(profile)}>Summary</button>
  </div>
);

