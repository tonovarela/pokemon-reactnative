import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { View } from 'react-native'

import { Button, Text } from 'react-native-paper'
import { getPokemons } from '../../../actions/pokemons';


export const HomeScreen = () => {

    const { isLoading, data } = useQuery({
        queryKey: ['pokemons'],
        queryFn:()=> getPokemons(1,5),
        staleTime: 1000 * 60 * 60 //60 minutos
    });

    console.log(data)
    return (
        <View>
            <Text variant='displaySmall'>HomeScreen</Text>
            {
                isLoading ? (
                    <Text variant='displaySmall'>Cargando...</Text>
                ) : (
                    <Text variant='displaySmall'>{JSON.stringify(data)}</Text>
                )
            }
            {/* <Button mode="contained" onPress={() => console.log('Pressed')}>Press me</Button> */}
        </View>
    )
}