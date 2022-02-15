import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

import {GestureHandlerRootView} from 'react-native-gesture-handler';

import {Feather} from '@expo/vector-icons';

interface CategoryProps {
    isActive: boolean;
}

/*
* Usar GestureHandlerRootView resolve o bug 
* do android não sobrescerver o Button e não  funcionar o OnPress
*/ 
export const Container = styled(GestureHandlerRootView)`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};

`;

export const Header = styled.View`
    width: 100%;
    height: ${RFValue(113)}px;
    background-color: ${({theme}) => theme.colors.primary};
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 20px;
    margin-bottom: 20px;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
    color: ${({theme}) => theme.colors.shape};
`;

export const Category = styled.TouchableOpacity<CategoryProps>`
    padding: ${RFValue(15)}px;
    width: 100%;
    flex-direction: row;
    
    background-color: ${ ({theme, isActive}) => 
        isActive ? theme.colors.secondaryLight : theme.colors.background  
    };
`;

export const Icon = styled(Feather)`
    font-size: ${RFValue(20)}px;
    margin-right: 16px;

    color: ${({theme}) => theme.colors.title};
`;

interface TypesIconCustom {
    color: string;
}

export const IconCustom = styled(Feather)<TypesIconCustom>`
    font-size: ${RFValue(20)}px;
    margin-right: 16px;
    color: ${props => props.color ?? "#111"};
`;


interface NameTypes {
    isActive: boolean;
}

export const Name = styled.Text<NameTypes>`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(14)}px;
    color: ${({theme}) => theme.colors.title};


    color: ${ ({theme, isActive}) => 
        isActive ? theme.colors.shape : theme.colors.title  
    };

`;

export const Separator = styled.View`
    height: 1px;
    width: 100%;
    background-color: #C5C5C5;
`;

export const Footer = styled.View`
    width: 100%;
    padding: 24px;
`;
