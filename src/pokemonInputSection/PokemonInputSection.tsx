import Grid from '@mui/material/Grid';
import React, { useMemo } from 'react';
import { Pokemon, PokemonMove, SelectedPokemon } from '../types';
import OnePokemonInput from './OnePokemonInput';
import '../App.css';

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

    /**
     * 
     */
    const selectedPokemonNames: Set<string> = useMemo(() => new Set(pokemonTeam.filter(p => p !== null).map(p => p!.name)), [pokemonTeam]);

    return (
        <Grid
            container
            columns={{ xs: 1, sm: 2, md: 3, lg: 3, xl: 6 }}
            direction="row"
            justifyContent="center"
            alignItems="center"
            spacing={4}
            sx={{ marginTop: 1, marginBottom: 4 }}
        >
            {
                Array.from(Array(POKEMON_TEAM_SIZE)).map((_, index) =>
                    <Grid item className="PokemonInputCard" key={`pokemon_${index}`}>
                        <OnePokemonInput
                            index={index}
                            selectedPokemon={pokemonTeam[index]}
                            onChangeSelectedPokemon={onChangeSelectedPokemon}
                            onChangeSelectedPokemonMove={onChangeSelectedPokemonMove}
                            selectedPokemonNames={selectedPokemonNames}
                        />
                    </Grid>)
            }
        </Grid>
    );
}

export default PokemonInputSection;