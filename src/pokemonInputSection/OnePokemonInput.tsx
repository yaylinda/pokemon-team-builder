import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Box from '@mui/system/Box';
import { produce } from 'immer';
import React, { useState } from 'react';
import pokemonData from '../pokemonData';
import { Pokemon, PokemonMove } from '../types';
import { SERIBII_BASE_URL } from '../util';

const NUM_ALLOWED_MOVES = 4;

export interface OnePokemonInputProps {
    index: number;
    selectedPokemon: Pokemon | null;
    onChangeSelectedPokemon: (index: number, pokemon: Pokemon | null) => void;
}

function OnePokemonInput({ index, selectedPokemon, onChangeSelectedPokemon }: OnePokemonInputProps) {

    const [selectedMoves, setSelectedMoves] = useState<(PokemonMove | null)[]>([null, null, null, null]);

    const onChangeSelectedMove = (index: number, move: PokemonMove | null) => {
        setSelectedMoves(produce(selectedMoves, (draft) => {
            draft[index] = move;
        }));
    }

    const renderSelectedPokemon = () => {
        return selectedPokemon ?
            <Avatar
                alt={selectedPokemon.name}
                src={`${SERIBII_BASE_URL}${selectedPokemon.image_src}`}
            /> :
            <Avatar>?</Avatar>
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
                onChange={(event, value) => onChangeSelectedPokemon(index, value)}
            />
        );
    }

    const renderSelectPokemonMoves = () => {
        return (
            Array.from(Array(NUM_ALLOWED_MOVES)).map((_, move_index) =>
                <Autocomplete
                    key={`pokemon_${index}_move_${move_index}`}
                    disabled={!selectedPokemon}
                    autoHighlight
                    options={selectedPokemon?.moves || []}
                    getOptionLabel={(option) => option.name}
                    renderOption={(props, option) => (
                        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                            {option.name}
                        </Box>
                    )}
                    renderInput={(params) => <TextField {...params} label="Move" />}
                    onChange={(event, value) => onChangeSelectedMove(move_index, value)}
                />)
        );
    }

    return (
        <div>
            {renderSelectedPokemon()}
            {renderSelectPokemonInput()}
            {renderSelectPokemonMoves()}
        </div>
    );
}

export default OnePokemonInput;