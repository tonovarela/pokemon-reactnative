import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { HomeScreen } from '../screens/Home/HomeScreen';
import { SearchScreen } from '../screens/Search/SearchScreen';
import { PokemonScreen } from '../screens/Pokemon/PokemonScreen';


export type RootStackParams = {
    HomeScreen: undefined,
    PokemonScreen: { pokemonid: number },
    SearchScreen: undefined
}

export const StackNavigator = () => {
    const Stack = createStackNavigator<RootStackParams>();
    return (
        <Stack.Navigator screenOptions={{headerShown:false}}>
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="SearchScreen" component={SearchScreen} />
            <Stack.Screen name="PokemonScreen" component={PokemonScreen} />
        </Stack.Navigator>
    )
}