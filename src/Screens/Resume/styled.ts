import styled from "styled-components/native";
import { ActivityIndicator } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { RFValue } from "react-native-responsive-fontsize";

export const Container  = styled.View`
    flex: 1;
    background-color:  ${({theme}) => theme.colors.background};
`;

export const Header = styled.View`
    background-color: ${({theme}) => theme.colors.primary};

    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: ${RFValue(113)}px;
    padding-bottom: 20px;
    margin-bottom: 24px;
`;

export const Title = styled.Text`
    color: ${({ theme }) => theme.colors.shape};
    font-family: ${( {theme} ) => theme.fonts.medium};
    font-size: ${RFValue(18)}px;
`;

export const Body = styled.ScrollView`
    flex: 1;
    padding: 0px 13px;
`;

export const ChartContainer = styled.View`
    justify-content: center;
    align-items: center;
    margin-bottom: 0px;
    width: 100%;
`;

export const LoadingContainer = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export const TitleLoading = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fonts.bold};
    margin-bottom: 20px;
    color: ${({theme}) => theme.colors.text_dark};;
`;


export const Loading = styled(ActivityIndicator)`
    margin-bottom: 16px;
`;

export const NotFound = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
    justify-content: center;
    align-items: center;
    margin-top: 50px;
`; 

export const ImageNotFound = styled.Image`
    width: 100px;
    height: 100px;
    margin-bottom: 10px;
`; 

export const TitleNotFound = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fonts.bold};
    margin-bottom: 20px;
    color: ${({theme}) => theme.colors.text_dark};;
`;

export const MonthSelect = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
    margin-top: 19px;
    margin-bottom: 20px;
`;

export const MonthSelectButton = styled.TouchableOpacity``;

export const MonthSelectIcon = styled(Feather)`
    font-size: ${RFValue(25)}px;
`;
export const Month = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(17)}px;
`;