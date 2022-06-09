import './App.css'
import React, { useState, useEffect } from "react"
import PokemonList from './PokemonList'

export const App = () => {

  const [pokemons, setPokemons] = useState([]) //ini array buida
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [toggleViewMode, setToggleViewMode] = useState(false);

  //paginate

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
        const data = await response.json()
        setPokemons(data.results)
        console.log('fetch data')
        setLoading(false)

      } catch(e) {
        setError("Alguna cosa ha anat malament :(");
        console.log('fetch error')
      }
    }
    fetchData()

  }, []) //array buida a dependències per evitar bucle infinit per només cridar al muntar

  //Create pokemonClick event listener
  function pokemonClick(index) {
    console.log(index)
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return <div>LOADING!</div>;
  }

  return (
    <div>

    <div className="header">
      <button
        className="button"
        onClick={() => setToggleViewMode(!toggleViewMode)}
      >
        {toggleViewMode ? 'list' : 'grid'}
      </button>
    </div>

    <PokemonList pokemons={pokemons} mode={toggleViewMode} onClick={ pokemonClick } />
    </div>

  );
};

export default App;
