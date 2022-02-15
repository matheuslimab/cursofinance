import React, {useState, useCallback, useEffect} from "react";
import { FlatList, StatusBar } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components/native";

import { 
    VictoryPie,
    VictoryChart,
    VictoryTheme,
} from 'victory-native';


import AsyncStorage from '@react-native-async-storage/async-storage';

/*
*   Biblioteca para manipulação de datas = 
 *  exemplo: adicionar mais dias a uma data ou diminuir dias
 * */ 
import { addMonths, subMonths, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { HistoryCar } from "../../Components/HsitoryCar";

import { 
    Container,
    Header, 
    Title,
    Body,
    ChartContainer,
    Loading, 
    LoadingContainer, 
    TitleLoading,
    NotFound, 
    ImageNotFound, 
    TitleNotFound,
    MonthSelect, 
    MonthSelectButton, 
    MonthSelectIcon, 
    Month
} from "./styled";
import { categories } from "../../utils/categories";
import { RFValue } from "react-native-responsive-fontsize";
import { useAuth } from "../../hooks/auth";

interface Category{
    name: string;
    icon: string;
    key: string;
    color: string;
} 

interface DataListProps {
    type: 'up' | 'down';
    name: string;
    amount: string;
    category: Category;
    date: string;
}

interface TotalByCategoryProps {
    name: string;
    total: string;
    totalPie: number;
    color: string;
    percent: string;
    icon: string;
}

export function Resume(){

    const [selectedDate, setSelectedDate] = useState(new Date);

    const {user} = useAuth();

    const theme = useTheme();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState<TotalByCategoryProps[]>([]);

    async function handleChangeDate(action: 'next' | 'prev'){
        if (action === 'next'){
            // data selecionada + 1 dia 
            const dateMoreOneDay = addMonths(selectedDate, 1);
            setSelectedDate(dateMoreOneDay);
        }else{
            // data selecionada - 1 dia 
            const dateMoreOneDay = subMonths(selectedDate, 1);
            setSelectedDate(dateMoreOneDay);
        }
    }

    async function loadData() {
        const dataKey = `@artikoo:transactions_user:${user.id}`;
        const response = await AsyncStorage.getItem(dataKey);
        // convertendo de STRING para JSON
        const transactions = response ? JSON.parse(response) : [];

        const expensives = transactions.filter((expensive : DataListProps) => 
            expensive.type === 'down' && new Date(expensive.date).getMonth() === selectedDate.getMonth() 
            && new Date(expensive.date).getFullYear() === selectedDate.getFullYear()
        );

        // total calculado de saidas
        const expensivesTotal = expensives.reduce((accumullator : number, expensive : DataListProps) => {
            return accumullator + Number(expensive.amount);
        }, 0);

        const totalByCategory : TotalByCategoryProps[] = [];

        categories.forEach(category => {

            let categorySum = 0;

            expensives.forEach((expensive : DataListProps) => {
                if(expensive.category.key === category.key){
                    categorySum += Number(expensive.amount);
                }
            });

            if(categorySum > 0){

                let total = categorySum.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                });

                const percent = `${(categorySum / expensivesTotal * 100).toFixed(2)}%`;

                total = total.replace('$', '$ ');

                totalByCategory.push({
                    name: category.name,
                    icon: category.icon,
                    total: total,
                    totalPie: categorySum,
                    color: category.color,
                    percent
                });
            }

        });

        setData(totalByCategory);
        setIsLoading(false);

        console.log(data);

    }

    // EXIBIR OS DADOS QUANDO ESTIVER FOCADO NA TELA
    useFocusEffect(useCallback(
        () => {
            loadData();
        },
        [],
    ));

    useEffect(() => {
        loadData();
    }, [selectedDate]);
    
    return (

        <Container>

            <StatusBar backgroundColor={theme.colors.primary} />

            {isLoading ?
            <LoadingContainer>
                <Loading color={theme.colors.primary} size="large"/> 
                <TitleLoading>Preparando tudo para você!</TitleLoading>
            </LoadingContainer>

            :

            <>
            <Header>
                <Title>Resumo Mensal</Title>
            </Header>

            
            
            <Body>
                
                
                <MonthSelect>

                    <MonthSelectButton onPress={()=> handleChangeDate('prev')}>
                        <MonthSelectIcon name="chevron-left"/>
                    </MonthSelectButton>

                    <Month>{
                        format(selectedDate, 'MMMM, yyyy', {
                            locale: ptBR
                        })    
                    }</Month>

                    <MonthSelectButton onPress={()=> handleChangeDate('next')}>
                        <MonthSelectIcon name="chevron-right"/>
                    </MonthSelectButton>

                </MonthSelect>
                

                {data.length <= 0 && <NotFound>
                <ImageNotFound source={require('../../assets/img/undraw_No_data_re_kwbl.png')}/>
                <TitleNotFound>Ops, ainda não temos dados para você!</TitleNotFound>

                </NotFound>}

                {data.length > 0 && 
                <>

                <ChartContainer>

                    <VictoryPie
                        innerRadius={50}
                        padAngle={3}
                        labelRadius={90}
                        data={data}
                        colorScale={data.map(category => category.color)}
                        x="percent"
                        y="totalPie"
                        style={{
                            labels: {
                                fontSize: RFValue(15),
                                fontWeight: 'bold',
                                fill: theme.colors.shape
                            },
                        }}
                    /> 

                </ChartContainer>

                <FlatList
                    data={data}
                    keyExtractor={(item : TotalByCategoryProps)=>item.name}
                    renderItem={({item}) => {
                        return (<HistoryCar icon={item.icon} title={item.name} amount={item.total} color={item.color}/>)
                    }}
                />
                </>}

            </Body>
            
            </>}

        </Container>
    );

}