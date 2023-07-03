import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Flag from './Flag'

export default props => {
  return (
      <View style={styles.container}>
          <View style={styles.flagContainer}>
              <TouchableOpacity onPress={props.onFlagPress}
                  style={styles.flagButton}>
                  <Flag bigger />
              </TouchableOpacity>
              <Text style={styles.flagsLeft}>=  {props.flagsLeft}</Text>
          </View>
          <TouchableOpacity style={styles.button}
              onPress={props.onNewGame}>
              <Text style={styles.buttonLabel}>Novo Jogo</Text>
          </TouchableOpacity>
      </View>
  )
}

const styles = StyleSheet.create({
    container:{
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#EEE',
      alignItems: 'center',
      justifyContent: 'space-around',
      paddingTop: 20,
      paddingHorizontal: 30,
    },
    flagContainer:{
      flexDirection: 'row',
    },
    flagButton:{
      marginTop: 21,
      minWidth: 40,
    },
    flagsLeft:{
      fontSize: 40, 
      fontWeight: 'bold',
      paddingTop: 7,
      marginLeft: 17, 
    },
    button:{
      backgroundColor: '#999',
      padding: 5,
    },
    buttonLabel:{
      fontSize: 30, 
      fontWeight: 'bold',
      color: '#DDD', 
    },
})