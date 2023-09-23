import { StyleSheet, Text, View,Image, Pressable,ScrollView, FlatList } from 'react-native'
import React,{useState,useEffect} from 'react'
import { useContext } from 'react'
import { MovieContext } from '../../App'
import { Card } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import YoutubePlayer from "react-native-youtube-iframe";
import tmdbapi from '../api/tmdbapi'
import Loader from '../components/Loader'
import {Button} from 'react-native-paper'
import Modal from "react-native-modal";
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { Linking } from 'react-native'
//image call,review call
 

const MovieScreen = ({route}) => {
  const {imgBaseUrl,backgroundTheme,setError,error} = useContext(MovieContext)
  const {id,title} = route.params;
  const [movie,setMovie] = useState([]);
  const [video,setVideo] = useState([]);
  const [images,setImages] = useState([]);
  const [credit,setCredit] = useState([]);
  const [n,setN] = useState('');
  const [y,setY] = useState('');
  const [i,setI] = useState('');
  const [c,setC] = useState('');
  const [trailer,setTrailer] = useState(false);
  const navigation = useNavigation();


  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  
  useEffect(()=>{

    navigation.setOptions({
    title:title
  })
  console.log(`Movie id: ${id}`);

  },[n,id])
  
  
  const getMovie = async()=>{
    
    try{
    const response = await tmdbapi.get(`movie/${id}`);

    setMovie(response.data);
   // console.log(response.data);
    //console.log(vid.data)

    setN('Ok');
    console.log('called');

    }catch(err){
     setError('Network error');
     setN('');
    }
      
  }

  const getMovieImages = async() =>{
    try{
   
      const response = await tmdbapi.get(`movie/${id}/images`);
      setImages(response.data.backdrops);
    
     // console.log(response.data);
      //console.log(response.data.backdrops)
      setI('Ok');
  
      }catch(err){
       setError('Network error');
       
      }

  }

  const getYoutubeVideo = async() =>{
    try{
      const vid = await tmdbapi.get(`movie/${id}/videos`);
   
      setVideo(vid.data.results);
    //  console.log(vid.data.results);
      setY('Ok');
  
      }catch(err){
       setError('Network error');
   
      } 
  }

  const getCreditMovie = async()=>{
    try{
      const response  = await tmdbapi.get(`movie/${id}/credits?language=en-US`);
   
      setCredit(response.data.cast);
      //console.log(response.data.cast);

      setC('Ok');
  
      }catch(err){
       setError('Network error');
   
      }  
  }

  useEffect(()=>{
    getMovie();
  console.log(id);
  },[n,id])



  useEffect(()=>{
    getMovieImages();
    console.log('Image ok');
  },[n,i,id])

     useEffect(()=>{
    getYoutubeVideo();
    console.log('video ok');
   
  },[n,y,id])

  useEffect(()=>{
  getCreditMovie();
  console.log('Credit ok');
  },[n,c,id])
  return (
    <ScrollView contentContainerStyle={styles.container}>
      
     {n ? 
        <ScrollView>

        <ScrollView
        contentContainerStyle={styles.container}
        horizontal
       >
        {i ? 
          <FlatList 
         horizontal
         showsHorizontalScrollIndicator={false}
        data={images}
        keyExtractor={item => item.id}
        renderItem={({item})=>{
          return(
           <Image style={{width:250,height:200}} source={{uri: `${imgBaseUrl}${item.file_path}`}} /> 
          )
        }}
        />
        : <Loader size={30} msg={error? error: 'Loading..'} />}
      
        
        </ScrollView>


       
     
      <View style={styles.content}>
       <Text style={{fontSize:20}} >{movie.original_title}</Text>
       <Text style={{fontSize:14}}>Language:{movie.original_language}</Text>
       <Text>{movie.release_date}</Text>
       <View style={{flexDirection:'row'}}>{movie.genres.map(item =>{
        return(
          <Pressable style={{paddingRight:5}} onPress={() => navigation.navigate('Genre',{id:item.id,name:item.name})}><Text style={{color: 'blue',fontWeight: '700'}}>{item.name}</Text></Pressable>
        )
       })}
       </View>
       <View style={styles.overview}>
        <Text style={{fontSize:20}}>Overview</Text>
      <Text>{movie.overview}</Text>
      <View style={{flexDirection: 'row',alignItem: 'flex-end',marginVertical:10}}>
        <MaterialCommunityIcons name="web" size={24} color="black" /> 

        <Text style={{color:'blue',fontWeight: '700'}} onPress={()=> Linking.openURL(movie.homepage)}>{movie.homepage}</Text>

      </View>
      
       </View>
       
       {c ?
          <FlatList 
        horizontal
        showsHorizontalScrollIndicator={false}
       data={credit}
       keyExtractor={item => item.id}
       renderItem={({item}) =>{
        return (
          <Pressable style={{margin:5}} onPress={() => navigation.navigate('Actor',{id:item.id,name:item.original_name})}>
             <Image style={{width:150,height:150,borderRadius:10}} source={{uri: `${imgBaseUrl}${item.profile_path}`}}/> 
             
             <View style={{margin:5}}>
              <Text numberOfLines={1} ellipsizeMode='tail' style={{width:150}}>{item.original_name}</Text>
             <Text numberOfLines={1} ellipsizeMode='tail' style={{width:150}}>{item.character}</Text>
             </View>
            

          </Pressable>
        
        )
       }}

       />:
       <Loader size={30} msg={error? error: 'Loading..'} />
       }
    

      {video && (
       <View style={{alignItems:'center',justifyContent:'center',margin:10}} >
         <Button icon="play" mode="contained" onPress={toggleModal}  disabled={video.length == 0 ? true: false }>
          Play trailer
        </Button> 
      </View>
      )}
     
     
      <Modal 
      isVisible={isModalVisible}
      onBackdropPress={() => setModalVisible(false)}

       >

        <Pressable  onPress={toggleModal }>
           <AntDesign  style={styles.closeBtn}  name="close" size={30} color="white" />
        </Pressable>
     

        <View style={{ flex: 1}}>

    
        {video.length !== 0 ? (
                <YoutubePlayer
                webViewStyle={{margin:10,marginBottom:0}}
              height={300}
              play={false}
              videoId={video[0].key}
              />   
              ): null}  
          <Button title="Hide modal"  onPress={toggleModal} />
        </View>
      </Modal>
   
         
  

       
  
     
    

       <View style={styles.production_comp}>
        <Text style={{fontSize:20,fontWeight:'700'}}>Production Companies</Text>
        <FlatList 
        horizontal
        showsHorizontalScrollIndicator={false}
        data={movie.production_companies}
        keyExtractor={item => item.id}
        renderItem={({item})=>{
          return(
            <View style={{margin:5}}>
              <Image style={{width:100,height:50}} source={{uri: `${imgBaseUrl}${item.logo_path}`}} />
              <Text>{item.name}</Text>
              </View>
          )
        }}
        />
       </View>
    
      </View>

      </ScrollView>
     : <Loader size={100} msg={error? error: 'Loading..'} reload={setN}  />}
   
      
    </ScrollView>
  )
}

export default MovieScreen

const styles = StyleSheet.create({
  container:{
    alignItems:'center',
    justifyContent: 'center',
    flex:1
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#00ff00',
    padding: 100,
  },
  content:{
    margin:10
  },
  overview:{
    backgroundColor: '#f1f1f1',
    marginVertical:10
  }, closeBtn:{
    margin:10
}
})