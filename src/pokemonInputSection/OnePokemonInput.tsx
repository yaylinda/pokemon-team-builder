import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/system/Box';
import { produce } from 'immer';
import React, { useState } from 'react';
import pokemonData from '../pokemonData';
import { Pokemon, PokemonMove } from '../types';
import { SERIBII_BASE_URL } from '../util';
import OnePokemonMoveInput from './OnePokemonMoveInput';

const NUM_ALLOWED_MOVES = 4;

export interface OnePokemonInput {
    index: number;
    selectedPokemon: Pokemon | null;
    onChange: (index: number, pokemon: Pokemon) => void;
}

function OnePokemonInput({ index, selectedPokemon, onChange }: OnePokemonInput) {

    const [selectedMoves, setSelectedMoves] = useState<(PokemonMove | null)[]>([null, null, null, null]);

    const onChangeSelectedMove = (index: number, move: PokemonMove | null) => {
        setSelectedMoves(produce(selectedMoves, (draft) => {
            selectedMoves[index] = move;
        }));
    }

    const renderSelectPokemonInput = () => {
        return (
            <Autocomplete
                autoHighlight
                options={pokemonData}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        <img
                            loading="lazy"
                            width="20"
                            src={`${SERIBII_BASE_URL}${option.image_src}`}
                            alt=""
                        />
                        {option.name}
                    </Box>
                )}
                renderInput={(params) => <TextField {...params} label="Pokemon" />}
            />
        );
    }

    const renderSelectPokemonMoves = () => {
        Array.from(Array(NUM_ALLOWED_MOVES))
            .map((_, index) => {
                if (selectedPokemon === null) {
                    return null;
                }

                return (
                    <OnePokemonMoveInput 
                        index={index}
                        value={selectedMoves[index]}
                        moveOptions={selectedPokemon.moves}
                        onChange={onChangeSelectedMove}
                    />
                );
            })
    }

    return (
        <div>
            {renderSelectPokemonInput()}
            {renderSelectPokemonMoves()}
        </div>
    );
}

export default OnePokemonInput;