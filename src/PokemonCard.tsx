// PokemonCard.tsx
import React from "react";

interface PokemonCardProps {
  id: number;
  name: string;
  types: string[];
  sprite: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ id, name, types, sprite }) => {
  return (
    <div
      className="bg-white shadow-md rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-lg cursor-pointer"
    >
      <img
        src={sprite}
        alt={name}
        className="w-full h-32 object-contain bg-gray-100"
      />
      <div className="p-4">
        <h2 className="text-lg font-bold text-gray-800">{name}</h2>
        <p className="text-gray-500 text-sm">ID: {id}</p>
        <div className="flex gap-2 mt-2">
          {types.map((type) => (
            <span
              key={type}
              className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
