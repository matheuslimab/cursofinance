import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const {Navigator, Screen} = createNativeStackNavigator();

import { Signin } from '../Screens/Signin';

export function AuthRoutes() {

    return (
        <Navigator screenOptions={{
            headerShown: false
        }}>
            <Screen
                name='Signin'
                component={Signin}
            />
        </Navigator>
    )

}