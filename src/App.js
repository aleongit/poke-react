import './App.css'
import React, { useState, useEffect } from "react"
import ReactPaginate from 'react-paginate';
import PokemonList from './PokemonList'
import PokemonDetail from './PokemonDetail'

export const App = () => {

  const [pokemons, setPokemons] = useState([]) //ini array buida
  const [error, setError] = useState(undefined)
  const [loading, setLoading] = useState(true)
  const [toggleViewMode, setToggleViewMode] = useState(false);

  //paginate
  // We start with an empty list of items.
  const [currentPokemons, setCurrentPokemons] = useState([])
  const [pageCount, setPageCount] = useState(0)
  const [currentPage, setcurrentPage] = useState(0)
  
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0)
  const [itemsPerPage, ] = useState(12)

  //detall pokemon
  const [isDetail, setIsDetail] = useState(false)
  const [urlPokemon, setUrlPokemon] = useState(null)
  const [pokemon, setPokemon] = useState()

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

    const fetchDataDetail = async () => {
      try {
        const response = await fetch(urlPokemon)
        const data = await response.json()
        setPokemon(data)
        console.log('fetch data pokemon')

      } catch(e) {
        setError("Alguna cosa ha anat malament :(");
        console.log('fetch error')
      }
    }

    //si click a pokemon, fetch a url pokemon per detall
    console.log('is detail ? ' + isDetail )
    !isDetail? fetchData() : fetchDataDetail()

  }, [itemOffset, itemsPerPage, isDetail, urlPokemon ]) 
    //dependències per evitar bucle infinit per només cridar quan cal

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % pokemons.length;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    //canvi item inicial, tornarà a useEffect, fetch i slice
    setcurrentPage(event.selected)
    setItemOffset(newOffset)
  }

  //Create pokemonClick event listener, set url i detail per fetch a useEffect
  function pokemonClick(index) {
    console.log('pokemon click ' + index)
    setUrlPokemon(index)
    setIsDetail(true)
    console.log('is detail en click? ' + isDetail)
    console.log('setUrlPokemon ' + urlPokemon)
  }

  //test
  //console.log('currentPokemons '+ currentPokemons)
  //console.log('pageCount '+ pageCount)
  //console.log(pokemon)

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return <div>LOADING!</div>;
  }

  return (
    <div>
      <div className="header">
        {pokemon?
        <button 
          className="button" 
          onClick={() => {
            setPokemon()
            setIsDetail(false) }
            }>Pokemons
        </button>
        :
        <button
          className="button"
          onClick={() => setToggleViewMode(!toggleViewMode)}>
          {toggleViewMode ? 'list' : 'grid'}
        </button>
        }
      </div>

      {!pokemon?
      <div>
        <div className="botonera">
          <ReactPaginate
            breakLabel="..."
            previousLabel="<<"
            nextLabel=">>"
            onPageChange={handlePageClick}
            marginPagesDisplayed={2}
            pageRangeDisplayed={10}
            pageCount={pageCount}
            renderOnZeroPageCount={null}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
            forcePage={currentPage}
          />
        </div>   
        <PokemonList 
          pokemons={currentPokemons} 
          mode={toggleViewMode} 
          onClick={ pokemonClick } 
        />
      </div>
      :
        <PokemonDetail 
        pokemon={pokemon} 
        />
      }

    </div>

  );
};

export default App;
