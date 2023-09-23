import { StyleSheet, Text, View,Image,Pressable } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { MovieContext } from '../../App';

//https://image.tmdb.org/t/p/w500/1E5baAaEse26fej7uHcjOgEE2t2.jpg

const MovieCard = ({uri,original_title,vote_average,release_date,id}) => {
    const navigation  = useNavigation();
    const {imgBaseUrl}= useContext(MovieContext);
    
  return (

    <Pressable style={styles.card} onPress={() => navigation.navigate('Movie',{id:id,title:original_title})}>

    <Image style={{width:130,height:130}} source={{uri: `${imgBaseUrl}${uri}`}}/>
    <View style={[{margin:10}]}>
     <Text numberOfLines={1} ellipsizeMode='tail' style={[styles.contentText,{fontSize:20,width:200}]}>{original_title}</Text> 
     <Text style={[styles.contentText,{fontSize:18}]}>{release_date}</Text>
      <View style={{flexDirection:'row',alignItems: 'center'}}>
        <MaterialIcons name="star-rate" size={18} color="black" />
        <Text style={[styles.contentText,{fontSize:18}]}>{
            Math.round(vote_average * 10)/10
        }</Text>
      </View>
 
    </View>
    
   </Pressable>

  )
}

export default MovieCard

const styles = StyleSheet.create({
    contentText:{
        fontWeight: '600'
      },
    card:{
        flexDirection: 'row',
        margin:5,
        borderWidth:1.5,
        borderColor: '#e2e3e5'
      }
})