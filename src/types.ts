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
    [pokemon: string] : PokemonMove[],
}; 

export type PokemonNameMap = {
    [pokemon: string]: SelectedPokemon,
}

export interface PokemonTypeEvaluation {
    pokemonWeakToType: SelectedPokemon[],
    pokemonWithMovesEffectiveAgainstType: PokemonMoveMap,
}

export interface PokemonTeamEvaluationResults {
    [type: string] : PokemonTypeEvaluation
};