import React, { PropsWithChildren, useContext } from 'react';
import { Image, ImageStyle, StyleProp, Text } from 'react-native'



export interface Props  {
    isDark:boolean;
    style?: StyleProp<ImageStyle>
}


export const PokeBallBg = ({ style ,isDark}: Props) => {
        
    const pokeImg =  isDark ? require('../../../assets/pokeball-light.png')
                            : require('../../../assets/pokeball-dark.png');                            
return (    
        <Image source={pokeImg} style={[{ width: 300, height: 300, opacity: 0.1 }, style]}></Image>
    )
}


