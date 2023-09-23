import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { EvilIcons } from '@expo/vector-icons';
import { useContext } from 'react';
import { MovieContext } from '../../App';

const SearchButton = () => {
  const {backgroundTheme} = useContext(MovieContext)
  return (
    <View  style={styles.searchbar}>

        <View style={{backgroundColor: backgroundTheme,padding:15}}>
          <EvilIcons name="search" size={24} color="white" />  
        </View>

     <View style={{backgroundColor: '#ced4da',flex:1,padding:15}}>
      <Text style={{color:'black'}}>Search movie/actor....</Text>  
     </View>
  
    </View>
  )
}

export default SearchButton

const styles = StyleSheet.create({
    searchbar:{
        flexDirection: 'row',
        padding:10,
        marginVertical:10,
        borderRadius:10
    }
})