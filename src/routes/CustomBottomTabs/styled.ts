import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import {Feather} from '@expo/vector-icons';

export const Container = styled.View`
    background-color: ${({theme}) => theme.colors.shape};
    height: ${RFValue(75)}px;
    flex-direction: row;  
    justify-content: space-between;
    elevation: 14;
    padding-top: 8px;

    border-top-color: #ECECEC;
    border-top-width: 1px;

`;

export const TabCustom = styled.TouchableOpacity`
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const TitleTab = styled.Text`
    font-size: 14px;
    color: #fff;
    font-weight: bold;
`;


// icone sendo tipado com TS
export const Icon = styled(Feather)`
    margin-bottom: 0px;
`;

// CUSTOM TAB

export const TabCustomMain = styled.TouchableOpacity`
    width: ${RFValue(60)}px;
    height: ${RFValue(60)}px;
    background-color: ${({theme}) => theme.colors.primary};
    flex-direction: row;
    justify-content: center;
    align-items: center;
    border-radius: 100px;
    margin-top: -20px;
`;