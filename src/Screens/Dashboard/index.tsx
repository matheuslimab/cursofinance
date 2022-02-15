import React, { useState, useEffect, useCallback } from "react";
import { HighLightCard } from "../../Components/HighLightCard";

import { StatusBar } from 'expo-status-bar';

import { DrawerActions, useNavigation } from '@react-navigation/native';

import { TransactionCard, TransactionCardProps } from "../../Components/TransactionCard";
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useTheme } from "styled-components";
import { useFocusEffect } from '@react-navigation/native';

import NotFoundImage from '../../assets/svg/undraw_taken_re_yn20.svg';

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import {
    Container, Header,
    UserWrapper,
    UserInfo,
    Photo,
    User,
    UserGreeting,
    UserName,
    Icon,
    HighLightCards,
    Transactions,
    Title,
    TransactionList,
    LogoutButton, Loading, 
    LoadingContainer, TitleLoading,
    NotFound, TitleNotFound,
    QuantityView, 
    TotalQuantity, 
    SubtitleQuantity,
    CollectionQuantity,
    ButtonShowMoreOptions,
    ButtonTitleShowMoreOptions
} from './styles';


import { useAuth } from "../../hooks/auth";

export interface DataListProps extends TransactionCardProps {
    id: string;
}

interface HighLightProps {
    amount:string;
    lastTransaction: string;
} 

interface HightLightData {
    entries: HighLightProps;
    expensives: HighLightProps;
    total: HighLightProps;
}

interface TypeQuantity {
    id: string;
    total: string;
    title: string;
    bg: string;
}

