import { useQuery } from "@tanstack/react-query";
import { getPokemonsByIds, getPokemonsNameWithId } from "../../actions/pokemons";
import { useMemo, useState } from "react";
import { useDebounceValue } from "./useDebounceValue";

export const useSearchPokemon = () => {    
    const [term, setTerm] = useState('');
    const debounceValue = useDebounceValue(term,500);
    const { isLoading, data: pokemonNameList } = useQuery({
        queryKey: ['pokemons', 'all'],
        queryFn: () => getPokemonsNameWithId()
    });    
    const pokemonIdList = useMemo(() => {
        if (debounceValue.length === 0) { return [] }
        if (debounceValue.length < 3) { return [] }
        if (!isNaN(Number(term))) {
            const pokemon = pokemonNameList!.find(pokemon => pokemon.id === Number(debounceValue));
            return pokemon ? [pokemon] : [];
        }
        return pokemonNameList!.filter(pokemon => pokemon.name.toLowerCase().includes(debounceValue.toLowerCase()))            
    }, [debounceValue]);

    const { isLoading: isLoadingPokemons, data: pokemons = [] } = useQuery({
        queryKey: ['pokemons', 'by', pokemonIdList],
        queryFn: () => getPokemonsByIds(pokemonIdList.map(p => p.id)),
        staleTime: 1000 * 60 * 5 //60 minutos
    });

    return {
        isLoading,
        isLoadingPokemons,
        pokemons,
        debounceValue,
        term,
        setTerm
        
    }

}