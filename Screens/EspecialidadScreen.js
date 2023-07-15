import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import {especialidades} from '../data'

const DoctorScreen = () => {

  const renderDoctores = ({item}) => (
    <View>
      <TouchableOpacity onPress={()=>alert('clicked')}>
          <View style={styles.lista}>
            <Image source={item.imagen} style={styles.imagenDoctores} resizeMode="contain"/>
            <Text style={{fontSize: 15, textAlign: 'center', maxWidth: 120, fontWeight:'bold'}}>{item.nombre}</Text>
          </View>
      </TouchableOpacity>
    </View>
);

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row'}}>
      <FlatList
            data={especialidades}
            renderItem={renderDoctores}
            keyExtractor={(item) => item.id}
          />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5'
  },
  imagenDoctores:{
    width: 150,
    height: 150,
    borderRadius: 15,
    marginRight: 20,
  },
  lista:{
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 20,
    backgroundColor: '#ededed',
    borderColor: '#aaa'
  }
})

export default DoctorScreen