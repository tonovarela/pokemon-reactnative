import { useInfiniteQuery,  useQueryClient } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { FlatList, StyleSheet, View } from 'react-native'
import { getPokemons } from '../../../actions/pokemons';
import { PokeBallBg } from '../../components/ui/PokeBallBg';
import { ThemeContext } from '../../context/ThemeContext';
import { Text } from 'react-native-paper';
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { Pokemon } from '../../../domain/entities/Pokemon';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigator/StackNavigator';

export const HomeScreen = () => {
    const { top } = useSafeAreaInsets();
    const queryClient =useQueryClient();
    const { isDark } = useContext(ThemeContext);
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const {   data, fetchNextPage } = useInfiniteQuery({
        queryKey: ['pokemons', 'infinite'],
        initialPageParam: 0,            
        staleTime: 1000 * 60 * 60 ,//60 minutos
        queryFn: async(params) =>{
            const pokemons = await getPokemons(params.pageParam);
            pokemons.forEach(p=>{
                queryClient.setQueryData(['pokemon',p.id],p);
            })
            return pokemons
        } ,
        getNextPageParam: (lastPage, pages) => pages.length,

    });

    const handledPokemonPress = (pokemon: Pokemon) =>navigation.navigate('PokemonScreen', { pokemonid: pokemon.id });    
    // const { isLoading, isFetching, data: pokemons = [] } = useQuery({
    //     queryKey: ['pokemons'],
    //     queryFn: () => getPokemons(0),
    //     staleTime: 1000 * 60 * 60 //60 minutos
    // });


    return (
        <View style={globalTheme.globalMargin} >
            <PokeBallBg isDark={isDark} style={styles.imgPosition} ></PokeBallBg>
            <FlatList
                onEndReachedThreshold={0.6}
                onEndReached={() => fetchNextPage()}
                style={{ paddingTop: top + 20 }}
                renderItem={({ item }) => <PokemonCard onPress={handledPokemonPress} pokemon={item} />}
                keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={() => <Text variant='displayMedium'>Pokedex</Text>}
                data={data?.pages.flat() ?? []}>
            </FlatList>

        </View>
    )
}


const styles = StyleSheet.create({
    imgPosition: {
        position: 'absolute',
        top: -100,
        right: -100,
    }
})