import { Button, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import '../styles/Type.css'; 

const TypeList = ({ setTypeFilter, language }) => {
  const types = [
    { id: 'normal', label: language === 'es' ? 'Normal' : 'Normal' },
    { id: 'fire', label: language === 'es' ? 'Fuego' : 'Fire' },
    { id: 'water', label: language === 'es' ? 'Agua' : 'Water' },
    { id: 'grass', label: language === 'es' ? 'Planta' : 'Grass' },
    { id: 'electric', label: language === 'es' ? 'Eléctrico' : 'Electric' },
    { id: 'ice', label: language === 'es' ? 'Hielo' : 'Ice' },
    { id: 'fighting', label: language === 'es' ? 'Lucha' : 'Fighting' },
    { id: 'poison', label: language === 'es' ? 'Veneno' : 'Poison' },
    { id: 'ground', label: language === 'es' ? 'Tierra' : 'Ground' },
    { id: 'flying', label: language === 'es' ? 'Volador' : 'Flying' },
    { id: 'psychic', label: language === 'es' ? 'Psíquico' : 'Psychic' },
    { id: 'bug', label: language === 'es' ? 'Bicho' : 'Bug' },
    { id: 'rock', label: language === 'es' ? 'Roca' : 'Rock' },
    { id: 'ghost', label: language === 'es' ? 'Fantasma' : 'Ghost' },
    { id: 'dark', label: language === 'es' ? 'Siniestro' : 'Dark' },
    { id: 'dragon', label: language === 'es' ? 'Dragón' : 'Dragon' },
    { id: 'steel', label: language === 'es' ? 'Acero' : 'Steel' },
    { id: 'fairy', label: language === 'es' ? 'Hada' : 'Fairy' },
  ];

  const handleTypeClick = (type) => {
    setTypeFilter(type); // Establecemos el filtro de tipo
  };

  const handleResetClick = () => {
    setTypeFilter(""); // Reiniciamos el filtro de tipo
  };

  return (
    <Container className='text-center containerbt'>
      <h1>{language === 'es' ? 'Filtro de tipos de Pokémon' : 'Pokémon Type Filter'}</h1>
      <ul className="nav-list">
        {types.map(type => (
          <li className="nav-item" key={type.id}>
            <Button 
              className={`btn btn-header mb-1 mt-1 ${type.id}`} 
              id={type.id}
              onClick={() => handleTypeClick(type.id)} // Agregamos el onClick para manejar el filtro
            >
              {type.label}
            </Button>
          </li>
        ))}
      </ul>
      <div>
        <Button className='mb-3 mt-1 btnb' onClick={handleResetClick}>
          {language === 'es' ? 'Reiniciar Búsqueda' : 'Reset Search'}
        </Button> {/* Añadimos el onClick */}
      </div>
    </Container>
  );
};


TypeList.propTypes = {
  setTypeFilter: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
};

export default TypeList;