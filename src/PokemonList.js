import './PokemonList.css'
import React from 'react';

function PokemonList(props) {
    const mode = props.mode
    //console.log(props.mode)

    const pokemonListItems = props.pokemons.map((pokemon, index) => {
        return (
            <div key={pokemon.url} 
                className={`item ${mode ? 'item-list' : 'item-grid'}`}
                onClick={ () => props.onClick(pokemon.url) }
            >
                { pokemon.name }
            </div>
        );
    });

    return (
        <div className={mode ? 'list' : 'grid'}>
            { pokemonListItems }
        </div>
    );
}

export default PokemonList;