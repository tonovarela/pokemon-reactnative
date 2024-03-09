import { getColorsFromImage } from '../../config/helpers/getColots';
import type { Pokemon } from '../../domain/entities/pokemon';
import type { PokeAPIPokemonResponse } from '../interfaces/pokeApi.interfaces';

export class PokemonMapper {
  static async pokeApiPokemonToEntity(data: PokeAPIPokemonResponse): Promise<Pokemon> {
    const sprites = PokemonMapper.getSprites(data);
    const avatar = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png`;
    const { id, name } = data;
    const color = await getColorsFromImage(avatar);
    const { types, game_indices, stats, past_abilities, moves } = data;    
    return {
      id,
      name,
      avatar,
      color,
      sprites,
      types: types.map(type => type.type.name),
      games: game_indices.map(game => game.version.name),
      stats: stats.map(stat => ({ name: stat.stat.name, value: stat.base_stat })),
      ablities: past_abilities.map(ability => ability.ability.name),      
      moves: moves.map(move => { return { name: move.move.name, level: 0 } })
    };
  }

  static getSprites(data: PokeAPIPokemonResponse): string[] {
    const { sprites } = data;
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