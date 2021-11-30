import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/system/Box';
import React, { useMemo } from 'react';
import pokemonData from '../pokemonData';
import { Pokemon, PokemonMove, SelectedPokemon } from '../types';
import { SERIBII_BASE_URL } from '../util';

const NUM_ALLOWED_MOVES = 4;

export interface OnePokemonInputProps {
    index: number;
    selectedPokemon: SelectedPokemon | null;
    onChangeSelectedPokemon: (index: number, pokemon: Pokemon | null) => void;
    onChangeSelectedPokemonMove: (pokemon_index: number, move_index: number, move: PokemonMove | null) => void,
    selectedPokemonNames: Set<string>,
}

function OnePokemonInput({
    index,
    selectedPokemon,
    onChangeSelectedPokemon,
    onChangeSelectedPokemonMove,
    selectedPokemonNames
}: OnePokemonInputProps) {

    /**
     * 
     */
    const selectedMoveNames: Set<string> = useMemo(() => {
        if (!selectedPokemon) {
            return new Set([]);
        }

        return new Set(selectedPokemon.selectedMoves.filter(m => m !== null).map(m => m!.name));
    }, [selectedPokemon]);

    /**
     * 
     * @returns 
     */
    const renderSelectPokemonInput = () => {
        return (
            <Autocomplete
                autoHighlight
                options={pokemonData.filter(p => !selectedPokemonNames.has(p.name))}
                size="small"
                getOptionLabel={(option) => option.name}
                renderOption={(props, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                        <img
                            loading="lazy"
                            width="20"
                            src={`${SERIBII_BASE_URL}${option.image_src}`}
                            alt={option.name}
                        />
                        {option.name}
                    </Box>
                )}
                renderInput={(params) => <TextField {...params} label={`Pokemon ${index + 1}`} size="small" />}
                onChange={(event, value) => onChangeSelectedPokemon(index, value)}
            />
        );
    }

    /**
     * 
     * @returns 
     */
    const renderSelectedPokemon = () => {
        return (
            <Box component="div" sx={{ height: 80, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {
                    selectedPokemon ?
                        <img
                            loading="lazy"
                            width="60"
                            src={`${SERIBII_BASE_URL}${selectedPokemon.image_src}`}
                            alt=""
                        /> : <Avatar sx={{ height: 60, width: 60 }}>?</Avatar>
                }
            </Box>
        );
    }

    /**
     * 
     * @param move_index 
     * @returns 
     */
    const selectMovesAutocomplete = (move_index: number) => (
        <Autocomplete
            className="PokemonMoveAutocomplete"
            key={`pokemon_${index}_move_${move_index}`}
            disabled={!selectedPokemon}
            size="small"
            autoHighlight
            options={(selectedPokemon?.moves || []).filter(m => !selectedMoveNames.has(m.name))}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
                <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
                    {option.name}
                </Box>
            )}
            renderInput={(params) => <TextField {...params} label={`Move ${move_index + 1}`} size="small" />}
            onChange={(event, value) => onChangeSelectedPokemonMove(index, move_index, value)}
        />
    );

    /**
     * 
     * @returns 
     */
    const renderSelectPokemonMoves = () => 
        Array.from(Array(NUM_ALLOWED_MOVES))
            .map((_, move_index) => 
                !selectedPokemon ? 
                <Tooltip title="Select a Pokemon before selecting its moves">
                    {selectMovesAutocomplete(move_index)}
                </Tooltip>: 
                selectMovesAutocomplete(move_index));

    /**
     * 
     */
    return (
        <Paper variant="outlined" sx={{ padding: 2 }}>
            {renderSelectPokemonInput()}
            {renderSelectedPokemon()}
            {renderSelectPokemonMoves()}
        </Paper>
    );
}

export default OnePokemonInput;