import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import "../styles/Current.css";

// Diccionario de traducción de tipos y mensajes
const typeTranslation = {
  normal: { es: "Normal", en: "Normal" },
  fire: { es: "Fuego", en: "Fire" },
  water: { es: "Agua", en: "Water" },
  grass: { es: "Planta", en: "Grass" },
  electric: { es: "Eléctrico", en: "Electric" },
  ice: { es: "Hielo", en: "Ice" },
  fighting: { es: "Lucha", en: "Fighting" },
  poison: { es: "Veneno", en: "Poison" },
  ground: { es: "Tierra", en: "Ground" },
  flying: { es: "Volador", en: "Flying" },
  psychic: { es: "Psíquico", en: "Psychic" },
  bug: { es: "Bicho", en: "Bug" },
  rock: { es: "Roca", en: "Rock" },
  ghost: { es: "Fantasma", en: "Ghost" },
  dark: { es: "Siniestro", en: "Dark" },
  dragon: { es: "Dragón", en: "Dragon" },
  steel: { es: "Acero", en: "Steel" },
  fairy: { es: "Hada", en: "Fairy" },
};

const loadingMessages = {
  es: "Cargando información...",
  en: "Loading information...",
};

const closeButtonLabels = {
  es: "Cerrar",
  en: "Close",
};

const pokemonDetailsLabels = {
  habilidad: { es: "Habilidad", en: "Ability" },
  altura: { es: "Altura", en: "Height" },
  peso: { es: "Peso", en: "Weight" },
};

const CurrentPokemon = ({ pokemonId, closePokemonInfo, language }) => {
  const [pokemon, setPokemon] = useState(null);
  const [species, setSpecies] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoadingMessage, setShowLoadingMessage] = useState(true);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        setShowLoadingMessage(true); // Mostrar el mensaje de carga
        setIsLoading(true);

        const responsePokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const dataPokemon = await responsePokemon.json();
        
        const responseSpecies = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`);
        const dataSpecies = await responseSpecies.json();
        
        const responseEvolutions = await fetch(dataSpecies.evolution_chain.url);
        const dataEvolutions = await responseEvolutions.json();

        setPokemon(dataPokemon);
        setSpecies(dataSpecies);
        setEvolutionChain(dataEvolutions);

        // Retrasar la carga de los datos
        setTimeout(() => {
          setIsLoading(false);
          setShowLoadingMessage(false); // Ocultar mensaje después de 2 segundos
        }, 2000); // 2 segundos de retraso
      } catch (error) {
        console.error("Error fetching Pokémon details:", error);
        setIsLoading(false);
        setShowLoadingMessage(false);
      }
    };

    fetchPokemonDetails();
  }, [pokemonId]); // Dependencia: pokemonId

  const updateCurrentPokemonImage = (id) => {
    const currentPokemonImage = document.getElementById('current-pokemon-image');
    currentPokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    currentPokemonImage.style.width = '160px';
    currentPokemonImage.style.height = 'auto';
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        {showLoadingMessage && <p className="loading-message">{loadingMessages[language]}</p>}
      </div>
    );
  }

  if (!pokemon || !species || !evolutionChain) {
    return <div>Error fetching Pokémon details.</div>;
  }

  const evolutionChainImages = [];
  let currentEvolution = evolutionChain.chain;

  while (currentEvolution) {
    const id = currentEvolution.species.url.split("/")[6];
    const evolutionDetails = currentEvolution.evolves_to[0]?.evolution_details[0];

    // Obtener el nivel de evolución
    const minLevel = evolutionDetails?.min_level || (language === 'es' ? 'Condición especial' : 'Special condition');

    evolutionChainImages.push(
      <div key={id}>
        <img 
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} 
          alt={`evolution ${id}`} 
          className="evolution-image"
        />
        <span>{language === 'es' ? 'Lv.' : 'Lv.'} {minLevel}</span>
      </div>
    );

    // Avanzar a la siguiente evolución
    currentEvolution = currentEvolution.evolves_to[0] || null;
  }

  return (
    <div className="current-pokemon-container">
      <Container>
        <div className="current-pokemon-info">
          <h3 className="mb-2">{pokemon.name.toUpperCase()}</h3>
          <p className="pokemon-id">Pokémon N°{pokemon.id}</p> {/* Mostrar el ID */}
          <img 
            id="current-pokemon-image" 
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} 
            alt={pokemon.name} 
            onLoad={() => updateCurrentPokemonImage(pokemon.id)} 
          />
          <div className="pokemon-types mt-3">
            {pokemon.types.map((type) => (
              <span key={type.type.name} className={`pokemon-type ${type.type.name}`}>
                {typeTranslation[type.type.name][language] || type.type.name}
              </span>
            ))}
          </div>

          <div className="pokemon-details mt-1 mb-1">
            <h5>{pokemonDetailsLabels.habilidad[language]}: {pokemon.abilities[0]?.ability.name}</h5>
            <h5>{pokemonDetailsLabels.altura[language]}: {pokemon.height / 10} m</h5>
            <h5>{pokemonDetailsLabels.peso[language]}: {pokemon.weight / 10} kg</h5>
            <p>{species.flavor_text_entries.find(entry => entry.language.name === language)?.flavor_text || 'No description available.'}</p>
          </div>
        </div>

        <div className="pokemon-evolution-chain mt-1">
          {evolutionChainImages}
        </div>

        <div className="button-container mt-2 mb-1">
          <button onClick={closePokemonInfo} className="custom-close-button">
            {closeButtonLabels[language]}
          </button>
        </div>
      </Container>
    </div>
  );
};

CurrentPokemon.propTypes = {
  pokemonId: PropTypes.number.isRequired,
  closePokemonInfo: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
};

export default CurrentPokemon;