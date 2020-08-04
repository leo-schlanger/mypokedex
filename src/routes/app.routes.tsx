import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import PokemonInfo from '../pages/PokemonInfo';

const App = createStackNavigator();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: false,
      cardStyle: {backgroundColor: '#e8f3f0'},
    }}>
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="PokemonInfo" component={PokemonInfo} />

    <App.Screen name="Profile" component={Profile} />
  </App.Navigator>
);

export default AppRoutes;
