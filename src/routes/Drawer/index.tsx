import  React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Drawer = createDrawerNavigator();

import {Dashboard} from '../../Screens/Dashboard';

export function DrawerNavigator() {
  return (
    <Drawer.Navigator
        screenOptions={{ 
            headerShown: false,
         }}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} />
    </Drawer.Navigator>
  );
}