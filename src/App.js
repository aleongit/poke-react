import './App.css'
import React, { useState, useEffect } from "react"
import ReactPaginate from 'react-paginate';
import PokemonList from './PokemonList'

export const App = () => {

  const [pokemons, setPokemons] = useState([]) //ini array buida
  const [error, setError] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [toggleViewMode, setToggleViewMode] = useState(false);

  //paginate
  // We start with an empty list of items.
  const [currentPokemons, setCurrentPokemons] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setitemsPerPage] = useState(12);


  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100")
        const data = await response.json()
        setPokemons(data.results)
        console.log('fetch data')
        setLoading(false)

        //paginate
        //limits
        const endOffset = itemOffset + itemsPerPage
        console.log(`Loading items from ${itemOffset} to ${endOffset}`)
        
        //nova array pokemons dels limits
        const slice = data.results.slice(itemOffset, endOffset)
        setCurrentPokemons(slice)

        //num pàgines
        setPageCount(Math.ceil(data.results.length / itemsPerPage))

      } catch(e) {
        setError("Alguna cosa ha anat malament :(");
        console.log('fetch error')
      }
    }
    fetchData()

  }, [itemOffset, itemsPerPage]) //dependències per evitar bucle infinit per només cridar quan cal

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % pokemons.length;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    //canvi item inicial, tornarà a useEffect, fetch i slice
    setItemOffset(newOffset);
  };

  //Create pokemonClick event listener
  function pokemonClick(index) {
    console.log(index)
  }

  //test
  //console.log('currentPokemons '+ currentPokemons)
  //console.log('pageCount '+ pageCount)

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

    <div className="botonera">
      <ReactPaginate
        breakLabel="..."
        previousLabel="<< previous"
        nextLabel="next >>"
        onPageChange={handlePageClick}
        marginPagesDisplayed={2}
        pageRangeDisplayed={10}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        containerClassName={"pagination"}
        subContainerClassName={"pages pagination"}
        activeClassName={"active"}
      />
    </div>

    <PokemonList pokemons={currentPokemons} mode={toggleViewMode} onClick={ pokemonClick } />

    </div>

  );
};

export default App;
