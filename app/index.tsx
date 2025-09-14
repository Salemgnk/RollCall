import React from 'react';
import HomeScreen from './screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HistoryScreen from './screens/HistoryScreen';


const Tab = createBottomTabNavigator();

export default function Index() {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="Home">
        <Tab.Screen 
          name="Home" 
          component={HomeScreen}
        />
        <Tab.Screen
          name="History"
          component={HistoryScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
