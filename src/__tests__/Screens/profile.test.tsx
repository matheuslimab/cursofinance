import React from 'react';
import { render } from "@testing-library/react-native";
import { Profile } from '../../Screens/Profile';

describe('Profile', () => {

    it("Verifica se input com placeholder correto esta na tela", () => {
        const {debug} = render(<Profile />);
    
        //const inputName = getByPlaceholderText('Seu cpf');
    
        // param 1 = item a ser analisado, propiedade = verificar se é verdadeiro
        //expect(inputName.props.placeholder).toBeTruthy();
    
    });
    
    it("check if user data has ben loaded", () => {
    
        // testa um component pelo ID
        const {getByTestId} = render(<Profile/>);
    
        const inputName     = getByTestId('input-name');
        const inputSurname  = getByTestId('input-surname');
    
        expect(inputName.props.value).toEqual('Ana Clara');
        expect(inputSurname.props.value).toEqual('Rocha');
    
    }); 
    
    it('checks if title render correctly', () => {
    
        const {getByTestId} = render(<Profile />);
        const textTitle = getByTestId('profile-title');
    
        expect(textTitle.props.children).toContain("Profile");
    });

});


