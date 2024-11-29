import React, { useState, useEffect } from 'react';
import Pokemon from './Pokemon';

function PokemonApplication({ goBackToStart }) {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState('');
  const [pokemonData, setPokemonData] = useState(null);
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  // Hämta Pokemon listan så fort sidan laddas
  useEffect(() => {
    const fetchPokemonList = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
        if (!response.ok) throw new Error('Failed to fetch Pokémon list');
        const data = await response.json();
        setPokemonList(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemonList();
  }, []);

  // Hämta data för pokemonen man väljer
  const handleFetchPokemonData = async () => {
    if (!selectedPokemon) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${selectedPokemon}`);
      if (!response.ok) throw new Error('Failed to fetch Pokémon data');
      const data = await response.json();
      setPokemonData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Återställ vy till listan
  const handleBackToList = () => {
    setPokemonData(null);
  };

  return (
    <div>
      <h1>Pokemon Application</h1>
      {loading && <p>Loading...</p>} {/* Visar att den laddar */}
      {error && <p className="error">{error}</p>} {/* Felmeddelande */}

      {!pokemonData ? (
        <div className="select-container">
          {/* Dropdown för att välja Pokemon */}
          <select
            onChange={(e) => setSelectedPokemon(e.target.value)}
            value={selectedPokemon}
          >
            <option value="" disabled>
              Select a Pokemon
            </option>
            {pokemonList.map((pokemon) => (
              <option key={pokemon.name} value={pokemon.name}>
                {pokemon.name}
              </option>
            ))}
          </select>

          {/* Knapp för att hämta Pokemon datan, inaktiverad om ingen är vald */}
          <button onClick={handleFetchPokemonData} disabled={!selectedPokemon}>
            Fetch Pokemon Data
          </button>

          {/* Knapp för att gå tillbaka till startsidan */}
          <button onClick={goBackToStart} className="back-to-home-button">
            Back To Pokemon Homepage
          </button>
        </div>
      ) : (
        <>
          {/* Visa detaljerad Pokemon-data */}
          <Pokemon data={pokemonData} />

          {/* Knapp för att gå tillbaka till listan */}
          <button className="back-button" onClick={handleBackToList}>
            Back To Select A Pokemon
          </button>

          {/* Knapp för att gå tillbaka till startsidan */}
          <button onClick={goBackToStart} className="back-to-home-button">
            Back To Pokemon Homepage
          </button>
        </>
      )}
    </div>
  );
}

export default PokemonApplication;
