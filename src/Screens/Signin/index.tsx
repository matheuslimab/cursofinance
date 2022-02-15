import React, {useState} from 'react';
import { Alert, Platform } from 'react-native';

import {
    Container,
    Header,
    TitleWrapper,
    Brand,
    Title,
    SignInTitle,
    Footer,
    FooterWrapper
} from './styled';

import { SigninButtonSocial } from '../../Components/SigninButtonSocial';
import { useAuth } from '../../hooks/auth';
import { LoadingModule } from '../../Components/LoadingModule';


export function Signin(){

    const [isLoading, setIsLoading] = useState(false);
    const { signInWithGoogle, signInWithApple, signWithFacebook } = useAuth();

    async function handleSignInWithGoogle(){
        try {
            setIsLoading(true);
            return await signInWithGoogle();
        } catch (error) {
            console.log(error);
            Alert.alert('Aviso', 'Não foi possível conectar com a conta google.');
            setIsLoading(false);
        }
    }

    async function handleSignInWithApple() {
        try {
            setIsLoading(true);
            return await signInWithApple();
        } catch (error) {
            console.log(error);
            Alert.alert('Aviso', 'Não foi possível conectar com a conta apple');
            setIsLoading(false);
        }
    }

    return (
        <>
        <Container>
            <Header>
                <TitleWrapper>
                    <Brand 
                        source={require('../../assets/img/logo-white.png')}
                    />

                    <Title>Controle suas {'\n'}
                    finanças de forma {'\n'}
                    muito simples</Title>

                </TitleWrapper>

                <SignInTitle>
                    Faça seu login com uma {'\n'}
                    das contas abaixo
                </SignInTitle>
            </Header>

            <Footer>
                <FooterWrapper>

                    <SigninButtonSocial onPress={handleSignInWithGoogle} icon="google" title="Continue com o google"/>
                    
                    {Platform.OS == 'ios' && 
                    <SigninButtonSocial 
                        onPress={handleSignInWithApple} 
                        icon="apple" 
                        title="Continue com a apple"
                    />}

                    {Platform.OS == 'android' && 
                    <SigninButtonSocial 
                        onPress={signWithFacebook} 
                        icon="facebook" 
                        title="Continue com o facebook"
                    />}

                </FooterWrapper>
            </Footer>

            

        </Container>

        {isLoading && <LoadingModule />}

        </>
    )

}