import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native'

import { getPokemons } from '../../../actions/pokemons';
import { PokeBallBg } from '../../components/ui/PokeBallBg';
import { ThemeContext } from '../../context/ThemeContext';
export const HomeScreen = () => {
    const {isDark} = useContext(ThemeContext);
    const { isLoading, data =[] } = useQuery({
        queryKey: ['pokemons'],
        queryFn:()=> getPokemons(0),
        staleTime: 1000 * 60 * 60 //60 minutos
    });
    
    return (
        <View>
            <PokeBallBg isDark={isDark} style={styles.imgPosition} ></PokeBallBg>
                    
        </View>
    )
}


const styles = StyleSheet.create({
    imgPosition:{
        position: 'absolute',
        top: -100,
        right:-100,        
    }
})