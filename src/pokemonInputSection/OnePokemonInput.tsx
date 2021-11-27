import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/system/Box';
import React, { useState } from 'react';
import pokemonData from '../pokemonData';
import { Pokemon } from '../types';
import { SERIBII_BASE_URL } from '../util';

export interface OnePokemonInput {
    index: number;
    selectedPokemon: Pokemon | null;
    onChange: (pokemon: Pokemon) => void;
}

function OnePokemonInput({index, selectedPokemon, onChange}: OnePokemonInput) {

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

    return (
        <div>
            {renderSelectPokemonInput()}

        </div>
    );
}

export default OnePokemonInput;