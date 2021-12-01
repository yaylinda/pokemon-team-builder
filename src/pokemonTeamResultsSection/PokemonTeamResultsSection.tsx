import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { isEmpty } from 'lodash';
import React from 'react';
import { NoDataText, PokemonAvatar, VerticalDivider } from '../common';
import { PokemonMove, PokemonMoveMap, PokemonNameMap, PokemonTeamEvaluationResults, PokemonType, SelectedPokemon } from '../types';
import { getSeribiiTypeImageUrl } from '../util';

export interface PokemonTeamResultsSectionProps {
    results: PokemonTeamEvaluationResults,
    pokemonNameMap: PokemonNameMap,
}

function PokemonTeamResultsSection({ results, pokemonNameMap }: PokemonTeamResultsSectionProps) {

    /**
     * 
     * @param pokemonWeakToType 
     * @returns 
     */
    const renderPokemonWeakToType = (pokemonWeakToType: SelectedPokemon[]) => {
        return (
            <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                <Typography variant="overline" component="div">
                    Disadvantages
                </Typography>
                {
                    (pokemonWeakToType.length && pokemonWeakToType)
                        ? <Stack direction="row" spacing={1}>{pokemonWeakToType.map(PokemonAvatar)}</Stack>
                        : <NoDataText />
                }
            </Box>
        );
    }

    /**
     * 
     * @param param0 
     */
    const renderPokemonWithMoves = ({
        pokemon,
        moves,
    }: {
        pokemon: SelectedPokemon,
        moves: PokemonMove[],
    }) => {
        return (
            <Box sx={{ display: 'flex', flex: 1, flexDirection: 'row', alignItems: 'center' }} key={`pokemon_${pokemon.name}_with_moves`}>
                <PokemonAvatar {...pokemon} />
                <Stack direction="row" spacing={1}>
                    {
                        moves.map(move => (
                            <Chip
                                key={`pokemon_${pokemon.name}_move_${move.name}`}
                                size="small"
                                label={`${move.name}`}
                                avatar={<Avatar src={getSeribiiTypeImageUrl(move.type)} />}
                            />
                        ))
                    }
                </Stack>
            </Box>
        );
    };

    /**
     * 
     * @param pokemonWithMovesEffectiveAgainstType 
     * @returns 
     */
    const renderPokemonWithMovesEffectiveAgainstType = (pokemonWithMovesEffectiveAgainstType: PokemonMoveMap) => {
        return (
            <Box sx={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
                <Typography variant="overline" component="div">
                    Advantages
                </Typography>
                {
                    isEmpty(pokemonWithMovesEffectiveAgainstType)
                        ? <NoDataText />
                        : Object.keys(pokemonWithMovesEffectiveAgainstType).map(pokemonName => {
                            const pokemon: SelectedPokemon = pokemonNameMap[pokemonName];
                            const moves = pokemonWithMovesEffectiveAgainstType[pokemonName];
                            return renderPokemonWithMoves({ pokemon, moves });
                        })
                }
            </Box>
        );
    }

    /**
     * 
     * @param type 
     * @returns 
     */
    const renderResultForType = (type: PokemonType) => {

        const { pokemonWeakToType, pokemonWithMovesEffectiveAgainstType } = results[type];

        return (
            <Paper variant="outlined" sx={{ padding: 2, marginBottom: 2, display: 'flex', flexDirection: 'row' }} key={`result_${type}`}>
                <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} sx={{display: 'flex', flex: 1, flexDirection: 'row' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <img
                            loading="lazy"
                            width="40"
                            src={getSeribiiTypeImageUrl(type)}
                            alt={type}
                        />
                    </Box>

                    <VerticalDivider />

                    <Stack direction={{ xs: 'column', sm: 'column', md: 'row' }} sx={{ display: 'flex', width: '100%' }}>
                        {renderPokemonWeakToType(pokemonWeakToType)}
                        <VerticalDivider />
                        {renderPokemonWithMovesEffectiveAgainstType(pokemonWithMovesEffectiveAgainstType)}
                    </Stack>
                </Stack>
            </Paper>
        );
    }

    return (
        <Container sx={{ marginTop: 4 }}>
            {
                Object.keys(results).map(type => renderResultForType(type as PokemonType))
            }
        </Container>
    );
}

export default PokemonTeamResultsSection;
