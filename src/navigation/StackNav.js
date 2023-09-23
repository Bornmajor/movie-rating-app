import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import { MovieContext } from '../../App';
import MovieScreen from '../screens/MovieScreen';
import SearchScreen from '../screens/SearchScreen'
import GenresScreen from '../screens/GenresScreen'
import ActorScreen from '../screens/ActorScreen'
import MovieList from '../screens/MovieList';


const Stack = createNativeStackNavigator();

const StackNav = () => {
    const {backgroundTheme} = useContext(MovieContext);

  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen 
            name='Home'
            component={HomeScreen}
            options={{
               title: 'Movie Rating App',
               headerTintColor: 'white',
               headerStyle: { backgroundColor: backgroundTheme }
            }}/>
               <Stack.Screen 
            name='Movie'
            component={MovieScreen}
            options={{
               title: 'Movie',
               headerTintColor: 'white',
               headerStyle: { backgroundColor: backgroundTheme }
            }}/>
                 <Stack.Screen 
            name='Search'
            component={SearchScreen}
            options={{
               title: 'Search movie',
               headerTintColor: 'white',
               headerStyle: { backgroundColor: backgroundTheme }
            }}/>
            <Stack.Screen 
            name='Genre'
            component={GenresScreen}
            options={{
               title: 'Genre',
               headerTintColor: 'white',
               headerStyle: { backgroundColor: backgroundTheme }
            }}/>
               <Stack.Screen 
            name='Actor'
            component={ActorScreen}
            options={{
               title: 'Actor',
               headerTintColor: 'white',
               headerStyle: { backgroundColor: backgroundTheme }
            }}/>
               <Stack.Screen 
            name='List'
            component={MovieList}
            options={{
               title: 'List',
               headerTintColor: 'white',
               headerStyle: { backgroundColor: backgroundTheme }
            }}/>
       




        </Stack.Navigator> 
    </NavigationContainer>
 
  )
}

export default StackNav;

const styles = StyleSheet.create({})