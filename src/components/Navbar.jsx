import PropTypes from "prop-types"; 
import { Navbar, Container, Form, InputGroup } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import "../styles/Navbar.css";
import { Logo } from "../components/Logo";

const Header = ({ setSearchTerm, language }) => {
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Función para recargar la página al hacer clic en el logo
  const handleLogoClick = (event) => {
    event.preventDefault(); // Evita que el NavLink maneje la navegación
    window.location.reload(); // Recarga la página
  };

  return (
    <Navbar expand="lg">
      <Container className="d-flex align-items-center">
        <div id="search-bar-container" className="containernvb d-flex align-items-center">
          <div className="logo-container">
            <Navbar.Brand>
              {/* Añadimos el manejador de clic al NavLink */}
              <NavLink to="/Home" className="navbar-brand" onClick={handleLogoClick}>
                <Logo />
              </NavLink>
            </Navbar.Brand>
          </div>
          <InputGroup className="search-group">
            <Form.Control
              id="search-input"
              placeholder={language === 'es' ? "Busca un Pokémon escribiendo su nombre" : "Find a Pokémon by writing its name"}
              onChange={handleSearch}
            />
            <InputGroup.Text id="start-search-button">
            <div id="new-search-button">
            <IoMdSearch className="start-search-icon mt-1" />
            </div>
            </InputGroup.Text>
          </InputGroup>
        </div>
      </Container>
    </Navbar>
  );
};

Header.propTypes = {
  setSearchTerm: PropTypes.func.isRequired, 
  language: PropTypes.string.isRequired, // Validamos que `language` sea una cadena
};

export default Header;