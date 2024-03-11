
import { Pokemon } from "../../domain/entities/Pokemon";
import { getPokemonByID } from "./get-pokemonByID";

export const getPokemonsByIds = async (ids:number[]):Promise<Pokemon[]> => {
    try {
    const pokemonPromises = ids.map(id=>getPokemonByID(id));

        return Promise.all(pokemonPromises);
        

    } catch (error) {
        throw new Error('Error gettins pokemons');
    }
}