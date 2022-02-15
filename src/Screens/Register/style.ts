import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container  = styled.ScrollView`
    flex: 1;
    background-color:  ${({theme}) => theme.colors.background};
`;

interface TypeHeader{
    colorType: string;
}

export const Header = styled.View<TypeHeader>`
    background-color: ${(props) => props.colorType};

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

export const Form = styled.View`
    flex: 1;
    width: 100%;
    padding: 18px;
    justify-content: space-between;
`

export const Fields = styled.View``;

export const TransactionsTypes = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 16px;
`;

export const Switch = styled.Switch`

`;


interface TypeSwitchSelectorView {
    marginBottom: string;
}

export const SwitchSelector = styled.View<TypeSwitchSelectorView>`
    background-color:#fff;
    width: 100%;
    height: 45px;
    border-radius: 5px;

    padding-left: 20px;
    padding-right: 20px;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin-bottom: ${props=>props.marginBottom ?? "0"}px;

    border-width: 1px;
    border-style: solid;
    border-color: #ddd;

`;

export const LabelSwitchSelector = styled.Text`
    color: ${({ theme }) => theme.colors.text_dark};
    font-family: ${( {theme} ) => theme.fonts.regular};
    font-size: ${RFValue(16)}px;
`;