import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

export const Container = styled.TouchableOpacity`
    background-color: ${({ theme }) => theme.colors.shape};
    height: ${RFValue(56)}px;
    border-radius: 5px;
    align-items: center;
    flex-direction: row;
    margin-bottom: 16px;
`;

export const ImageContainer = styled.View`
    width: ${RFValue(56)}px;
    height: 100%;
    justify-content: center;
    align-items: center;


    border-color: #CECECECE;
    border-right-width: 1px;
`;

export const IconImage = styled.Image`
    width: 30px;
    height: 30px;
`;

export const TitleButton = styled.Text`
    font-size: ${RFValue(17)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.text_dark};

    flex: 1;
    justify-content: center;
    align-items: center;
    text-align: center;
`;
