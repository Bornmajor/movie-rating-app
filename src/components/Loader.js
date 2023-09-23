import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect, useState} from 'react'
import { ActivityIndicator } from 'react-native'
import { useContext } from 'react'
import { MovieContext } from '../../App'
import NetInfo from '@react-native-community/netinfo'
import { Button } from 'react-native-paper'

const Loader = ({msg,size,reload}) => {
    const {backgroundTheme} = useContext(MovieContext);
    const [visible,setVisible] = useState('none');
    const [netStat,setNetStat] = useState('')

    useEffect(()=>{
      NetInfo.fetch().then(state => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
        if(state.isConnected == 'false'){
         setVisible('block');
        }else if(state.isConnected == 'true'){
         setVisible('none');
        }
      });
      if(msg == 'Network error'){
        reload();
        setVisible('block');
      }

    },[])
  return (
    <View style={{alignItems:'center',justifyContent:'center'}}>
         <ActivityIndicator  size={size} color={backgroundTheme}/>
         <Text style={{textAlign:'center'}}>Loading...</Text>
          {/* <Button icon='reload' onPress={() => {
          reload()
          setVisible('none');
          }
          }
           mode='contained'
            style={{display: visible,margin:5,fontSize:14}}>
              Reload
          </Button> */}
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({})