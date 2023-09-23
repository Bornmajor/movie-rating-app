import { StyleSheet, Text, View,FlatList,Image,Pressable } from 'react-native'
import React from 'react'
import { useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useContext } from 'react'
import { MovieContext } from '../../App'
import { Feather } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Loader from './Loader'

const MovieView = ({list,title,path}) => {
 

  const navigation = useNavigation();
  const {imgBaseUrl,backgroundTheme} = useContext(MovieContext)

  return (
    <View style={{margin:10}}>

      <View style={{flexDirection:'row',marginVertical:10}}>
      <Text style={{fontSize:25}}>{title}</Text> 

      <Pressable style={styles.linkGenre} onPress={() => navigation.navigate('List',{path:path,title:title})}>
      <MaterialIcons name="arrow-forward-ios" size={25} color="black" />
      </Pressable> 

      </View>
   

      <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      initialNumToRender={5}
      maxToRenderPerBatch={5}
      updateCellsBatchingPeriod={50}
      data={list}
      keyExtractor={item => item.id}
      renderItem={({item}) =>{
        return(
          
        <Pressable style={{marginRight:10}} onPress={() => navigation.navigate('Movie',{id:item.id,title:item.original_title})}>

            <Image style={{width:200,height:250}} source={{uri: `${imgBaseUrl}${item.poster_path}`}} />
              
            <View style={{flexDirection:'row',alignItems: 'center'}}>

            <View style={[styles.vote_rating,{backgroundColor:backgroundTheme}]}>
              <Text style={{fontSize:20,color:'white'}}>{
                Math.round(item.vote_average * 10)/10
             
              }</Text>
            </View>

            <View>
            <Text numberOfLines={1} ellipsizeMode='tail' style={{fontSize:18,width:150}}>{item.original_title}</Text>
            <Text>{item.release_date}</Text>   
            </View>
            
              </View>
           

        </Pressable>   
        )
      }}
     />  
    </View>
    
  )
}

export default MovieView

const styles = StyleSheet.create({
  vote_rating:{
    margin:5,
    width:38,
    height:38,
    borderRadius:38/2,
    alignItems:'center',
    padding:5,

  },
  linkGenre:{
    flexDirection:'row',
    backgroundColor:'#e2e3e5',
    marginLeft:10,
    padding:5,
    borderRadius:8
  }
})