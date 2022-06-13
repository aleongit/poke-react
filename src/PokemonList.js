import './PokemonList.css'
import React from 'react';
import { Link } from "react-router-dom";

function PokemonList(props) {
    const mode = props.mode
    const pag = props.pag
    const pokemonListItems = props.pokemons.map((pokemon, index) => {

        //extrec id de url
        const split = pokemon.url.split('/')
        const id = split[split.length - 2]

        return (
            <Link
                to={`/detail/${id}`}
                key={id}
                /*state={ {mode: mode, pag: pag}}*/ //per recuperar després amb location.state
                className={`item ${mode ? 'item-list' : 'item-grid'}`}
            >
                { pokemon.name }
            </Link>
        );
    });

    return (
        <div className={mode ? 'list' : 'grid'}>
            { pokemonListItems }
        </div>
    );
}

export default PokemonList;