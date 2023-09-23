import { StyleSheet, Text, View,FlatList, ScrollView,Pressable} from 'react-native'
import React, { useContext,useEffect,useState } from 'react'
import { Chip } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import tmdbapi from '../api/tmdbapi'
import { MovieContext } from '../../App'
import Loader from './Loader'

// 
const GenresList = () => {

   const navigation = useNavigation();
   const [genres,setGenres] = useState('');
  const [n,setN] = useState('');

  const {setError,error} = useContext(MovieContext);

   const getGenres = async() =>{
    try{
      const response = await tmdbapi.get(`genre/movie/list`);
  
      setGenres(response.data.genres);
     // console.log(response.data);
      //console.log(vid.data)
      setN('Ok');
  
      }catch(err){
       setError('Network error');
       console.log(err,'Genre list error');
       setN('')
      }
   }
   useEffect(()=>{
   getGenres();
   },[n])

  return (
    <ScrollView style={{margin:10}}>

       {n ?
       <ScrollView>
          <Text style={{fontSize:25}}>Genres</Text>
          <FlatList 
          horizontal
          showsHorizontalScrollIndicator={false}
          data={genres}
          keyExtractor={item => item.id}
          renderItem={({item})=>{
            return(
                <Pressable style={{marginRight:10}} onPress={()=> navigation.navigate('Genre',{id:item.id,name:item.name})}>
                  <Chip textStyle={{color:'white',fontSize:18}}>{item.name}</Chip>  
                </Pressable>  
            )
          }}
          />
        </ScrollView>
       
       :<Loader size={25} msg={error? error: 'Loading..'}/>}
       

    </ScrollView>
  )
}

export default GenresList

const styles = StyleSheet.create({})