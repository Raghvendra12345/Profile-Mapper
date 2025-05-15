import React from "react";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const SearchFilter: React.FC<Props> = ({ value, onChange }) => {
  return (
    <input
      type="text"
      placeholder="Search by name..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="border rounded px-3 py-2 w-full md:w-1/2"
    />
  );
};
