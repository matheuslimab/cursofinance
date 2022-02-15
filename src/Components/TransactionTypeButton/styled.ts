import styled, { css } from "styled-components/native";
import { TouchableOpacity } from "react-native";
import {Feather} from '@expo/vector-icons';
import { RFValue } from "react-native-responsive-fontsize";

interface IconProps {
    type: 'up' | 'down';
}

interface ContainerProps {
    isActive: boolean;
    type: 'up' | 'down';
}

export const Container = styled(TouchableOpacity)<ContainerProps>`
    width: 48%;
    flex-direction: row;
    align-items: center;

    border-width:  ${ ({ isActive }) => isActive ? 0 : 1.5 }px;
    border-style: solid;
    border-color: #eee;

    background-color: #fff;

    border-radius: 5px;
    padding: 16px 49px;
    justify-content: center;

    ${({ isActive, type }) => isActive && type == 'up' && css`
        background-color: ${({theme}) => theme.colors.successLight};
    ` }

    ${({ isActive, type }) => isActive && type == 'down' && css`
        background-color: ${({theme}) => theme.colors.attentionLight};
    ` }

`;

export const Title = styled.Text`
    font-size: ${RFValue(14)}px;

    color: ${({theme}) => theme.colors.text_dark};
    
    font-family: ${({theme}) => theme.fonts.regular};
`;

export const Icon = styled(Feather)<IconProps>`
    font-size: ${RFValue(22)}px;

    color: ${({theme, type}) => 
        type === 'up' ? theme.colors.success : theme.colors.attention
    };


    margin-right: 12px;
`;