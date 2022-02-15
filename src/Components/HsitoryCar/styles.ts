import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import {Feather} from '@expo/vector-icons';

interface ContainerProps {
    color: string;
}

export const Container = styled.View<ContainerProps>`
    width: 100%;
    background-color: ${({theme}) => theme.colors.shape};
    flex-direction: row;
    justify-content: space-between;

    padding:  13px 24px;
    padding-left: 15px;
    border-radius: 5px;

    border-left-width: 5px;
    border-left-color: ${({color}) => color};
    margin-bottom: 10px;
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.text_dark};
    font-family: ${( {theme} ) => theme.fonts.medium};
    font-size: ${RFValue(16)}px;
`;

export const Amount = styled.Text`
    color: ${({ theme }) => theme.colors.title};
    font-family: ${( {theme} ) => theme.fonts.bold};
    font-size: ${RFValue(18)}px;
`;

export const Icon = styled(Feather)` 
    font-size: ${RFValue(17)}px;
    margin-right: 10px;
`;

export const IconAndTitle = styled.View`
    flex: 1;
    flex-direction: row;
    margin-right: 10px;
`;