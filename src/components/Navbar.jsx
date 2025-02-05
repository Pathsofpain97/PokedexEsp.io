import { Navbar, Container, Form, InputGroup } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
import { IoMdSearch } from "react-icons/io";
import '../styles/Navbar.css'; 

import { Logo } from "../components/Logo";


const Header = () => {
    const handleSearch = (event) => {
      if (event.key === 'Enter') {
        // Aquí puedes implementar la lógica de búsqueda
        console.log('Buscando:', event.target.value);
      }
    };
  
    return (
        <Navbar expand="lg">
        <Container className='d-flex align-items-center'>
          <div id="search-bar-container" className="containernvb d-flex align-items-center">
            <div className="logo-container">
            <Navbar.Brand>
            <NavLink to="/Home" className="navbar-brand">
              <Logo />
            </NavLink>
          </Navbar.Brand>
            </div>
            <InputGroup className="search-group">
              <Form.Control
                id="search-input"
                placeholder="Busca un Pokémon por su nombre"
                onKeyDown={handleSearch}
              />
              <InputGroup.Text id="start-search-button"> 
                <IoMdSearch className='start-search-icon' />
              </InputGroup.Text>
            </InputGroup>
          </div>
        </Container>
      </Navbar>
    );
  };
  
  export default Header;

