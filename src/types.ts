export interface Pokemon {
    stats: number[],
    pokemon_url: string,
    name: string,
    types: PokemonType[],
    image_src: string,
    moves: PokemonMove[],
}

export interface SelectedPokemon extends Pokemon {
    selectedMoves: (PokemonMove | null)[],
}

export interface PokemonMove {
    name: string,
    type: PokemonType,
    category: PokemonMoveCategory,
}

export type PokemonType = 
    'water' | 
    'fire' | 
    'grass' | 
    'flying' | 
    'fighting' | 
    'normal' | 
    'dark' | 
    'psychic' | 
    'fairy' | 
    'rock' | 
    'ground' | 
    'steel' |
    'ghost' |
    'ice' |
    'dragon' | 
    'bug' | 
    'electric' | 
    'poison'
;

export type PokemonTypeMap = {
    [type in PokemonType]: PokemonType[]
};

export type PokemonMoveCategory = 'physical' | 'special' | 'other';

export type PokemonMoveMap = {
    [pokemonName: string] : PokemonMove[],
}; 

export interface PokemonTypeEvaluation {
    pokemonWeakToType: string[],
    pokemonWithMovesEffectiveAgainstType: PokemonMoveMap,
}

export type PokemonTeamEvaluationResults = {
    [type in PokemonType] : PokemonTypeEvaluation;
} | {};