import React from "react";


import { 
    Container, 
    Title,
    Amount,
    Icon,
    IconAndTitle
} from "./styles";

interface Props {
    title: string;
    amount: string;
    color: string;
    icon: string;
}

export function HistoryCar ({ title, amount, color, icon } : Props) {
    
    return (
        <Container color={color}>
            <IconAndTitle>
                <Icon name={icon} color={color}/>
                <Title>{title}</Title>
            </IconAndTitle>
            <Amount>{amount}</Amount>
        </Container>
    )

}