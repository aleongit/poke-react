import './App.css'
import React, { useState, useEffect } from "react"
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import ReactPaginate from 'react-paginate';
import PokemonList from './PokemonList'

export const App = () => {

  //recuperar state location, el qual conserva els valors de 'mode' i 'pag' previs (ruta detall)
  //const location = useLocation();
  /*
  if (location.state) {
  console.log('location / ' + location.state.mode)
  console.log('location / ' + location.state.pag)
  }
  */

  //hook navegació react-router
  const navigate = useNavigate();
  
  //per agafar paràmetres URL
  const [searchParams] = useSearchParams();
  console.log(searchParams.get('page')); // 'page'
  console.log(searchParams.get('mode')); // 'mode'

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
  
  //const [itemsPerPage, ] = useState(12)
  const ITEMS_PER_PAGE = 10

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
        const endOffset = itemOffset + ITEMS_PER_PAGE
        console.log(`Loading items from ${itemOffset} to ${endOffset}`)
        
        //nova array pokemons dels limits
        const slice = data.results.slice(itemOffset, endOffset)
        setCurrentPokemons(slice)

        //num pàgines
        setPageCount(Math.ceil(data.results.length / ITEMS_PER_PAGE))

      } catch(e) {
        setError("Alguna cosa ha anat malament :(");
        console.log('fetch error')
      }
    }

    fetchData();

  }, [itemOffset]) //dependències, per evitar bucle infinit per només cridar quan cal

  //al modificar searchParams, modifiquem estat
  useEffect(() => {
    /*
    if (params){
    setToggleViewMode(mode)
    setcurrentPage(page)
    setItemOffset((page)*10)
    }
    */
    console.log('canvi search params!')
    const page = searchParams.get('page')
    const mode = searchParams.get('mode')
    console.log('page ' + page + ' type ' + typeof(page) )
    console.log('mode ' + mode + ' type ' + typeof(mode) )

    if (parseInt(page)>=0 && parseInt(page) <= 10 ) {
      setcurrentPage(parseInt(page))
      setItemOffset(parseInt(page)*10)
    } else {
      navigate("/")
    }

    if (mode === 'true') {
      setToggleViewMode(true) 
    } else if (mode === 'false') {
      setToggleViewMode(false) 
    } else {
        navigate("/")
    }

  }, [searchParams]) 
  
  
  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    
    const page = event.selected
    
    const newOffset = (page * ITEMS_PER_PAGE) % pokemons.length
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`)
    //canvi item inicial, tornarà a useEffect, fetch i slice
    setcurrentPage(page)
    setItemOffset(newOffset)
    //navigate(`/page=${page}`, { state: { newId: id } })
    navigate(`?page=${page}&mode=${toggleViewMode}`)
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

        <button
          className="button"
          onClick={() => {
            setToggleViewMode(!toggleViewMode)
            navigate(`?page=${currentPage}&mode=${!toggleViewMode}`)
          }
          }>
          {toggleViewMode ? 'list' : 'grid'}
        </button>
          {/*toggleViewMode ? 'true' : 'false'*/}

      </div>

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
            forcePage={currentPage} //es posiciona a pàgina activa
          />
        </div>   
        
        <PokemonList 
          pokemons={currentPokemons} 
          mode={toggleViewMode} //passar mode actual per prop
          pag={currentPage} //passar pàgina actual per prop
        />

      </div>
        
    </div>

  );
};

export default App;
