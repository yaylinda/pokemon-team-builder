import Container from '@mui/material/Container';
import React, { useEffect, useState } from 'react';
import { PokemonTeamEvaluationResults, SelectedPokemon } from '../types';
import { initializePokemonTeamEvaluationResults } from '../util';

export interface PokemonTeamAnalysisSectionProps {
    pokemonTeam: (SelectedPokemon | null)[],
}

function PokemonTeamAnalysisSection({ pokemonTeam }: PokemonTeamAnalysisSectionProps) {

    const [results, setResults] = useState<PokemonTeamEvaluationResults>(initializePokemonTeamEvaluationResults());

    useEffect(() => {
        setResults(pokemonTeam);
    }, [pokemonTeam]);

    return (
        <Container maxWidth={false}>

        </Container>
    );
}

export default PokemonTeamAnalysisSection;
