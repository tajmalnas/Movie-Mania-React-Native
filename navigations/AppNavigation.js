import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreens from '../screens/HomeScreens';
import { createStackNavigator } from '@react-navigation/stack';
import MovieScreen from '../screens/MovieScreen';
import PersonScreen from '../screens/PersonScreen';
import SearchScreen from '../screens/SearchScreen';

export default function AppNavigation() {

    const Stack = createStackNavigator();

  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name="Home" options={{headerShown:false}} component={HomeScreens} />
            <Stack.Screen name="Movie" options={{headerShown:false}} component={MovieScreen} />
            <Stack.Screen name="Person" options={{headerShown:false}} component={PersonScreen} />
            <Stack.Screen name="Search" options={{headerShown:false}} component={SearchScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}