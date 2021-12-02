import Container from '@mui/material/Container';
import React from 'react';
import { PokemonTeamEvaluationResults } from '../types';

export interface PokemonTeamSummarySectionProps {
    results: PokemonTeamEvaluationResults,
};

function PokemonTeamSummarySection({ results }: PokemonTeamSummarySectionProps) {


    return (
        <Container sx={{ marginTop: 4 }}>

        </Container>
    );
}

export default PokemonTeamSummarySection;