export function Dashboard() {

    const theme = useTheme();
    const nav = useNavigation();

    const {user, signOut} = useAuth();

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<DataListProps[]>([]);
    const [hightLightData, setHighLightData] = useState<HightLightData>({} as HightLightData);

    const [quantityReports, setQuantityReports] = useState<TypeQuantity[]>([]);

    function getQuantityTransactionsPendingOrPay(collection : DataListProps[]) {

        const collectionFilteredPay = collection.filter((transaction) => transaction.pay === '1');
        const collectionFilteredPending = collection.filter((transaction) => transaction.pay === '2');


        return {
            "pay": collectionFilteredPay.length,
            "pending": collectionFilteredPending.length
        }
    }



    function getLastTransactionsDate(collection : DataListProps[], type : 'up' | 'down'){

        const collectionFiltered = collection.filter((transaction) => transaction.type === type);

        if(collectionFiltered.length === 0){
            return "0";
        }

        const lastTransactions = new Date(Math.max.apply(Math, collectionFiltered.map((transaction) =>  new Date(transaction.date).getTime())
        ));
        
        
        return  `${lastTransactions.getDate()} de ${lastTransactions.toLocaleString('pt-BR', {month: 'long'})}`;

    }


    async function loadTransactions() {

        const dataKey = `@artikoo:transactions_user:${user.id}`;
        const response = await AsyncStorage.getItem(dataKey);
        // convertendo de STRING para JSON
        const transactions = response ? JSON.parse(response) : [];

        // entradas
        let entriesTotal = 0;
        // saidas
        let expensiveTotal = 0;



        const transactionsFormatted : DataListProps[] = transactions.map(( item: DataListProps) => {

            if(item.type === 'up'){
                entriesTotal += Number(item.amount);
            }else{
                expensiveTotal += Number(item.amount);
            }

            const amount = Number(item.amount).toLocaleString('pt-BR', {
                style: 'currency',
                currency: "BRL"
            });

            const dateFormatted = Intl.DateTimeFormat('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
            }).format(new Date(item.date));

            return {
                id: item.id,
                name: item.name,
                amount,
                description: item.description,
                category: item.category,
                date: dateFormatted,
                type: item.type,
                pay: item.pay
            }

        });

        setData(transactionsFormatted);

        // CARD TOTAL

        const lastTransactionsEntries = getLastTransactionsDate(transactions, 'up');
        const lastTransactionsExpensives = getLastTransactionsDate(transactions, 'down');
        const totalInterval = `01 a ${lastTransactionsExpensives}`;


        // QUANTITY PENDING AND PAY
        const quantityTransactions = getQuantityTransactionsPendingOrPay(transactions);

        setQuantityReports([
            {
                "id": "1",
                "total": quantityTransactions.pending.toString(),
                "title": "Contas pendente",
                "bg": theme.colors.attention
            },
            
            {
                "id": "2",
                "total": quantityTransactions.pay.toString(),
                "title": "Contas pagas",
                "bg": theme.colors.success
            }
        ]);


        // CARDS TOP
        const totalCard = entriesTotal - expensiveTotal;

        setHighLightData({
            entries: {
                amount: entriesTotal.toLocaleString('pt-BR', {style:'currency', currency: 'BRL'}),
                lastTransaction: lastTransactionsEntries
            },
            expensives: {
                amount: expensiveTotal.toLocaleString('pt-BR', {style:'currency', currency:'BRL'}),
                lastTransaction: lastTransactionsExpensives
            },
            total: {
                amount: totalCard.toLocaleString('pt-BR', {style:'currency', currency:'BRL'}),
                lastTransaction: totalInterval
            }
        });

        setIsLoading(false);

    }

    function handleOpenDrawer() {
        nav.dispatch(DrawerActions.openDrawer());
    }

    useFocusEffect(useCallback(() => {
        loadTransactions();
    }, []));

    useEffect(() => {
        loadTransactions();
    }, []);

    return (
        <Container> 

            <StatusBar style="light" backgroundColor={theme.colors.primary} />

            {isLoading ?  

                <LoadingContainer>
                    <Loading color={theme.colors.primary} size="large"/> 
                    <TitleLoading>Preparando tudo para você!</TitleLoading>
                </LoadingContainer>
                
                : 
                <> 

                <Header>

                    <UserWrapper>
                        <UserInfo>
                            <Photo source={{ uri: user.photo }}/>

                            <User>
                                <UserGreeting>Olá, </UserGreeting>
                                <UserName>{user.name}</UserName>
                            </User>
                        </UserInfo>

                        <LogoutButton onPress={handleOpenDrawer}>
                            <Icon style={{ fontSize: 35 }} name="align-right"/>
                        </LogoutButton>
                    </UserWrapper> 

                    <ButtonShowMoreOptions>
                            <ButtonTitleShowMoreOptions>MOSTRAR +</ButtonTitleShowMoreOptions>
                    </ButtonShowMoreOptions>

                </Header>

                <HighLightCards> 
                    <HighLightCard type="up" title="Entradas" amount={hightLightData.entries.amount
                    } lastTransaction={`Última entrada em ${hightLightData.entries.lastTransaction}`}/>

                    <HighLightCard type="down" title="Saídas" amount={hightLightData.expensives.amount
                    } lastTransaction={`Última saída em ${hightLightData.expensives.lastTransaction}`}/>

                    <HighLightCard type="total" title="Total" amount={hightLightData.total.amount
                    } lastTransaction={hightLightData.total.lastTransaction}/>
                    
                </HighLightCards>

                <Transactions>

                    <Title>Estatísticas</Title>

                    <CollectionQuantity
                        data={quantityReports}   
                        horizontal={false}

                        numColumns={2}

                        keyExtractor={(item) => item.id}
                        renderItem={({item}) => (
                            <QuantityView>
                                <TotalQuantity>{item.total}</TotalQuantity>
                                <SubtitleQuantity>{item.title}</SubtitleQuantity>
                            </QuantityView>
                        )}
                    />
                

                    <Title>Últimas Transações</Title>

                    {data.length <= 0 && <NotFound>

                        <NotFoundImage width={200} height={150}/>
                        <TitleNotFound>Nenhuma transação feita!</TitleNotFound>

                    </NotFound>}

                    {data.length > 0 && <TransactionList
                        data={data.reverse()}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => {
                            return (<TransactionCard
                                data={item}
                            />)
                        }}
                        showsVerticalScrollIndicator={false}
                    />}

                    

                </Transactions>

                </>
            }  

        </Container>
    )

}