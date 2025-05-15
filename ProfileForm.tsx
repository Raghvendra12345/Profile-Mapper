import React, { useState, useEffect } from "react";
import { Profile } from "../types/Profile";

type Props = {
  profile: Profile | null;
  onSave: (profile: Profile) => void;
};

export const ProfileForm: React.FC<Props> = ({ profile, onSave }) => {
  const [form, setForm] = useState<Profile>({
    id: "",
    name: "",
    photo: "",
    description: "",
    address: "",
    email: "",
    interests: [],
  });

  useEffect(() => {
    if (profile) {
      setForm(profile);
    } else {
      setForm({
        id: "",
        name: "",
        photo: "",
        description: "",
        address: "",
        email: "",
        interests: [],
      });
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.address || !form.photo) {
      alert("Name, Address, and Photo URL are required.");
      return;
    }
    onSave(form);
    setForm({
      id: "",
      name: "",
      photo: "",
      description: "",
      address: "",
      email: "",
      interests: [],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <input
        type="text"
        name="photo"
        placeholder="Photo URL"
        value={form.photo}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <textarea
        name="description"
        placeholder="Short Description"
        value={form.description}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email (optional)"
        value={form.email}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {profile ? "Update Profile" : "Add Profile"}
      </button>
    </form>
  );
};
