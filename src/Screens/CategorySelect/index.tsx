import React from "react";
import { FlatList } from "react-native";


import { Button } from "../../Components/Forms/Button";
import { categories } from "../../utils/categories";

import { 
    Container, 
    Header, 
    Title,
    Category, 
    Icon, 
    IconCustom,
    Name,
    Separator,
    Footer
} from "./styled";

interface Category {
    key: string;
    name: string;
    icon: string;
}

interface Props {
    category: Category;
    setCategory: (category:Category) => void;
    closeSelectCategory: () => void;
}

export function CategorySelect({ category, setCategory, closeSelectCategory } : Props) {

    function handleCategorySelect(item : Category){
        setCategory(item);
    }

    return (
        <Container>

            <Header>
                <Title>Escolha uma Categoria</Title>
            </Header>

            <FlatList
                data={categories}
                style={{flex:1}}
                keyExtractor={(item) => item.key}
                renderItem={({item}) => (
                    <Category
                        onPress={() => handleCategorySelect(item)}
                        isActive={category.key === item.key}
                    >
                        <IconCustom name={item.icon} color={item.color}/>
                        <Name isActive={category.key === item.key}>{item.name}</Name>
                    </Category>
                )}
                ItemSeparatorComponent={Separator}
            />  


            <Footer>
                <Button onPress={closeSelectCategory} title="Selecionar"/>
            </Footer>

        </Container>
    )

}