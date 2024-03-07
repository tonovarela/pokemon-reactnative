import type { Pokemon } from '../../domain/entities/pokemon';
import type { PokeAPIPokemonResponse } from '../interfaces/pokeApi.interfaces';

export class PokemonMapper {
  static async pokeApiPokemonToEntity(data: PokeAPIPokemonResponse): Promise<Pokemon> {
    const sprites = PokemonMapper.getSprites(data);
    const avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;
    const { id, name } = data;
    //`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`,
    return {
      id,
      name,
      avatar,
      types: data.types.map(type => type.type.name),
      sprites: sprites,
    };
  }

  static getSprites(data: PokeAPIPokemonResponse): string[] {
    const { sprites} =data;
    const _sprites: string[] = [
      sprites.front_default,
      sprites.back_default,
      sprites.front_shiny,
      sprites.back_shiny,
    ];

    if (data.sprites.other?.home.front_default)
      _sprites.push(data.sprites.other?.home.front_default);
    if (data.sprites.other?.['official-artwork'].front_default)
      _sprites.push(data.sprites.other?.['official-artwork'].front_default);
    if (data.sprites.other?.['official-artwork'].front_shiny)
      _sprites.push(data.sprites.other?.['official-artwork'].front_shiny);
    if (data.sprites.other?.showdown.front_default)
      _sprites.push(data.sprites.other?.showdown.front_default);
    if (data.sprites.other?.showdown.back_default)
      _sprites.push(data.sprites.other?.showdown.back_default);

    return _sprites;
  }
}