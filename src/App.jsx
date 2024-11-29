import React, { useState } from 'react';
import PokemonApplication from './Components/PokemonApp';
import './app.css';
import pokemonLogo from './assets/pokemon-logo.png';

function App() {
  const [showApp, setShowApp] = useState(false);

  // Funktion för att visa Pokemon appen
  const startPokemonApp = () => {
    setShowApp(true);
  };

  // Funktion för att gå tillbaka till startsidan
  const goBackToStart = () => {
    setShowApp(false);
  };

  return (
    <div className="app-container">
      <img src={pokemonLogo} alt="Pokemon Logo" className="logo" />

      {/* Visa startknappen eller Pokemon appen */}
      {!showApp ? (
        <button onClick={startPokemonApp} className="start-button">
          Start Pokemon App
        </button>
      ) : (
        <PokemonApplication goBackToStart={goBackToStart} />
      )}
    </div>
  );
}

export default App;

