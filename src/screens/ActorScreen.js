import { StyleSheet, Text, View,ScrollView,Image, FlatList,Pressable } from 'react-native'
import React,{useEffect,useState} from 'react'
import { useNavigation } from '@react-navigation/native';
import tmdbapi from '../api/tmdbapi';
import { useContext } from 'react';
import { MovieContext } from '../../App';
import MovieCard from '../components/MovieCard';
import Loader from '../components/Loader';
import { MaterialIcons } from '@expo/vector-icons';


const ActorScreen = ({route}) => {
  const navigation = useNavigation();
  const {id,name} = route.params;
  
  
  const [n,setN] = useState('');
  const [list,setList] = useState([]);
  const {imgBaseUrl,error,setError} = useContext(MovieContext);
   
  useEffect(()=>{
      navigation.setOptions({
      title: name
    })
 //   console.log(navigation.getState());
  },[id])

  const getActorMovie = async()=>{
    try{
      const response  = await tmdbapi.get(`person/${id}/movie_credits?language=en-US}`);
      setList(response.data.cast);
      setN('Ok');
  
      }catch(err){
      console.log(err);
      setError('Network error');
      setN('');
      }
  }

  useEffect(()=>{
   getActorMovie();
  },[n,id])


  return (
    <ScrollView contentContainerStyle={styles.container}>
      
    {n ?  
    <FlatList 
      initialNumToRender={5}
      data={list}
      keyExtractor={item => item.id}
      renderItem={({item})=>{
      return (
        <Pressable style={styles.card} onPress={() => navigation.navigate('Movie',{id:item.id,title:item.original_title})}>

        <Image style={{width:130,height:130}} source={{uri: `${imgBaseUrl}${item.poster_path}`}}/>
        <View style={[{margin:10,padding:10}]}>
         <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.contentText,{fontSize:20}]}>{item.original_title}</Text> 
         <Text style={[styles.contentText,{fontSize:18}]}>{item.release_date}</Text>
          <View style={{flexDirection:'row',alignItems: 'center'}}>
            <MaterialIcons name="star-rate" size={18} color="black" />
            <Text style={[styles.contentText,{fontSize:18}]}>{item.vote_average}</Text>
          </View>
     
        </View>
        
       </Pressable> 
    )}}
    />
     :
     <Loader size={150} msg={error? error: 'Loading..'}/>
    }
    
  
  
     
  

    </ScrollView>
  )
}

export default ActorScreen

const styles = StyleSheet.create({
  container:{
    alignItems:'center',
    justifyContent: 'center',
    flex:1
  }, contentText:{
    fontWeight: '600'
  },
card:{
    flexDirection: 'row',
    margin:5,
    borderWidth:1.5,
    borderColor: '#e2e3e5',
    width:'100%'
  }
})