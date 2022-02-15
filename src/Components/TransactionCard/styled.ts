import styled from 'styled-components/native';
import { RFValue, RFPercentage } from 'react-native-responsive-fontsize';
import {Feather} from '@expo/vector-icons';


interface TransactionTypeProps {
    type: 'up' | 'down';
}

interface BadgeLabelType {
    color: string;
}

export const Container = styled.View`
    width: 100%;
    background-color: #fff;
    border-radius: 5px;
    padding: 17px 24px;
    margin-bottom: 20px;
`;

export const Title = styled.Text`
    font-family: ${({theme}) => theme.fonts.regular};
    font-size: ${RFValue(18)}px;
    margin-bottom: 10px;
    color: ${({theme}) => theme.colors.title};
`;

export const Amount = styled.Text<TransactionTypeProps>`

    font-family: ${({theme}) => 
        theme.fonts.medium
    };

    font-size: ${RFValue(20)}px;

    color: ${({theme, type}) => 
        type == 'up' ? theme.colors.success : theme.colors.attention
    };

    margin-bottom: 15px;
`;

export const Footer = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
`;

export const Category = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

export const Icon = styled(Feather)`
    padding-right: 7px;
    font-size: ${RFValue(15)}px;
    color: ${({theme}) => theme.colors.text};
`;

export const CategoryName = styled.Text`
    font-size: ${RFValue(16)}px;
    color: ${({theme}) => theme.colors.text};
`;

export const Date = styled.Text`
    font-size: ${RFValue(15)}px;
    color: ${({theme}) => theme.colors.text};
`;


export const DescriptionView = styled.TouchableOpacity`
    margin-bottom: 20px;

    border-bottom-width: 1px;
    border-style: dashed;
    border-color: #ddd;
    padding-bottom: 10px;
`;

export const TextDescription = styled.Text`
    font-size: ${RFValue(15)}px;
    color: ${({theme}) => theme.colors.text};
`;

export const TitleDescription = styled.Text`
    font-size: ${RFValue(15)}px;
    color: #666;
    margin-bottom: 10px;
`;


export const BadgeLabel = styled.View<BadgeLabelType>`
    padding: 0;
    margin-bottom:10px;
    border-radius: 5px;
    justify-content: flex-start;
    align-items: flex-start;
    background-color: ${(props) => props.color ?? 'transparent'};

    width:  70px;
    height: 20px;
`;

export const TitleBadgeLabel = styled.Text<BadgeLabelType>`
    font-size: ${RFValue(9)}px;
    color: ${(props) => props.color ?? 'transparent'};
    font-weight: bold;
`;