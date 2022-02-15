import React from "react";
import { TouchableOpacityProps } from "react-native";

import { 
    Container ,
    Title,
    Icon
} from "./styled";

const icons = {
    up: "arrow-up-circle",
    down: "arrow-down-circle"
}

interface Props extends TouchableOpacityProps{
    title:string;
    type: 'up' | 'down';
    isActive: boolean;
}

export function TransactionTypeButton({
    title, type, isActive, ...rest
}:Props) {

    return (
        <Container type={type} {...rest} isActive={isActive}>
            <Icon 
                type={type}
                name={icons[type]}
            />
            <Title>{title}</Title>
        </Container>
    )

}