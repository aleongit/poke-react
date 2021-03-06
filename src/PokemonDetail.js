import './PokemonDetail.css'
import React, { useState, useEffect } from "react"
import { useParams, Link, useLocation, useNavigate } from "react-router-dom";

function PokemonDetail() {

    //recuperem i passem location.state a '/'
    /*
    const location = useLocation();
    console.log('location detail ' + location.state.mode)
    console.log('location detail ' + location.state.pag)
    */

    //usar navegació react-router
    const navigate = useNavigate();

    const {id} = useParams()
    console.log(id)

     //inicialitzar obj pokemon, sinó undefined a html quan encara no té obj
    const [pokemon, setPokemon] = useState(
            {
            name: "",
            sprites: {
                front_default: "",
                }
            }
        )
    
    const fetchDataDetail = () => {
        fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(response => response.json())
        .then(data => {
            setPokemon(data)
            console.log('fetch data pokemon')
            })
        .catch(e => console.log('fetch error'))
      }
    
    useEffect(() => {
        fetchDataDetail();
    }, [])

    console.log(pokemon)
    console.log(pokemon.sprites.front_default)

    return (
        <div>

            <div className="header">
                {/*
                <Link className="button"
                    to='/'
                    state={location.state}>
                    Pokemons
                </Link>
            */}
            <button className="button" onClick={ () => navigate(-1) }>
                Pokemons
            </button>

            </div>

            <div className="name"> {pokemon.name} !</div>
            <div className="img">
                <img
                        src={pokemon.sprites.front_default} 
                        alt={pokemon.name}>
                </img>

            </div>
        </div>
    );

}

export default PokemonDetail;
