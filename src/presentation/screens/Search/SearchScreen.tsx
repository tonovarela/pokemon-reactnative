import React, {  useState } from 'react';
import { FlatList, View } from 'react-native'
import { globalTheme } from '../../../config/theme/global-theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ActivityIndicator, TextInput } from 'react-native-paper';
import { Pokemon } from '../../../domain/entities/Pokemon';
import { PokemonCard } from '../../components/pokemons/PokemonCard';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '../../navigator/StackNavigator';
import { useSearchPokemon } from '../../hooks/useSearchPokemon';


export const SearchScreen = () => {
    const { top } = useSafeAreaInsets();
    
    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const handledPokemonPress = (pokemon: Pokemon) =>navigation.navigate('PokemonScreen', { pokemonid: pokemon.id });    
    const {isLoading,isLoadingPokemons,pokemons,setTerm,term} = useSearchPokemon();    
    if (isLoading) {
        return (<FullScreenLoader />)
    }
    return (
        <View style={[globalTheme.globalMargin, { paddingTop: top + 10 }]}>
            <TextInput
                placeholder='Buscar pokemon'
                mode="flat"
                autoFocus
                autoCorrect={false}
                onChangeText={setTerm}
                value={term} ></TextInput>

            {isLoadingPokemons && <ActivityIndicator style={{ paddingTop: 20 }}></ActivityIndicator>}
        
            <FlatList
                data={pokemons}
                onEndReachedThreshold={0.6}                
                style={{ paddingTop: top + 20 }}
                renderItem={({ item }) => <PokemonCard onPress={handledPokemonPress} pokemon={item} />}
                keyExtractor={(pokemon, index) => `${pokemon.id}-${index}`}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                ListFooterComponent={<View style={{height:100}}></View>}
            >
            </FlatList>

        </View>
    )
}