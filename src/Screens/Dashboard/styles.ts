import styled from 'styled-components/native';

// biblioteca de icons
import {Feather} from '@expo/vector-icons';
import { FlatList, FlatListProps, TouchableOpacity, ActivityIndicator } from 'react-native';

import {DataListProps} from '.';

// Definir tamanhos por proporções
import {
    RFPercentage,
    RFValue
} from 'react-native-responsive-fontsize';

export const Container = styled.ScrollView`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFValue(178)}px;
    background-color: ${({theme}) => theme.colors.primary};
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
`;

export const UserWrapper = styled.View`
    width: 100%;
    padding: 0 24px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 60px;
`;

export const UserInfo = styled.View`
    flex-direction: row;
    align-items: center;

`;

export const Photo = styled.Image`
    width: ${RFValue(40)}px;
    height: ${RFValue(40)}px;
    border-radius: 10px;
`;

export const User = styled.View`
    margin-left: 17px;
`;

export const UserGreeting = styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(15)}px;
    font-family: ${({theme}) => theme.fonts.regular};
`;

export const UserName = styled.Text`
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(17)}px;
    font-family: ${({theme}) => theme.fonts.bold};
`;

/*
* Estilizando um component(biblioteca) de fora do 
* Styled component/React Native
*/ 
export const Icon = styled(Feather)`
    color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(24)}px;
`;


export const HighLightCards = styled.ScrollView.attrs({  // attrs = props do component Scroll View
    horizontal:true,
    showsHorizontalScrollIndicator:false,
    contentContainerStyle: {paddingHorizontal: 24}
})`

    width: 100%;
    margin-top: 30px;

`;


export const Transactions = styled.View`
    flex: 1;
    padding: 0 24px;
    margin-top: ${RFPercentage(5)}px;
`;

export const Title = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fonts.bold};
    margin-bottom: 30px;
    color: ${({theme}) => theme.colors.text_dark};
`;


// tipando o flatlist
export const TransactionList = styled(FlatList as new (props: FlatListProps<DataListProps>) => FlatList<DataListProps>)`
`;


export const LogoutButton = styled(TouchableOpacity)``;

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
`; 


export const TitleNotFound = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    margin-bottom: 20px;
    margin-top: 20px;
    color: #9A9A9A;
`;


export const CollectionQuantity = styled.FlatList`
    width: 100%;
    height: auto;

    margin-bottom: 30px;
    
`;


export const QuantityView = styled.View`
    flex: 1;

    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color:  #fff;
    border-width: 1px;
    border-style: solid;
    border-color: #ddd;

    border-radius: 9px;

    height: 100px;
    margin: 3px;


    elevation: 2;
`;

export const TotalQuantity = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fonts.bold};
    color: #111;
    margin-bottom: 10px;
`;

export const SubtitleQuantity = styled.Text`
    font-size: ${RFValue(15)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    color: #9A9A9A;
`;

export const ButtonShowMoreOptions = styled.TouchableOpacity`
    width:100%;
    padding:20px;
    justify-content: center;
    align-items: center;
`;

export const ButtonTitleShowMoreOptions = styled.Text`
    font-size: ${RFValue(12)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    color: #fff;
    text-decoration: underline;
`;