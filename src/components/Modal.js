import { StyleSheet, Text, View ,ScrollView} from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

const Modal = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      

      <AntDesign  style={styles.closeBtn} name="close" size={24} color="black" />

      <Text>Modal</Text>

    </ScrollView>
  )
}

export default Modal

const styles = StyleSheet.create({
    container:{
        margin:10,
        backgroundColor: 'white',
        alignItems:'center',
        justifyContent: 'center',
        position:'absolute',
        top:0,
        
        padding:60,
        zIndex:100
    },
    closeBtn:{
        position:'absolute',
        right:10,
        top:0
    }
})