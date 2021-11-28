import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import React from 'react';
import pokemonData from '../pokemonData';
import { Pokemon, PokemonMove, SelectedPokemon } from '../types';
import { SERIBII_BASE_URL } from '../util';

const NUM_ALLOWED_MOVES = 4;

export interface OnePokemonInputProps {
    index: number;
    selectedPokemon: SelectedPokemon | null;
    onChangeSelectedPokemon: (index: number, pokemon: Pokemon | null) => void;
    onChangeSelectedPokemonMove: (pokemon_index: number, move_index: number, move: PokemonMove | null) => void,
}

function OnePokemonInput({
    index,
    selectedPokemon,
    onChangeSelectedPokemon,
    onChangeSelectedPokemonMove,
}: OnePokemonInputProps) {

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
            selectedPokemon ?
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
                        onChange={(event, value) => onChangeSelectedPokemonMove(index, move_index, value)}
                    />) :
                <Typography variant="overline" display="block">
                    Select a Pokemon before selecting moves
                </Typography>
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