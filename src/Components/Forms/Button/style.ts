import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.TouchableOpacity`
    width: 100%;
    background-color: ${({theme}) => theme.colors.secondary};
    padding: 18px;
    border-radius: 5px;
    justify-content: center;
    align-items: center;
    
`;

export const Title = styled.Text`
    font-size: ${RFValue(17)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    color: ${({theme}) => theme.colors.shape};
`;