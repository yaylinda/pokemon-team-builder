import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import React, { useEffect, useMemo, useState } from 'react';
import { PokemonNameMap, PokemonTeamEvaluationResults, PokemonType, PokemonTypeEvaluation, SelectedPokemon } from '../types';
import { evaluateTeam, getSeribiiTypeImageUrl, initializePokemonTeamEvaluationResults, SERIBII_BASE_URL } from '../util';

export interface PokemonTeamAnalysisSectionProps {
    pokemonTeam: (SelectedPokemon | null)[],
}

function PokemonTeamAnalysisSection({ pokemonTeam }: PokemonTeamAnalysisSectionProps) {

    const pokemonMapByName: PokemonNameMap = useMemo(
        () => pokemonTeam
            .filter(pokemon => pokemon !== null)
            .reduce((prev, pokemon) => ({
                ...prev,
                [pokemon!.name]: pokemon,
            }), {}), [pokemonTeam]);

    const [results, setResults] = useState<PokemonTeamEvaluationResults>(initializePokemonTeamEvaluationResults());

    useEffect(() => {
        if (pokemonTeam.every(p => p === null)) {
            return;
        }
        setResults(evaluateTeam(pokemonTeam.filter(pokemon => pokemon !== null) as SelectedPokemon[]));
    }, [pokemonTeam]);

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
                            const pokemon: SelectedPokemon = pokemonMapByName[pokemonName];

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
                                                avatar={<Avatar src={getSeribiiTypeImageUrl(move.type)}/>}
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

export default PokemonTeamAnalysisSection;
