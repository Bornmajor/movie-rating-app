import { StyleSheet, Text, View,ScrollView,Image,FlatList,Pressable } from 'react-native'
import React,{useState,useEffect} from 'react'
import { Searchbar } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons';
import MovieCard from '../components/MovieCard';
import { useContext } from 'react';
import { MovieContext } from '../../App';
import tmdbapi from '../api/tmdbapi';
import { useNavigation } from '@react-navigation/native';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Button, TextInput } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import Loader from '../components/Loader';

const GenresScreen = ({route}) => {
  const {id,name} = route.params;
 
  const [movie,setMovie] = useState([]);
  const [n,setN] = useState('');

  const [totalPage,setTotalPage] = useState();
  const [currPage,setCurrPage] = useState(1);
  const [page,setPage] = useState('');
  const [visible,setVisible] = useState('none');
  const [pageError,setPageError] = useState('');

  const {error,setError} = useContext(MovieContext);
  const navigation = useNavigation();

  useEffect(()=>{
   navigation.setOptions({
    title: name,
    headerRight:()=>(
      <Text style={{color:'white',fontSize:20}}>Total item : {movie.length}</Text>
    )
   })  
   
  },[n]);

  useEffect(()=>{
    getMovieByGenre()
  },[n,currPage])

  const toggleVisibility = () =>{
    if(visible == 'none'){
      setVisible('block')
    }else if(visible == 'block'){
      setVisible('none');
    }
  }

  const incrementPage = ()=>{
     
    if(currPage <= 500){
    setCurrPage(currPage+1)
    setN('');
    // getListMovie();
    
    }
    
   
  }

  const decreasePage = ()=>{

    if(currPage > 1){
    setCurrPage(currPage-1)
    setN('');
    // getListMovie();
    }
   
  }

  const changePage = () =>{
    if(page >= 1 && page <= 500){
    //  console.log('Val ok')
    setCurrPage(page);
    setN('');
    }else{
      setPageError('Page cannot be more than 500');
     console.log('Val not ok');
    }

  }

  // const onChangeSearch = (query,mov) => {
  //   setSearchLoader(true);
  //   setSearchQuery(query);
  //   // console.log(query);
  //   if(query == ''){
  //     getMovieByGenre();
  //   }
  //   let newData = mov.filter(function(item){  
  //     const itemData = item.original_title
  //     ?item.original_title.toUpperCase():''.toUpperCase();
  //    const textData = query.toUpperCase();
  //    return itemData.indexOf(textData) > -1;
    
  //   })
  //   setMovie(newData);
  //   console.log(movie);
  //   setSearchLoader(false);

   
  // };

  const getMovieByGenre = async() =>{
    
    try{
    const response  = await tmdbapi.get(`discover/movie?include_video=false&language=en-US&page=${currPage}&sort_by=popularity.desc&with_genres=${id}`);
    setMovie(response.data.results);
    setTotalPage(response.data.total_pages);
    setN('Ok');

    }catch(err){
    console.log(err);
    setError('Network error');
    setN('');
    }

  }
  useEffect(()=>{
  getMovieByGenre();
  },[n])

  return (
    <ScrollView contentContainerStyle={styles.container}>
     {n ?
     <View>
          <FlatList 
      // initialNumToRender={5}
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
<View style={styles.pagination}>
  
 <View style={{margin:5,display:visible}} >
     {pageError ? <Text style={{color:'red'}}> {pageError} </Text>: null}
  <Pressable style={{width:'100%',alignItems:'flex-end',margin:10}} onPress={()=> setVisible('none')}>
    <AntDesign name="closecircle" size={24} color="white" /> 
  </Pressable>


  <TextInput mode='flat' label="Page No" value={page}  onChangeText={text => setPage(text)}  keyboardType={'numeric'}/>
  <View style={{justifyContent:'center',alignItems:'center',margin:5}}>
     <Button mode="contained" buttonColor='white' textColor='black' onPress={changePage}>Set page</Button>
  </View>
 
</View>

<View style={{flexDirection:'row', alignItems:'center',  justifyContent: 'space-between'}}>
 <Pressable onPress={()=>
decreasePage()}>
 <SimpleLineIcons name="arrow-left" size={24} color="white" /> 
</Pressable>
{/* <TextInput contentStyle={{textAlign:'center'}} value={`${currPage}`} onChangeText={(text) => changePage(text)} /> */}
<Text style={{fontSize:20,color:'white'}}>{currPage}</Text>


<Pressable onPress={() => {
incrementPage();
}}>
<SimpleLineIcons name="arrow-right" size={24} color="white" />
</Pressable>


<Pressable onPress={toggleVisibility}>
<Foundation name="page-edit" size={24} color="white" /> 
</Pressable>


<View>
<Text style={{fontSize:10,color:'white'}}> Current page : {currPage}</Text> 
<Text style={{fontSize:10,color:'white'}}> Total pages : {totalPage}</Text> 
</View>

</View>




</View>
      
     </View>
     
     : <Loader size={150} msg={error? error: 'Loading..'} reload={setN}/>}
      

    </ScrollView>
  )
}

export default GenresScreen

const styles = StyleSheet.create({
  container:{
    alignItems:'center',
    justifyContent: 'center',
    flex:1
  },
  contentText:{
    fontWeight: '600'
  },shadowProp: {  
    shadowOffset: {width: -2, height: 4},  
    shadowColor: '#171717',  
    shadowOpacity: 0.2,  
    shadowRadius: 3,  
  },  
  card:{
    flexDirection: 'row',
    margin:5,
    borderWidth:1.5,
    borderColor: '#e2e3e5'
  },  
  pagination:{
    backgroundColor: '#0d253f',
    padding:20,
  }
})