import React from "react";
import { Platform } from "react-native";
import { useTheme } from "styled-components";

import { MaterialIcons } from '@expo/vector-icons';

import { RFValue } from "react-native-responsive-fontsize";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { CustomBottomTabs } from "./CustomBottomTabs";

const {Navigator, Screen} = createBottomTabNavigator();

import { DrawerNavigator } from "../routes/Drawer";
import { Register } from "../Screens/Register";
import {Resume} from '../Screens/Resume/index';

export function AppRoutes(){

    // usando o theme 
    const theme = useTheme();

    return (
        <Navigator tabBar={(props) => <CustomBottomTabs {...props} />} screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: theme.colors.text_dark,
            tabBarInactiveTintColor: theme.colors.text,
            tabBarLabelPosition: 'beside-icon',
            tabBarStyle: {
                height: Platform.OS === 'ios' ? 88 : 75,
                zIndex: 0,
            },
            tabBarLabelStyle: {
                fontFamily: theme.fonts.medium,
                fontSize: RFValue(15)
            }
        }}>

            <Screen 
                name="Dashboard"
                component={DrawerNavigator}
                options={{
                    tabBarIcon: (({size, color}) => 
                    <MaterialIcons name="format-list-bulleted" size={size} color={color} />
                )
                }}
            />

            <Screen 
                name="Cadastrar"
                component={Register}
                options={{
                    tabBarIcon: (({size, color}) => 
                    <MaterialIcons name="attach-money" size={size} color={color} />
                )
                }}
            />
            <Screen 
                name="Resumo"
                component={Resume}
                options={{
                    tabBarIcon: (({size, color}) => 
                    <MaterialIcons name="pie-chart" size={size} color={color} />
                )
                }}
            />
        </Navigator>
    )
}