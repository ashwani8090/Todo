import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import { AddItem, Todo } from '../screens'

const { Navigator, Screen } = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Navigator
                initialRouteName="Task">
                <Screen
                    name="Task"
                    component={Todo}>
                </Screen>
                <Screen
                    name="Add"
                    component={AddItem}>
                </Screen>
            </Navigator>
        </NavigationContainer>
    );
}

export default AppNavigator;