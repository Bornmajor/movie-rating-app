import { StyleSheet, Text, View,ScrollView, Pressable } from 'react-native'
import React,{useEffect,useState} from 'react'
import { Searchbar } from 'react-native-paper'
import { useTheme } from 'react-native-paper'
import MovieView from '../components/MovieView'
import { useNavigation } from '@react-navigation/native'
import SearchButton from '../components/SearchButton'
import GenresList from '../components/GenresList'
import tmdbapi from '../api/tmdbapi'
import { useContext } from 'react'
import { MovieContext } from '../../App'
import { Linking } from 'react-native'
import Loader from '../components/Loader'
import { StatusBar } from 'expo-status-bar'


const HomeScreen = () => {
    const navigation = useNavigation();
    const {error,setError,backgroundTheme} = useContext(MovieContext);
    const [n,setN] = useState('');
    const [popular,setPopular] = useState('');
    const [topRated,setTopRated] = useState('');
    const [upcoming,setUpcoming] = useState('');
    const [nowPlaying,setNowPlaying] = useState('');

    const getList = async () =>{
        try{
        const popular = await tmdbapi.get('movie/popular');
        const top_rated = await tmdbapi.get('movie/top_rated');
        const upcoming = await tmdbapi.get('movie/upcoming');
        const now_playing = await tmdbapi.get('movie/now_playing');
        

        setPopular(popular.data.results);
        setTopRated(top_rated.data.results);
        setUpcoming(upcoming.data.results);
        setNowPlaying(now_playing.data.results);
        //console.log(popular.data.results);
        setN('Ok');


        }catch(err){
            setError('Network error');
            console.log(err,'Error');
            setN('');

        }
    }

    useEffect(()=>{
      getList();
      console.log('Success')
    },[n])

  
  return (
    <ScrollView contentContainerStyle={styles.container} >
        {n ? 


          <ScrollView>
            <Pressable onPress={()=> navigation.navigate('Search')} >
            <SearchButton />
            </Pressable>

            <GenresList />
            <MovieView  list={popular} title='Popular' path='popular'/>
            <MovieView  list={topRated} title='Top rated' path='top_rated'/>
            <MovieView  list={upcoming} title='Upcoming' path='upcoming' />
            <MovieView  list={nowPlaying} title='Now playing' path='now_playing'/>
          </ScrollView>
        
        : <Loader size={150} msg={error? error: 'Loading..'} reload={setN} />}
     
       
    <StatusBar backgroundColor='#0d253f'/>
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container:{
      alignItems:'center',
      justifyContent: 'center',
      flex:1
    }

})