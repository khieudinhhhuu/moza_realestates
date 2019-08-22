import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import HomeDux from '../pages/HomeDux';

import themes from '../assets/styles/colors';

const Route = createStackNavigator(
    {
        HomeDux: { screen: HomeDux},
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: themes.BACKGROUND_COLOR,
                paddingHorizontal: 10,
            },
            headerTintColor: '#fff'
        }
    }
);

export default createAppContainer (Route);