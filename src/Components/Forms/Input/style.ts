import styled from "styled-components/native";
import { TextInput } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(TextInput)`
    width: 100%;
    padding: 10px 18px;
    background-color: ${({theme}) => theme.colors.shape};
    font-size: ${RFValue(17)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    border-radius: 5px;
    margin-bottom: 8px;

    border-width: 1px;
    border-style: solid;
    border-color: #ddd;
`;