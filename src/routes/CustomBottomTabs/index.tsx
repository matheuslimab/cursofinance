import React, {useState} from 'react';
import { useTheme } from 'styled-components';

import {
    Container, 
    TabCustom,
    TitleTab,
    Icon,
    TabCustomMain
} from './styled';

export function CustomBottomTabs({ state, descriptors, navigation }) {

    const theme = useTheme();

    return (
        <Container>
            {state.routes.map((route, index) => {

                const { options } = descriptors[route.key];

                const label =
                options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                    ? options.title
                    : route.name;


                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                      type: 'tabPress',
                      target: route.key,
                      canPreventDefault: true,
                    });
          
                    if (!isFocused && !event.defaultPrevented) {
                      // The `merge: true` option makes sure that the params inside the tab screen are preserved
                      navigation.navigate({ name: route.name, merge: true });
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                      type: 'tabLongPress',
                      target: route.key,
                    });
                };

                // ICONS

                let nameIcon = '';

                switch(label) {
                    case 'Dashboard':
                        nameIcon = 'home';
                        break;
                    case 'Cadastrar':
                        nameIcon = 'plus';
                        break;
                    case 'Resumo':
                        nameIcon = 'pie-chart';
                        break;
                }

                if(label == 'Cadastrar') {
                    // render tab
                    return (
                        <TabCustomMain 
                            style={{elevation: 20}}
                            key={index}
                            onPress={onPress}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onLongPress={onLongPress}
                        >
                            <Icon name="plus" color="#fff" size={25}/>
                        </TabCustomMain>
                    )
                }else{
                    // render tab
                    return (
                        <TabCustom 
                            key={index}
                            onPress={onPress}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onLongPress={onLongPress}
                        >
                            <Icon name={nameIcon} color={isFocused ? theme.colors.primary : "#777"} size={25}/>
                        </TabCustom>
                    )
                }

                
            })}
        </Container>
    );

} 