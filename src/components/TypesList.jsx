import { Button, Container } from 'react-bootstrap';


import '../styles/Type.css'; 


const TypeList = () => {
  const types = [
    { id: 'normal', label: 'Normal' },
    { id: 'fire', label: 'Fuego' },
    { id: 'water', label: 'Agua' },
    { id: 'grass', label: 'Planta' },
    { id: 'electric', label: 'Eléctrico' },
    { id: 'ice', label: 'Hielo' },
    { id: 'fighting', label: 'Lucha' },
    { id: 'poison', label: 'Veneno' },
    { id: 'ground', label: 'Tierra' },
    { id: 'flying', label: 'Volador' },
    { id: 'psychic', label: 'Psíquico' },
    { id: 'bug', label: 'Bicho' },
    { id: 'rock', label: 'Roca' },
    { id: 'ghost', label: 'Fantasma' },
    { id: 'dark', label: 'Siniestro' },
    { id: 'dragon', label: 'Dragón' },
    { id: 'steel', label: 'Acero' },
    { id: 'fairy', label: 'Hada' },
  ];

  return (
    <Container className='text-center containerbt'>
    <ul className="nav-list">
      {types.map(type => (
        <li className="nav-item" key={type.id}>
          <Button className={`btn btn-header mb-1 mt-1 ${type.id}`} id={type.id}>
            {type.label}
            </Button>
        </li>
      ))}
    </ul>
    </Container>
  );
};

export default TypeList;