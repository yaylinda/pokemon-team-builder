import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import { PokemonNameMap, PokemonTeamEvaluationResults, PokemonType, SelectedPokemon } from '../types';
import { getSeribiiTypeImageUrl, SERIBII_BASE_URL } from '../util';

export interface PokemonTeamResultsSectionProps {
    results: PokemonTeamEvaluationResults,
    pokemonNameMap: PokemonNameMap,
}

function PokemonTeamResultsSection({ results, pokemonNameMap }: PokemonTeamResultsSectionProps) {

    const renderResultForType = (type: PokemonType) => {

        const resultsForType = results[type];

        return (
            <Paper variant="outlined" sx={{ padding: 2, display: 'flex', flexDirection: 'row' }}>
                <Box sx={{ display: 'flex', alignItems: 'center'}}>
                    <img
                        loading="lazy"
                        width="40"
                        src={getSeribiiTypeImageUrl(type)}
                        alt={type}
                    />
                </Box>

                <Divider orientation="vertical" variant="middle" flexItem />

                <Box sx={{ display: 'flex'}}>
                    <Typography gutterBottom variant="overline" component="div">Disadvantages</Typography>
                    {
                        resultsForType.pokemonWeakToType.map(pokemon => <Avatar
                            alt={pokemon.name}
                            src={`${SERIBII_BASE_URL}${pokemon.image_src}`}
                        />)
                    }
                </Box>

                <Divider orientation="vertical" variant="middle" flexItem />

                <Box sx={{ display: 'flex'}}>
                    <Typography gutterBottom variant="overline" component="div">Advantages</Typography>
                    {
                        Object.keys(resultsForType.pokemonWithMovesEffectiveAgainstType).map(pokemonName => {
                            const pokemon: SelectedPokemon = pokemonNameMap[pokemonName];
                            const moves = resultsForType.pokemonWithMovesEffectiveAgainstType[pokemonName];

                            if (!pokemon || !moves || !moves.length) {
                                return null;
                            }

                            return (
                                <React.Fragment>
                                    <Avatar
                                        alt={pokemon.name}
                                        src={`${SERIBII_BASE_URL}${pokemon.image_src}`}
                                    />
                                    {
                                        moves.map(move => (
                                            <Chip
                                                label={`${move.name}`}
                                                avatar={<Avatar src={getSeribiiTypeImageUrl(move.type)} />}
                                            />
                                        ))
                                    }
                                </React.Fragment>
                            )

                        })
                    }
                </Box>
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
