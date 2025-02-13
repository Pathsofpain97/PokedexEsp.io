import { useState, useEffect } from 'react';
import { Container } from "react-bootstrap";
import CurrentPokemon from "../components/CurrentPokemon";
import Header from "../components/Navbar";
import TypeList from "../components/TypesList";
import PokemonCards from "../components/PokemonCards";
import "../App.css";
import arrow from '../assets/arrow-up-icon.png';

const Home = () => {
  const [language, setLanguage] = useState("es");
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false); // Estado para el efecto del botón de idioma
  const [isImageLoaded, setIsImageLoaded] = useState(false); // Estado para la precarga de la imagen

  const handlePokemonSelect = (id) => {
    setSelectedPokemonId(id);
  };

  const closePokemonInfo = () => {
    setSelectedPokemonId(null);
  };

  // Precargar la imagen
  useEffect(() => {
    const img = new Image();
    img.src = arrow;
    img.onload = () => setIsImageLoaded(true); // La imagen está cargada
  }, []);

  // Mostrar el botón "Back to Top" y detectar scroll
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 3200) {
        setIsBackToTopVisible(true);
      } else {
        setIsBackToTopVisible(false);
      }

      // Detectamos si el usuario está haciendo scroll
      if (window.scrollY > 100) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    // Limpia el evento al desmontar el componente
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  // Función para hacer scroll hacia arriba
  const backToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // Función para cambiar el idioma
  const toggleLanguage = () => {
    setLanguage(language === "es" ? "en" : "es");
  };

  return (
    <div className="home-page">
      <header>
        {/* Componente Header que ahora recibe el idioma */}
        <Header setSearchTerm={setSearchTerm} language={language} />
      </header>

      {/* Botón de cambio de idioma con efecto al hacer scroll */}
      <button
        onClick={toggleLanguage}
        className={`language-toggle-button ${isScrolling ? "scrolling" : ""}`}
      >
        {language === "es" ? "Switch to English" : "Cambiar a Español"}
      </button>

      <Container className="text-center mt-3 mb-4 p-3">
        {/* Componente TypeList que ahora recibe el idioma */}
        <TypeList setTypeFilter={setTypeFilter} language={language} />
      </Container>

      <Container className="mt-3 mb-5 p-3">
        {/* Componente PokemonCards que ahora recibe el idioma */}
        <PokemonCards
          searchTerm={searchTerm}
          typeFilter={typeFilter}
          onPokemonSelect={handlePokemonSelect}
          language={language}
        />
      </Container>

      {selectedPokemonId && (
        <CurrentPokemon
          pokemonId={selectedPokemonId}
          closePokemonInfo={closePokemonInfo}
          language={language}
          className="p-3"
        />
      )}

      {/* Mostrar el botón "Back to Top" solo si la imagen está cargada y es visible */}
      {isBackToTopVisible && isImageLoaded && (
        <div className="back-to-top-button" onClick={backToTop}>
          <img src={arrow} alt="Back to Top" />
        </div>
      )}
    </div>
  );
};

export default Home;