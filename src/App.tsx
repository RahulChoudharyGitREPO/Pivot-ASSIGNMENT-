// App.tsx
import React, { useState } from "react";
import PokedexGrid from "./PokedexGrid";
import PokemonTypeFilter from "./PokemonTypeFilter";

const App: React.FC = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const handleTypeSelect = (types: string[]) => {
    setSelectedTypes(types);
  };

  const availableTypes = [
    "grass",
    "fire",
    "water",
    "electric",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dragon",
    "dark",
    "steel",
    "fairy",
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Pokemon Explorer</h1>
      <PokemonTypeFilter
        availableTypes={availableTypes}
        selectedTypes={selectedTypes}
        onTypeSelect={handleTypeSelect}
      />
      <PokedexGrid selectedTypes={selectedTypes} />
    </div>
  );
};

export default App;
