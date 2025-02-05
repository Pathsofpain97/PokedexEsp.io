import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
import LoadingPokeball from './pages/LoadingPokeball';





function App() {
    return (
      <>
        <BrowserRouter>
          <Routes>
          <Route path="/" element={<LoadingPokeball />}></Route>
          <Route path="/Home" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </>
    );
  }

  export default App