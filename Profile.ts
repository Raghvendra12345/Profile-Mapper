export type Profile = {
    id: string;
    name: string;
    photo: string;
    description: string;
    address: string;
    email?: string;
    interests?: string[];
    lat?: number;
    lng?: number;
  };
  