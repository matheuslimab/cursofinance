import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { ActivityIndicator } from 'react-native';

export const Container = styled.View`
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.87);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    position: absolute;
    top: 0;
    left: 0;
`;

export const Loader = styled(ActivityIndicator).attrs({
    color: '#fff',
    size: "large"
})``;

export const TitleLoader = styled.Text`
    font-size: ${RFValue(18)}px;
    font-family: ${({theme}) => theme.fonts.regular};
    margin-bottom: 20px;
    margin-top: 20px;
    color: ${({theme}) => theme.colors.shape};
`;