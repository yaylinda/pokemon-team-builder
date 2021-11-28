import Grid from '@mui/material/Grid';
import { produce } from 'immer';
import React, { useState } from 'react';
import { Pokemon } from '../types';
import OnePokemonInput from './OnePokemonInput';

const POKEMON_TEAM_SIZE = 6;

function PokemonInputSection() {

    const [pokemonTeamData, setPokemonTeamData] = useState<(Pokemon | null)[]>([null, null, null, null, null, null]);

    const onChangeSelectedPokemon = (index: number, pokemon: Pokemon | null) => {
        setPokemonTeamData(produce(pokemonTeamData, (draft) => {
            draft[index] = pokemon;
        }));
    }

    return (
        <Grid container spacing={2}>
            {
                Array.from(Array(POKEMON_TEAM_SIZE)).map((_, index) =>
                    <OnePokemonInput
                        key={`pokemon_${index}`}
                        index={index}
                        selectedPokemon={pokemonTeamData[index]}
                        onChangeSelectedPokemon={onChangeSelectedPokemon}
                    />)
            }
        </Grid>
    );
}

export default PokemonInputSection;