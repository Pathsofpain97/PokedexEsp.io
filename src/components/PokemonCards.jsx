import { useState, useEffect } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import '../styles/Cards.css';

import pokeball from '../assets/pokeball-icon.png'; 

const typeTranslation = {
  normal: 'Normal',
  fire: 'Fuego',
  water: 'Agua',
  grass: 'Planta',
  electric: 'Eléctrico',
  ice: 'Hielo',
  fighting: 'Lucha',
  poison: 'Veneno',
  ground: 'Tierra',
  flying: 'Volador',
  psychic: 'Psíquico',
  bug: 'Bicho',
  rock: 'Roca',
  ghost: 'Fantasma',
  dark: 'Siniestro',
  dragon: 'Dragón',
  steel: 'Acero',
  fairy: 'Hada',
};

const PokemonCards = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      const allPokemon = [];
      for (let i = 1; i <= 1010; i++) {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
        const data = await response.json();
        allPokemon.push(data);
      }
      setPokemonData(allPokemon);
      setIsLoading(false); // Finaliza la carga
    };

    fetchPokemonData();
  }, []);

  return (
    <div className="pokemon-render-result-container mb-2">
      {isLoading ? (
        <div className="spinner-container">
        <img src={pokeball} alt="Pokeball" className="loading-ball" />
        </div>
      ) : (
        <Row xs={1} md={3} lg={4} className="g-4">
          {pokemonData.map((pokemon) => (
            <Col key={pokemon.id} className="pokemon-col">
              <Card className="pokemon-card">
                <Card.Body>
                  <div className="pokemon-img-container mb-1">
                    <Card.Img
                      variant="top"
                      src={pokemon.sprites.front_default}
                      className="pokemon-image"
                    />
                  </div>
                  <Card.Text className="pokemon-id mb-1">
                    N°{pokemon.id}
                  </Card.Text>
                  <Card.Title className="pokemon-name mt-3 mb-3">
                    {pokemon.name.toUpperCase()}
                  </Card.Title>
                  <div className="pokemon-types mt-1 mb-2">
                    {pokemon.types.map((type) => (
                      <span
                        key={type.type.name}
                        className={`pokemon-type ${type.type.name}`}
                      >
                        {typeTranslation[type.type.name] || type.type.name}
                      </span>
                    ))}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default PokemonCards;
