import React from 'react';
import {  View } from 'react-native'
import { ActivityIndicator, useTheme } from 'react-native-paper';


export const FullScreenLoader = () => {
 const {colors}= useTheme()
    return (
        <View style={{
            flex:1,
            justifyContent: 'center',
            backgroundColor:colors.background,
            alignItems: 'center',
            
        }}>
        <ActivityIndicator  size={50}></ActivityIndicator>
        </View>
    )
}