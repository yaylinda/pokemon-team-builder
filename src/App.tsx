import Alert from '@mui/material/Alert';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import LinearProgress from '@mui/material/LinearProgress';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import produce from 'immer';
import React, { useEffect, useMemo, useState } from 'react';
import PokemonInputSection from './components/PokemonInputSection';
import PokemonTeamResultsSection from './components/PokemonTeamResultsSection';
import PokemonTeamSummarySection from './components/PokemonTeamSummarySection';
import { Pokemon, PokemonMove, PokemonNameMap, PokemonTeamEvaluationResults, SelectedPokemon } from './types';
import { evaluateTeam, initializePokemonTeamEvaluationResults } from './util';

const BDSP_POKEMON_DATA_JSON = 'https://raw.githubusercontent.com/yaylinda/serebii-parser/master/data/pokedex-bdsp.json';
const SV_POKEMON_DATA_JSON = 'https://raw.githubusercontent.com/yaylinda/serebii-parser/master/data/pokedex-sv.json';

function App() {

    const [loading, setLoading] = useState<boolean>(true);
    const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
    const [loadingError, setLoadingError] = useState<string>('');

    /**
     * 
     */
    const [pokemonTeam, setPokemonTeam] = useState<(SelectedPokemon | null)[]>([null, null, null, null, null, null]);

    /**
     * 
     */
    const [results, setResults] = useState<PokemonTeamEvaluationResults>(initializePokemonTeamEvaluationResults());

    /**
     * 
     */
    useEffect(() => {
        const fetchPokemonData = async () => {
            try {
                setLoading(false);
                setLoadingError('');
                const response = await fetch(SV_POKEMON_DATA_JSON);
                const responseJson = await response.json();
                setPokemonData(responseJson as Pokemon[]);
            } catch (error) {
                setLoadingError(`Error fetching BDSP Pokemon Data. Please try again later.`);
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPokemonData();
    }, []);

    /**
     * 
     */
    const pokemonMapByName: PokemonNameMap = useMemo(
        () => pokemonTeam
            .filter(pokemon => pokemon !== null)
            .reduce((prev, pokemon) => ({
                ...prev,
                [pokemon!.name]: pokemon,
            }), {}), [pokemonTeam]);

    /**
     * 
     */
    useEffect(() => {
        setResults(evaluateTeam(pokemonTeam.filter(pokemon => pokemon !== null) as SelectedPokemon[]));
    }, [pokemonTeam]);

    /**
     * 
     * @param index 
     * @param pokemon 
     */
    const onChangeSelectedPokemon = (index: number, pokemon: Pokemon | null) => {
        setPokemonTeam(produce(pokemonTeam, (draft) => {
            if (pokemon === null) {
                draft[index] = null;
            } else {
                draft[index] = {
                    ...pokemon,
                    selectedMoves: [null, null, null, null],
                };
            }
        }));
    }

    /**
     * 
     * @param pokemonIndex 
     * @param moveIndex 
     * @param move 
     */
    const onChangeSelectedPokemonMove = (pokemonIndex: number, moveIndex: number, move: PokemonMove | null) => {
        setPokemonTeam(produce(pokemonTeam, (draft) => {
            const pokemonToUpdate = draft[pokemonIndex];
            if (pokemonToUpdate === null) {
                return;
            }

            pokemonToUpdate.selectedMoves[moveIndex] = move;
        }));
    }

    /**
     * 
     * @returns 
     */
    const renderHeaderBar = () => {
        return (
            <AppBar position="static">
                <Toolbar sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                    <Avatar src={`${process.env.PUBLIC_URL}/pokeball.png`} sx={{ backgroundColor: 'white', marginRight: 2 }} />
                    <Typography variant="h6" component="div">
                        Pokemon Team Builder
                    </Typography>
                    <Avatar src={`${process.env.PUBLIC_URL}/pokeball.png`} sx={{ backgroundColor: 'white', marginLeft: 2 }} />
                </Toolbar>
            </AppBar>
        );
    }

    /**
     * 
     * @returns 
     */
    const renderContent = () => {
        if (loadingError) {
            return (
                <Container>
                    <Alert severity="error">{loadingError}</Alert>
                </Container>
            );
        }

        return (
            <Container>
                <PokemonInputSection
                    pokemonTeam={pokemonTeam}
                    onChangeSelectedPokemon={onChangeSelectedPokemon}
                    onChangeSelectedPokemonMove={onChangeSelectedPokemonMove}
                    pokemonData={pokemonData}
                />

                <Divider>
                    <Chip label="SUMMARY" color="primary" variant="outlined" />
                </Divider>

                <PokemonTeamSummarySection
                    results={results}
                />

                <Divider>
                    <Chip label="RESULTS" color="primary" variant="outlined" />
                </Divider>

                <PokemonTeamResultsSection
                    results={results}
                    pokemonNameMap={pokemonMapByName}
                />
            </Container>
        );
    }

    /**
     * 
     * @returns 
     */
    const renderLoading = () => {
        return (
            <Container>
                <LinearProgress />
            </Container>
        );
    }

    /**
     * 
     */
    return (
        <React.Fragment>

            {renderHeaderBar()}

            {
                loading ? renderLoading() : renderContent()
            }

        </React.Fragment>
    );
}

export default App;
