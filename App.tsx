import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './src/navigators/TabNavigator';
import MovieDetailsScreen from './src/screens/MovieDetailsScreen';
import SeatBookingScreen from './src/screens/SeatBookingScreen';
import HomeScreen from './src/screens/HomeScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
          name='Tab'
          component={TabNavigator}
          options={{animation: 'slide_from_right'}}/>
        <Stack.Screen
          name='MovieDetails'
          component={MovieDetailsScreen}
          options={{animation: 'fade'}}/>
        <Stack.Screen
          name='SeatBooking'
          component={SeatBookingScreen}
          options={{animation: 'slide_from_bottom'}}/>
          
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;