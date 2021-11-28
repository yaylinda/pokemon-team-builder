import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import produce from 'immer';
import React, { useState } from 'react';
import PokemonInputSection from './pokemonInputSection/PokemonInputSection';
import PokemonTeamAnalysisSection from './pokemonTeamResultsSection/PokemonTeamResultsSection';
import { Pokemon, PokemonMove, SelectedPokemon } from './types';

function App() {

  const [pokemonTeam, setPokemonTeam] = useState<(SelectedPokemon | null)[]>([null, null, null, null, null, null]);

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

  const onChangeSelectedPokemonMove = (pokemonIndex: number, moveIndex: number, move: PokemonMove | null) => {
    setPokemonTeam(produce(pokemonTeam, (draft) => {
      const pokemonToUpdate = pokemonTeam[pokemonIndex];
      if (pokemonToUpdate === null) {
        return;
      }

      pokemonToUpdate.selectedMoves[moveIndex] = move;
    }));
  }

  const renderHeaderBar = () => {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Pokemon Brilliant Diamond and Shining Pearl Team Builder
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }

  return (
    <React.Fragment>
      <CssBaseline />

      <Container maxWidth={false}>
        {renderHeaderBar()}

        <PokemonInputSection
          pokemonTeam={pokemonTeam}
          onChangeSelectedPokemon={onChangeSelectedPokemon}
          onChangeSelectedPokemonMove={onChangeSelectedPokemonMove}
        />

        <PokemonTeamAnalysisSection
          pokemonTeam={pokemonTeam}
        />

      </Container>
    </React.Fragment>
  );
}

export default App;
