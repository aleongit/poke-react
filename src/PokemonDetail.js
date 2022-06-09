
import './PokemonDetail.css'
import React from 'react';

function PokemonDetail(props) {

    console.log(props.pokemon.name)
    //console.log(props.pokemon.sprites.front_default)

    return (
        <div>
            <div className="name">{props.pokemon.name} !</div>
            <div className="img">
                <img
                    src={props.pokemon.sprites.front_default} 
                    alt={props.pokemon.name}>
                </img>
            </div>
        </div>
    );


}

export default PokemonDetail;
