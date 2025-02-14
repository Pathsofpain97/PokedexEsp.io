import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Navbar, Container, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { IoMdSearch, IoMdClose } from "react-icons/io";
import "../styles/Navbar.css";
import { Logo } from "../components/Logo";

const Header = ({ setSearchTerm, language }) => {
  const [inputValue, setInputValue] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Detectar si es móvil inicialmente

  // Manejar el cambio de tamaño de la ventana
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize); // Limpiar el evento
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setSearchTerm(value);
  };

  const handleClearInput = () => {
    setInputValue("");
    setSearchTerm("");
  };

  const handleLogoClick = (event) => {
    event.preventDefault();
    window.location.reload();
  };

  // Placeholder según idioma y tamaño de pantalla
  const placeholderText = isMobile
    ? language === "es"
      ? "Busca a un Pokémon"
      : "Search a Pokémon"
    : language === "es"
    ? "Busca un Pokémon escribiendo su nombre"
    : "Find a Pokémon by writing its name";

  return (
    <Navbar expand="lg">
      <Container className="d-flex align-items-center">
        <div id="search-bar-container" className="containernvb d-flex align-items-center">
          <div className="logo-container">
            <Navbar.Brand>
              <NavLink to="/Home" className="navbar-brand" onClick={handleLogoClick}>
                <Logo />
              </NavLink>
            </Navbar.Brand>
          </div>
          <div className="search-group">
            <div className="input-wrapper">
              <Form.Control
                id="search-input"
                placeholder={placeholderText} // Cambiar placeholder dinámicamente
                onChange={handleSearch}
                value={inputValue}
              />
            </div>
            {inputValue && (
              <button
                id="clear-button"
                onClick={handleClearInput}
                className="clear-button"
                aria-label={language === "es" ? "Borrar búsqueda" : "Clear search"}
              >
                <IoMdClose className="clear-icon" />
              </button>
            )}
            <button
              id="start-search-button"
              className="search-button"
              onClick={() => document.getElementById("search-input").focus()}
              aria-label={language === "es" ? "Iniciar búsqueda" : "Start search"}
            >
              <IoMdSearch className="start-search-icon" />
            </button>
          </div>
        </div>
      </Container>
    </Navbar>
  );
};

Header.propTypes = {
  setSearchTerm: PropTypes.func.isRequired,
  language: PropTypes.string.isRequired,
};

export default Header;
