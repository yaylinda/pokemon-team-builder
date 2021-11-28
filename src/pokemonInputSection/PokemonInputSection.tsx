import Grid from '@mui/material/Grid';
import React from 'react';
import { Pokemon, PokemonMove, SelectedPokemon } from '../types';
import OnePokemonInput from './OnePokemonInput';

const POKEMON_TEAM_SIZE = 6;

export interface PokemonInputSectionProps {
    pokemonTeam: (SelectedPokemon | null)[],
    onChangeSelectedPokemon: (index: number, pokemon: Pokemon | null) => void,
    onChangeSelectedPokemonMove: (pokemon_index: number, move_index: number, move: PokemonMove | null) => void,
}

function PokemonInputSection({
    pokemonTeam,
    onChangeSelectedPokemon,
    onChangeSelectedPokemonMove,
}: PokemonInputSectionProps) {

    return (
        <Grid container spacing={2}>
            {
                Array.from(Array(POKEMON_TEAM_SIZE)).map((_, index) =>
                    <OnePokemonInput
                        key={`pokemon_${index}`}
                        index={index}
                        selectedPokemon={pokemonTeam[index]}
                        onChangeSelectedPokemon={onChangeSelectedPokemon}
                        onChangeSelectedPokemonMove={onChangeSelectedPokemonMove}
                    />)
            }
        </Grid>
    );
}

export default PokemonInputSection;