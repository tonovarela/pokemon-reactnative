import { pokeApi } from "../../config/api/pokeApi"
import { Pokemon } from "../../domain/entities/Pokemon";
import { PokeAPIPokemonResponse } from "../../infrastructure/interfaces/pokeApi.interfaces";
import { PokemonMapper } from "../../infrastructure/mappers/pokemon.mapper";

export const getPokemonByID = async (id: number): Promise<Pokemon> => {
    try {
          console.log(`Peticion http ${id}`);
        const { data } = await pokeApi.get<PokeAPIPokemonResponse>(`/pokemon/${id}`);
        return await PokemonMapper.pokeApiPokemonToEntity(data);

    } catch (error) {
        throw new Error('Error gettins pokemon');
    }

}