import React, {useState, useEffect} from "react";
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

import { useTheme } from "styled-components/native"; 

// Bibliotecas para validação de Inputs 
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { 
    Modal, 
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from "react-native";

/*
*  TouchableWithoutFeedback + onPress(Keyboard.dismiss)
*  Desc: Clica em qualquer area do app para fecha um Teclado/Component
*/ 

import { useForm } from 'react-hook-form';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

import { TransactionTypeButton } from "../../Components/TransactionTypeButton";
import { Button } from "../../Components/Forms/Button";
import { InputForm } from "../../Components/Forms/InputForm";

import { CategorySelectButton } from "../../Components/Forms/CategorySelectButton";
import { CategorySelect } from "../CategorySelect";

import registerStore from '../../services/RegisterStore/index';

import { 
    Container,
    Header,
    Title,
    Form,
    Fields,
    TransactionsTypes,
    Switch,
    SwitchSelector, 
    LabelSwitchSelector
} from "./style";
import { useAuth } from "../../hooks/auth";

interface FormData {
    name: string;
    amount: string;
    description: string;
    pay: string;
};

type NavigationProps = {
    navigate:(screen:string) => void;
};

// Criando validação do formulario com Yup
const scheme = Yup.object().shape({
    name: Yup.string().required('Você precisa definir um nome'),
    amount: Yup.number().required('Você precisa definir o valor')
            .typeError('Informe um valor númerico')
            .positive('O valor não pode ser negativo'),
    description: Yup.string().max(5000, 'O máximo de caracteres permitidos são de 5.000')
});

export function Register() {

    const theme = useTheme();
    const nav = useNavigation<NavigationProps>();

    const { user } = useAuth();

    const dataKey = `@artikoo:transactions_user:${user.id}`;

    const [category, setCategory] = useState({
        key: "category",
        name: "Categoria",
        icon: "any"
    });


    const [titleHeader, setTitleHeader] = useState('Nova Transação');
    const [colorHeaderType, setColorHeaderType] = useState(theme.colors.primary);

    const {
        control,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm({
        resolver: yupResolver(scheme)
    });

    const [categoryModal, setCategoryModal] = useState(false);
    const [transactionType, setTransactionType] = useState('');
    const [pay, setPay] = useState(false);

    useEffect(() => {
        async function getData() {
            const data = await AsyncStorage.getItem(dataKey);
        }

        getData();

    }, []);

    function handleTransactionsTypesSelect(type: 'up' | 'down'){
        setTransactionType(type);
        
        if(type == 'up'){
            setTitleHeader('Nova Receita');
            setColorHeaderType(theme.colors.success);
        }else{
            setTitleHeader('Nova Despesa');
            setColorHeaderType(theme.colors.attention);
        }   

    }

    function handleModalcloseSelectCategory() {
        setCategoryModal(false);
    }

    function handleModalOpenSelectCategory(){
        setCategoryModal(true);
    }

    async function store(form : FormData) {

        if(!transactionType) 
            return Alert.alert('Aviso', 'Selecione o tipo da transação');

        if(category.key === 'category')
            return Alert.alert('Aviso', 'Selecione a categoria')
        

        const newTransaction = {
            id: String(uuid.v4()),
            name: form.name,
            amount: form.amount,
            description: form.description,
            category, 
            type:transactionType,
            date: new Date(),
            pay: pay ? "1" : "2"
        }

        //registerStore.storeTransation(newTransaction);
        
        try {

            const data = await AsyncStorage.getItem(dataKey);
            const currentData = data ? JSON.parse(data!) : [];

            const dataFormatted = [
                ...currentData, newTransaction
            ];

            await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

            reset();
            setTransactionType('');
            setCategory({
                key: "category",
                name: "Categoria",
                icon: "any"
            });

            nav.navigate("Dashboard");
            
        } catch (error) {
            console.log(error);
            Alert.alert("Erro interno", "Entre em contato com nossa equipe!");
        }

    }


    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

        <Container>

                <StatusBar style="light" backgroundColor={colorHeaderType} />

                <Header colorType={colorHeaderType}>
                    <Title>{titleHeader}</Title>
                </Header>

                <Form>

                    <Fields>

                        <SwitchSelector marginBottom="10">
                            <LabelSwitchSelector>Pago?</LabelSwitchSelector>
                            <Switch
                                onValueChange={setPay}
                                value={pay}
                                trackColor={{ false: '#767577', true: theme.colors.primary }}
                                thumbColor={pay ? theme.colors.primary : '#f4f3f4'}

                                ios_backgroundColor="#3e3e3e"
                            />
                        </SwitchSelector>

                        <InputForm 
                            name="name"
                            autoCapitalize="sentences"
                            control={control}
                            placeholder="Nome da conta"
                            error={errors.name && errors.name.message}
                        />
                        
                        <InputForm 
                            name="amount"
                            control={control}
                            placeholder="Preço"
                            keyboardType="numeric"
                            error={errors.amount && errors.amount.message}
                        />


                        <InputForm 
                            name="description"
                            control={control}
                            placeholder="Descrição"
                            keyboardType="default"
                            error={errors.description && errors.description.message}

                            multiline={true}
                            numberOfLines={100}

                            style={{ 
                                height: 120,
                                textAlignVertical: 'top'
                             }}
                        />

                        <TransactionsTypes>
                            <TransactionTypeButton
                                type="up"
                                title="Entrada"
                                onPress={() => handleTransactionsTypesSelect('up')}
                                isActive={transactionType === 'up'}
                            />

                            <TransactionTypeButton
                                type="down"
                                title="Saída"
                                onPress={() => handleTransactionsTypesSelect('down')}
                                isActive={transactionType === 'down'}
                            />
                        </TransactionsTypes>

                        <CategorySelectButton 
                            icon={category.icon}
                            title={category.name}
                            onPress={handleModalOpenSelectCategory}
                        />

                    </Fields>


                    {/* EXECUTA O handlesubmit e envia para a função store */}
                    <Button title="Concluir" onPress={handleSubmit(store)} />
                    

                </Form>

                <Modal visible={categoryModal}>
                    <StatusBar style="light" backgroundColor={theme.colors.primary} />
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleModalcloseSelectCategory}
                    />
                </Modal>

        </Container>
        </TouchableWithoutFeedback>
    )

}