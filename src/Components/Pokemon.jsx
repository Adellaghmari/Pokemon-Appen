import React from 'react';

// Funktion som ändrar på första bokstaven
const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : 'Unknown';

// Funktion som fixar viketen
const formatWeight = (weight) => weight ? `${weight / 10} kg` : 'Unknown';

// Funkton som fixar längden
const formatHeight = (height) => height ? `${height / 10} m` : 'Unknown';

function Pokemon({ data }) {
  return (
    <div className="pokemon-container">
      <h2>{capitalize(data?.name)}</h2>
      <div className="pokemon-image-container">
        <img
          src={data?.sprites?.front_default || 'placeholder.png'}
          alt={data?.name || 'Unknown Pokémon'}
        />
      </div>
      <p>
        <strong>Types:</strong>{' '}
        {data?.types
          ? data.types.map(typeInfo => typeInfo.type.name).join(', ')
          : 'Unknown'}
      </p>
      <p><strong>Weight:</strong> {formatWeight(data?.weight)}</p>
      <p><strong>Height:</strong> {formatHeight(data?.height)}</p>
    </div>
  );
}

export default Pokemon;
