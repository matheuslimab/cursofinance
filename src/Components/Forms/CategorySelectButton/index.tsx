import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { 
    Container, 
    Category,
    Icon
} from './styled';

interface Props extends TouchableOpacityProps{
    title:string;
    icon: string;
}

export function CategorySelectButton({title, icon, onPress}:Props){
    return (
        <Container onPress={onPress}>
            {icon.trim() != 'any' && <Icon name={icon} color="#777"/>}
            <Category>{title}</Category>
            <Icon name="chevron-down"/>
        </Container>
    )
}