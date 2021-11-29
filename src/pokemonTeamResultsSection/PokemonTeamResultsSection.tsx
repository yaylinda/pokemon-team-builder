import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import { PokemonTeamEvaluationResults, PokemonType, PokemonTypeEvaluation, SelectedPokemon } from '../types';
import { evaluateTeam, initializePokemonTeamEvaluationResults, SERIBII_BASE_URL } from '../util';

export interface PokemonTeamAnalysisSectionProps {
    pokemonTeam: (SelectedPokemon | null)[],
}

function PokemonTeamAnalysisSection({ pokemonTeam }: PokemonTeamAnalysisSectionProps) {

    const [results, setResults] = useState<PokemonTeamEvaluationResults>(initializePokemonTeamEvaluationResults());

    useEffect(() => {
        if (pokemonTeam.every(p => p === null)) {
            return;
        }
        setResults(evaluateTeam(pokemonTeam.filter(pokemon => pokemon !== null) as SelectedPokemon[]));
    }, [pokemonTeam]);

    const renderResultsForTypeCard = (type: PokemonType) => {

        console.log(`*************** ${JSON.stringify(results)}`);

        return (
            <Card>
                <CardHeader
                    avatar={<Avatar>type</Avatar>}
                    title={type}
                    subheader="type"
                />
                <CardContent>

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
