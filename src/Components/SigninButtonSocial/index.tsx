import React, { useEffect, useState } from 'react';
import {TouchableOpacityProps} from 'react-native';

import { 
    Container,
    IconImage,
    TitleButton,
    ImageContainer,
} from './styled';

interface Props extends TouchableOpacityProps {
    title: string;
    icon:  'google' | 'apple' | 'facebook';
}

export function SigninButtonSocial({ 
    title, 
    icon, 
    ...rest
} : Props) {


    return (
        <Container {...rest} activeOpacity={0.8}>
            <ImageContainer>

                {icon == 'google' &&
                <IconImage 
                    source={require('../../assets/img/google.png')}
                />}

                {icon == 'apple' &&
                <IconImage 
                    source={require('../../assets/img/apple-logo.png')}
                />}

                {icon == 'facebook' &&
                <IconImage 
                    source={require('../../assets/img/facebook.png')}
                />}

            </ImageContainer>
            <TitleButton>{title}</TitleButton>
        </Container>
    )

}