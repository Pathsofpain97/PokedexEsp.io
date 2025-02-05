import { useEffect } from 'react';
import { Container } from "react-bootstrap";


import '../App.css'; 
import  Header  from "../components/Navbar";
import  TypeList  from "../components/TypesList";
import  PokemonCards  from "../components/PokemonCards";

const Home = () => {
  useEffect(() => {
    // Cambia el estilo del body al montar el componente
    document.body.style.backgroundColor = '#F6F8FC'; // Cambia el color de fondo

    // Limpia el estilo cuando el componente se desmonte
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, []); // El arreglo vacío asegura que esto solo se ejecute al montar y desmontar

  return (
  <div className="home-page">
    <header>
      <Header></Header>
    </header>

      <Container className='text-center'>
      <div>
        <TypeList></TypeList>
      </div>
      </Container>

      <Container>
      <PokemonCards></PokemonCards>
      </Container>

  </div>
  );
};

  export default Home;