import { StyleSheet, Text, ScrollView,FlatList,View, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import MovieCard from '../components/MovieCard';
import { useContext } from 'react';
import { MovieContext } from '../../App';
import Loader from '../components/Loader';
import tmdbapi from '../api/tmdbapi';
import { MaterialIcons } from '@expo/vector-icons';
import { SimpleLineIcons } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import { Button, TextInput } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';

const MovieList = ({route}) => {
    const {path,title} = route.params;
    const navigation = useNavigation();
    const [list,setList] = useState([]);
    const [n,setN] = useState('');
    
    const [totalPage,setTotalPage] = useState();
    const [currPage,setCurrPage] = useState(1);
    const [page,setPage] = useState('');
    const [visible,setVisible] = useState('none');
    const [pageError,setPageError] = useState('');

    const {error,setError} = useContext(MovieContext);
    

    //use path on request call

    const toggleVisibility = () =>{
      if(visible == 'none'){
        setVisible('block')
      }else if(visible == 'block'){
        setVisible('none');
      }
    }
  
   

    const getListMovie = async()=>{
      try{
        const list = await tmdbapi.get(`movie/${path}?language=en-US&page=${currPage}`);
        setList(list.data.results);
        //console.log(list.data.results)
        setTotalPage(list.data.total_pages);
        setN('Ok');
        console.log('Request called');
        }catch(err){
            setError('Network error');
            console.log(err,'Error');
            setN('');

        }
    }

    useEffect(()=>{
      navigation.setOptions({
          title: title,
          headerRight:()=>(
            <Text style={{color:'white',fontSize:20}}>Total item : {list.length}</Text>
          )
      })
      },[n])

    useEffect(()=>{
    getListMovie();
    },[n,currPage])

    const incrementPage = ()=>{
     
      if(currPage <= 500){
      setCurrPage(currPage+1)
      setN('');
      setVisible('none')
      // getListMovie();
      
      }
      
     
    }

    const decreasePage = ()=>{

      if(currPage > 1){
      setCurrPage(currPage-1)
      setN('');
      setVisible('none')
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

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* <Text>{path}</Text> */}
      {n ? 
      <View>
         <FlatList 
         data={list}
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

export default MovieList

const styles = StyleSheet.create({
 
      container:{
        alignItems:'center',
        justifyContent: 'center',
        flex:1
      },
      pagination:{
        backgroundColor: '#0d253f',
        padding:20,
      }
})