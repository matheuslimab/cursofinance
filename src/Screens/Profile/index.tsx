import React from 'react';
import { 
    StyleSheet, 
    Text,
    View,
    TextInput,
    Button
} from 'react-native';


export function profile() {
  return (
    <View>
      
        <Text>Profile</Text>

        <TextInput
            placeholder="Seu nome"
            autoCorrect={false}
            
        />

    </View>
  )
}

const styles = StyleSheet.create({})