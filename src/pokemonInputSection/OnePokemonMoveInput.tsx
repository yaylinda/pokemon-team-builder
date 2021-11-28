import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { PokemonMove } from '../types';

export interface OnePokemonMoveInput {
    index: number,
    value: PokemonMove | null
    moveOptions: PokemonMove[],
    onChange: (index: number, value: PokemonMove | null) => void,
}

function OnePokemonMoveInput({ index, value, moveOptions, onChange}: OnePokemonMoveInput) {
    return (
        <Autocomplete
                autoHighlight
                options={moveOptions}
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                      {option.name}
                    </Box>
                  )}
                renderInput={(params) => <TextField {...params} label="Move" />}
            />
    );
}

export default OnePokemonMoveInput;