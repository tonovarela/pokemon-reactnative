import { pokeApi } from "../../config/api/pokeApi";
import { Pokemon } from "../../domain/entities/Pokemon";
import { PokeAPIPaginatedResponse, PokeAPIPokemonResponse } from "../../infrastructure/interfaces/pokeApi.interfaces";

export const getPokemons = async (page:number,limit=20): Promise<Pokemon[]> => {
    try {
        const url = "/pokemon";
        const {data} = await pokeApi.get<PokeAPIPaginatedResponse>(`${url}?offset=${page * 10}&limit=${limit}`);        
        const pokemonPromises = data.results.map((info) => pokeApi.get<PokeAPIPokemonResponse>(info.url));
        const pokemonsResponse = await Promise.all(pokemonPromises);
        console.log(pokemonsResponse.length);

        return [];
    } catch (error) {
        throw new Error('Error gettins pokemons');
    }

}