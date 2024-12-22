import React, { useState, useEffect } from "react";
import PokemonCard from "./PokemonCard";

interface Pokemon {
  id: number;
  name: string;
  types: string[];
  sprite: string;
}

interface PokedexGridProps {
  selectedTypes: string[];
}

const PokedexGrid: React.FC<PokedexGridProps> = ({ selectedTypes }) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("name");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12; // Number of Pokémon per page

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=50");
      const data = await response.json();

      const detailedPokemon = await Promise.all(
        data.results.map(async (pokemon: { url: string }) => {
          const res = await fetch(pokemon.url);
          const details = await res.json();
          return {
            id: details.id,
            name: details.name,
            types: details.types.map((t: any) => t.type.name),
            sprite: details.sprites.front_default,
          };
        })
      );

      setPokemonList(detailedPokemon);
    };

    fetchPokemon();
  }, []);

  const filteredPokemon = pokemonList
    .filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((pokemon) =>
      selectedTypes.length === 0
        ? true
        : pokemon.types.some((type) => selectedTypes.includes(type))
    )
    .sort((a, b) =>
      sortOption === "name"
        ? a.name.localeCompare(b.name)
        : a.id - b.id
    );

  const totalPages = Math.ceil(filteredPokemon.length / pageSize);

  // Paginated Pokémon
  const paginatedPokemon = filteredPokemon.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search Pokemon..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow p-2 border rounded-lg"
        />
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="p-2 border rounded-lg"
        >
          <option value="name">Sort by Name</option>
          <option value="id">Sort by ID</option>
        </select>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {paginatedPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} {...pokemon} />
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-4 py-2 mx-1 rounded-lg ${
              currentPage === index + 1
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PokedexGrid;
