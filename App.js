import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import StackNav from './src/navigation/StackNav';
import { createContext, useState } from 'react';
import { useTheme } from 'react-native-paper';

export const MovieContext = createContext();

export default function App() {
  const [backgroundTheme,setBackgroundTheme] = useState('#0d253f');
  const [imgBaseUrl,setImgBaseUrl] = useState('https://image.tmdb.org/t/p/w500');
  const [error,setError] = useState('');

  const theme = useTheme();
  theme.colors.primary = backgroundTheme;
  theme.colors.secondaryContainer = backgroundTheme;

  return (
    <MovieContext.Provider value={{backgroundTheme,theme,imgBaseUrl,setError,error}}>
      <StackNav />
    </MovieContext.Provider>
   
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
