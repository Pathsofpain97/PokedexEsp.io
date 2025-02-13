import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import "../styles/Cards.css";
import pokeball from "../assets/pokeball-icon.png";


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

const PokemonCards = ({ searchTerm, typeFilter, onPokemonSelect, language }) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1010");
        const data = await response.json();

        const allPokemonPromises = data.results.map(async (pokemon) => {
          const pokemonResponse = await fetch(pokemon.url);
          return pokemonResponse.json();
        });

        const allPokemon = await Promise.all(allPokemonPromises);
        setPokemonData(allPokemon);
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemonData();
  }, []);

  const filteredPokemon = pokemonData.filter((pokemon) => {
    const matchesSearchTerm = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTypeFilter = typeFilter ? pokemon.types.some(type => type.type.name === typeFilter) : true;
    return matchesSearchTerm && matchesTypeFilter;
  });

  return (
    <div className="pokemon-render-result-container mb-2">
      {isLoading ? (
        <div className="spinner-container">
          <img src={pokeball} alt="Pokeball" className="loading-ball" />
        </div>
      ) : (
        filteredPokemon.map((pokemon) => (
          <div key={pokemon.id} className="pokemon-col">
            <Card className="pokemon-card" onClick={() => onPokemonSelect(pokemon.id)}>
              <Card.Body>
                <div className="pokemon-img-container mb-1">
                  <Card.Img
                    variant="top"
                    src={pokemon.sprites.front_default}
                    className="pokemon-image"
                  />
                </div>
                <Card.Text className="pokemon-id mb-1">N°{pokemon.id}</Card.Text>
                <Card.Title className="pokemon-name mt-2 mb-2">
                  {pokemon.name.toUpperCase()}
                </Card.Title>
                <div className="pokemon-types mt-1 mb-2">
                  {pokemon.types.map((type) => (
                    <span key={type.type.name} className={`pokemon-type ${type.type.name}`}>
                      {typeTranslation[type.type.name][language] || type.type.name}
                    </span>
                  ))}
                </div>
              </Card.Body>
            </Card>
          </div>
        ))
      )}
    </div>
  );
};

PokemonCards.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  typeFilter: PropTypes.string,
  onPokemonSelect: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired, 
};

export default PokemonCards;