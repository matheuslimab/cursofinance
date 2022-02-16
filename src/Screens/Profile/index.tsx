import React from 'react';
import { 
    StyleSheet, 
    Text,
    View,
    TextInput,
    Button
} from 'react-native';


export function Profile() {
  return (
    <View>
      
        <Text testID='profile-title'>Profile</Text>

        <TextInput
            testID='input-name'
            placeholder="Seu nome"
            autoCorrect={false}
            value='Ana Clara'
        />

        <TextInput
          testID='input-surname'
          placeholder="Sobrenome"
          value='Rocha'
        />

        <Button 
          testID='button-salvar'
          title="Salvar" 
          onPress={() => {}}
        />

    </View>
  )
}
