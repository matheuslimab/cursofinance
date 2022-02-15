import React from 'react';
import {ThemeProvider} from 'styled-components';
import { StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// ******* instalar uma fonte do google fonts *******
// expo install expo-font @expo-google-fonts/roboto

// Obtendo as fontes baixadas
import {
    useFonts,
    Roboto_100Thin,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold 
} from '@expo-google-fonts/roboto';

import theme from './src/global/styles/theme';

import { AuthProvider, useAuth } from './src/hooks/auth';
import { Routes } from './src/routes';

export default function App() {

    const { isLoading } = useAuth();

    // Definindo as fonts que o projeto irá usar
    const [fontsLoaded] = useFonts({
        Roboto_100Thin,
        Roboto_400Regular,
        Roboto_500Medium,
        Roboto_700Bold 
    });

    //  carregando as fonts antes de inicializar a interface do App
    if(!fontsLoaded || isLoading) {
        return <AppLoading />
    }

    return (
        <ThemeProvider theme={theme}>

            <StatusBar backgroundColor={theme.colors.primary} barStyle="light-content" />

            <AuthProvider>

                

                <GestureHandlerRootView style={{flex: 1}}>
                   
                   <Routes />
                   
                </GestureHandlerRootView>

            </AuthProvider>

        </ThemeProvider>
    )
}