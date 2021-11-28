import Container from '@mui/material/Container';
import React, { useState } from 'react';
import { PokemonTeamEvaluationResults, SelectedPokemon } from '../types';
import { initializePokemonTeamEvaluationResults } from '../util';

export interface PokemonTeamAnalysisSectionProps {
    pokemonTeam: (SelectedPokemon | null)[],
}

function PokemonTeamAnalysisSection({ pokemonTeam }: PokemonTeamAnalysisSectionProps) {

    const [results, setResults] = useState<PokemonTeamEvaluationResults>(initializePokemonTeamEvaluationResults());

    return (
        <Container maxWidth={false}>

        </Container>
    );
}

export default PokemonTeamAnalysisSection;
