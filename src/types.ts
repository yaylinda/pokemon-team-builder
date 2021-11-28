export interface Pokemon {
    stats: number[],
    pokemon_url: string,
    name: string,
    moves: PokemonMove[],
    types: PokemonType[],
    image_src: string,
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

export type PokemonMoveCategory = 'physical' | 'special' | 'other';

export interface PokemonTypeEvaluation {
    pokemonWeakToType: Pokemon[],
    pokemonWithMovesEffectiveAgainstType: {
        [pokemonName: string] : PokemonMove[],
    }
}

export type PokemonTeamEvaluationResults = {
    [type in PokemonType] : PokemonTypeEvaluation;
} | {};