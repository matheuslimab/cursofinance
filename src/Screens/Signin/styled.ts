import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.View`
    flex: 1;
`;

export const Header = styled.View`
    flex: 2;
    background-color: ${({theme}) => theme.colors.primary};
    justify-content: center;
    align-items: center;
`;

export const TitleWrapper = styled.View`
    align-items: center;
    justify-content: center;
`;

export const Brand = styled.Image`
    width: ${RFValue(150)}px;
    height: ${RFValue(50)}px;
    margin-bottom: 50px;
`;


export const Title = styled.Text`
    font-size: ${RFValue(30)}px;
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.thin};
    text-align: center;
    margin-bottom: 20px;
    line-height: 50px;
`;

export const SignInTitle = styled.Text`
    font-size: ${RFValue(16)}px;
    color: ${({theme}) => theme.colors.shape};
    font-family: ${({theme}) => theme.fonts.regular};
    text-align: center;
    margin-top: 50px;
    margin-bottom: 20px;
`;

export const Footer = styled.View`
    flex: 1;
    background-color: ${({theme}) => theme.colors.background};
`;

export const FooterWrapper = styled.View`
    margin-top: ${RFPercentage(-4)}px;
    padding: 0 32px;
    justify-content: space-between;
`;