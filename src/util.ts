import { intersection } from 'lodash';

import { PokemonMoveMap, PokemonTeamEvaluationResults, PokemonType, PokemonTypeMap, SelectedPokemon } from "./types";

export const SERIBII_BASE_URL = 'https://www.serebii.net';

export const allTypes: PokemonType[] = [
    'normal',
    'fighting',
    'flying',
    'poison',
    'ground',
    'rock',
    'bug',
    'ghost',
    'steel',
    'fire',
    'water',
    'grass',
    'electric',
    'psychic',
    'ice',
    'dragon',
    'dark',
    'fairy',
];

export const typeWeaknesses: PokemonTypeMap = {
    'fairy': ['poison', 'steel'],
    'steel': ['fire', 'fighting', 'ground'],
    'dark': ['fighting', 'bug', 'fairy'],
    'dragon': ['ice', 'dragon', 'fairy'],
    'ghost': ['ghost', 'dark'],
    'rock': ['water', 'grass', 'fighting', 'ground', 'steel'],
    'bug': ['fire', 'flying', 'rock'],
    'psychic': ['bug', 'ghost', 'dark'],
    'flying': ['electric', 'ice', 'rock'],
    'ground': ['water', 'ice', 'grass'],
    'poison': ['ground', 'psychic'],
    'fighting': ['flying', 'psychic', 'fairy'],
    'ice': ['fire', 'fighting', 'rock', 'steel'],
    'grass': ['fire', 'ice', 'poison', 'flying', 'bug'],
    'electric': ['ground'],
    'water': ['electric', 'grass'],
    'fire': ['water', 'ground', 'rock'],
    'normal': ['fighting'],
};

export const typeEffectivenesses: PokemonTypeMap = {
    'fairy': ['fighting', 'dragon', 'dark'],
    'steel': ['ice', 'rock', 'fairy'],
    'dark': ['ghost', 'psychic'],
    'dragon': ['dragon'],
    'ghost': ['ghost', 'psychic'],
    'rock': ['fire', 'flying', 'ice', 'bug'],
    'bug': ['grass', 'psychic', 'dark'],
    'psychic': ['fighting', 'poison'],
    'flying': ['grass', 'fighting', 'bug'],
    'ground': ['fire', 'electric', 'poison', 'rock', 'steel'],
    'poison': ['grass', 'fairy'],
    'fighting': ['ice', 'normal', 'rock', 'dark', 'steel',],
    'ice': ['grass', 'ground', 'flying', 'dragon'],
    'grass': ['water', 'ground', 'rock'],
    'electric': ['water', 'flying'],
    'water': ['fire', 'ground', 'rock'],
    'fire': ['grass', 'ice', 'bug', 'steel'],
    'normal': [],
};

export const initializePokemonTeamEvaluationResults = (): PokemonTeamEvaluationResults => {
    return allTypes.reduce((prev, type) => ({
        ...prev,
        [type]: {
            pokemonWeakToType: [],
            pokemonWithMovesEffectiveAgainstType: {},
        },
    }), {});
}

const getPokemonWeakToType = (
    type: PokemonType,
    pokemonTeam: SelectedPokemon[],
): SelectedPokemon[] => pokemonTeam.filter(
    pokemon => intersection(pokemon.types, typeEffectivenesses[type]).length
);

const getPokemonWithMovesEffectiveAgainstType = (
    type: PokemonType,
    pokemonTeam: SelectedPokemon[],
): PokemonMoveMap => pokemonTeam.reduce((prev, pokemon) => ({
    ...prev,
    [pokemon.name]: pokemon.selectedMoves
        .filter(move => move != null)
        .filter(move => typeWeaknesses[type].includes(move!.type))
}), {});

export const evaluateTeam = (pokemonTeam: SelectedPokemon[]): PokemonTeamEvaluationResults => {
    return allTypes.reduce((prev, type) => ({
        ...prev,
        [type]: {
            pokemonWeakToType: getPokemonWeakToType(type, pokemonTeam),
            pokemonWithMovesEffectiveAgainstType: getPokemonWithMovesEffectiveAgainstType(type, pokemonTeam),
        },
    }), {})
}