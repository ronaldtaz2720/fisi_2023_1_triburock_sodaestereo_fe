import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import {especialidades} from '../data'

const Doctor = ({item, navigation}) => {

    const especialidad = especialidades.find((especialidad) => especialidad.id === item.especialidad)
    const nombreEspecialidad = especialidad ? especialidad.nombre : ''

  return (
    <View>
      <TouchableOpacity onPress={()=>navigation.navigate('Doctor', {item:item})}>
          <View style={styles.lista}>
            <Image source={item.imagen} style={styles.imagenDoctores} resizeMode="contain"/>
            <View >
              <Text style={styles.nombreDoctor}>{item.nombre}</Text>
              <Text>{nombreEspecialidad}</Text>
            </View>
          </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    imagenDoctores:{
      width: 125,
      height: 125,
      borderRadius: 15,
      marginRight: 20,
    },
    lista:{
      flexDirection: 'row',
      borderWidth: 1,
      borderRadius: 15,
      marginBottom: 20,
      backgroundColor: '#ededed',
      borderColor: 'transparent',
      padding: 15,
    },
    nombreDoctor: {
      fontSize: 18,  
      maxWidth: 120, 
      fontWeight:'bold', 
    }
  })

export default Doctor