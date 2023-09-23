import { StyleSheet, Text, View,FlatList,ScrollView ,Pressable} from 'react-native'
import React,{useState,useEffect} from 'react'
import { Searchbar } from 'react-native-paper'
import MovieCard from '../components/MovieCard'
import tmdbapi from '../api/tmdbapi'
import { useContext } from 'react'
import { MovieContext } from '../../App'
import Loader from '../components/Loader'
import { Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLoader,setSearchLoader] = useState(false);
  const [n,setN] = useState('');
  const navigation = useNavigation();
  const [movie,setMovie] = useState('');
  const [actor,setActor] = useState('');

  const {error,setError,imgBaseUrl} = useContext(MovieContext);

  useEffect(()=>{
   setN('ok');
  },[])


  const onChangeSearch = async(query) => {
    setN('');
    setSearchLoader(true);
    setSearchQuery(query)
   // console.log(query);
    try{
    const response = await tmdbapi.get(`search/movie?query=${query}`)  
    setMovie(response.data.results);

    const actor_response = await tmdbapi.get(`search/person?query=${query}`)
   setActor(actor_response.data.results);
    console.log(actor_response.results);
    setSearchLoader(false);
    setN('Ok');

      
    }catch(err){
      setError('Network error');
      setN('');
      console.log(err);
    }


    
  };


  return (
    <ScrollView>
      <Searchbar 
      style={{borderRadius:0,margin:10}}
      elevation={2}
      traileringIconColor='black'
      loading={searchLoader}
      placeholder="Search movie or actor"
      onChangeText={onChangeSearch}
      value={searchQuery}
      
      />

    { n ?
        <FlatList 
        horizontal
        showsHorizontalScrollIndicator={false}
        initialNumToRender={5}
        maxToRenderPerBatch={5}
      data={actor}
      keyExtractor={item => item.id}
      renderItem={({item})=>{
        return (
          <Pressable style={{margin:5}} onPress={() => navigation.navigate('Actor',{id:item.id,name:item.original_name})}>
          <Image style={{width:130,height:130,borderRadius:10}} source={{uri: `${imgBaseUrl}${item.profile_path}`}}/> 
          
          <View style={{margin:5}}>
           <Text numberOfLines={1} ellipsizeMode='tail' style={{width:130}}>{item.original_name}</Text>
         
          </View>
         

       </Pressable>
        )
      }}
      />
      :<Loader size={80} msg={error? error: 'Loading..'}/>}

  
      { n ?
        <FlatList 
      data={movie}
      keyExtractor={item => item.id}
      renderItem={({item})=>{
        return (
          <MovieCard 
          id={item.id}
          uri={item.poster_path} 
          original_title={item.original_title}
          release_date={item.release_date}
          vote_average={item.vote_average}
           /> 
        )
      }}
      />
      :<Loader size={80} msg={error? error: 'Loading..'}/>}
    
    </ScrollView>
  )
}

export default SearchScreen

const styles = StyleSheet.create({
  container:{
    alignItems:'center',
    justifyContent: 'center',
    flex:1
  }
})