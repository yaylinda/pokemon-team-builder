import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import React from 'react';
import { PokemonNameMap, PokemonTeamEvaluationResults, PokemonType, SelectedPokemon } from '../types';
import { getSeribiiTypeImageUrl, SERIBII_BASE_URL } from '../util';

export interface PokemonTeamResultsSectionProps {
    results: PokemonTeamEvaluationResults,
    pokemonNameMap: PokemonNameMap,
}

function PokemonTeamResultsSection({ results, pokemonNameMap}: PokemonTeamResultsSectionProps) {

    const renderResultsForTypeCard = (type: PokemonType) => {

        const resultsForType = results[type];

        return (
            <Card>
                <CardHeader
                    avatar={<Avatar>type</Avatar>}
                    title={type}
                    subheader="type"
                />
                <CardContent>

                    <Typography gutterBottom variant="h5" component="div">Pokemon that are weak to {type}</Typography>
                    {
                        resultsForType.pokemonWeakToType.map(pokemon => <Avatar
                            alt={pokemon.name}
                            src={`${SERIBII_BASE_URL}${pokemon.image_src}`}
                        />)
                    }

                    <Typography gutterBottom variant="h5" component="div">Pokemon with moves that are strong against {type}</Typography>
                    {
                        Object.keys(resultsForType.pokemonWithMovesEffectiveAgainstType).map(pokemonName => {
                            const pokemon: SelectedPokemon = pokemonNameMap[pokemonName];

                            const moves = resultsForType.pokemonWithMovesEffectiveAgainstType[pokemonName];

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

                </CardContent>
            </Card>
        );
    }

    return (
        <div>
            {
                Object.keys(results).map(type => renderResultsForTypeCard(type as PokemonType))
            }
        </div>
    );
}

export default PokemonTeamResultsSection;
