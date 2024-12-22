// PokemonTypeFilter.tsx
import React from "react";

interface PokemonTypeFilterProps {
  availableTypes: string[];
  selectedTypes: string[];
  onTypeSelect: (types: string[]) => void;
}

const PokemonTypeFilter: React.FC<PokemonTypeFilterProps> = ({
  availableTypes,
  selectedTypes,
  onTypeSelect,
}) => {
  const handleTypeClick = (type: string) => {
    // Toggle type selection
    const updatedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type) // Remove type
      : [...selectedTypes, type]; // Add type

    onTypeSelect(updatedTypes); // Notify parent
  };

  return (
    <div className="flex gap-2 flex-wrap mb-4">
      {availableTypes.map((type) => (
        <button
          key={type}
          onClick={() => handleTypeClick(type)}
          className={`px-3 py-1 rounded-lg ${
            selectedTypes.includes(type)
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

export default PokemonTypeFilter;
