import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import '../styles/Loading.css'; 

import pokeball from '../assets/pokeball-icon.png'; 

const LoadingPokeball = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Inicializa el hook

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      navigate('/Home'); // Cambia a la ruta que desees
    }, 6000); 

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    loading && (
      <div id="loading-div">
        <img src={pokeball} alt="Pokeball" className="loading-ball" />
      </div>
    )
  );
};

export default LoadingPokeball;