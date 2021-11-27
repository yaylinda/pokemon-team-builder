import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import PokemonInputSection from './pokemonInputSection/PokemonInputSection';
import PokemonTeamAnalysisSection from './pokemonTeamAnalysisSection/PokemonTeamAnalysisSection';

function App() {
  return (
    <React.Fragment>

      <CssBaseline />
      <Container maxWidth={false}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Pokemon Brilliant Diamond and Shining Pearl Team Builder
            </Typography>
          </Toolbar>
        </AppBar>

        <PokemonInputSection />
        <PokemonTeamAnalysisSection />

      </Container>
    </React.Fragment>
  );
}

export default App;
