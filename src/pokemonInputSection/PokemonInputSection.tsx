import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { produce } from 'immer';
import React, { useState } from 'react';
import { Pokemon } from '../types';
import OnePokemonInput from './OnePokemonInput';

const POKEMON_TEAM_SIZE = 6;

function PokemonInputSection() {

    const [pokemonTeamData, setPokemonTeamData] = useState<(Pokemon | null)[]>([null, null, null, null, null, null]);

    const onChangeSelectedPokemon = (index: number, pokemon: Pokemon) => {
        setPokemonTeamData(produce(pokemonTeamData, (draft) => {
            draft[index] = pokemon;
        }));
    }

    return (
        <Grid container spacing={2}>
            {
                Array.from(Array(POKEMON_TEAM_SIZE))
                    .map((_, index) => 
                        <OnePokemonInput 
                            index={index}
                            selectedPokemon={pokemonTeamData[index]}
                            onChange={onChangeSelectedPokemon}
                        />)
                
            }
        </Grid>
    );
}

export default PokemonInputSection;