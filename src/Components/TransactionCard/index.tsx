import React, {useState} from "react";

import { useTheme } from "styled-components/native";

import { 
    Container,
    Title,
    Amount,
    Footer,
    Category,
    Icon,
    CategoryName,
    Date,
    DescriptionView, 
    TextDescription,
    TitleDescription,
    BadgeLabel,
    TitleBadgeLabel
} from "./styled";

interface Category{
    name: string;
    icon: string;
} 

export interface TransactionCardProps {
    type: 'up' | 'down';
    name: string;
    amount: string;
    description: string;
    category: Category;
    date: string;
    pay: string;
}

interface Props {
    data: TransactionCardProps
}

export function TransactionCard({
    data
} : Props) {

    const texto = `Tells the operating system whether the individual fields in your app should be included in a view structure`;

    const [show, setShow] = useState(false);

    const theme = useTheme();

    function handleDisplayMore() {
        setShow(!show);
    }

    return (
        <Container>

            <BadgeLabel color="transparent">
                <TitleBadgeLabel color={data.type == 'up' ? theme.colors.successLight : theme.colors.attentionLight}>{data.type == 'up' ? "+ Receita" : "- Despesa"}</TitleBadgeLabel>
            </BadgeLabel>

            <BadgeLabel color={data.pay == '1' ? theme.colors.successLight : theme.colors.attentionLight} style={{ 
                justifyContent: 'center',
                alignItems: 'center',
             }}>
                <TitleBadgeLabel color={data.pay == '1' ? theme.colors.shape : theme.colors.shape}>{data.pay == '1' ? "+ PAGO" : "- PENDENTE"}</TitleBadgeLabel>
            </BadgeLabel>

            <Title>{data.name}</Title>
            <Amount type={data.type}>{data.type == 'down' ? "- " : "+ "} {data.amount}</Amount>

            {data.description &&
            <DescriptionView onPress={handleDisplayMore}>
                <>
                    <TitleDescription># Descrição </TitleDescription>
                    <TextDescription>{show ? data.description : data.description.toString().substring(0, 80)+"..."}</TextDescription>
                </>
            </DescriptionView>}

            <Footer>
                <Category>
                    <Icon name={data.category.icon}/>
                    <CategoryName>{data.category.name}</CategoryName>
                </Category>
                <Date>{data.date}</Date>
            </Footer>
        </Container>
    )

}