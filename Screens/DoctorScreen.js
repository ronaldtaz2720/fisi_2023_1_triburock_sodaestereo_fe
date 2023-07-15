import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Doctor from '../Components/Doctor'

const DoctorScreen = ({route}) => {

  const {item} = route.params

  return (
    <View style={styles.container}>
      <Doctor item={item}/>
      <View>
        <Text style={styles.titulo}>Nuestra especialidad</Text>
        <Text style={styles.texto}>
        La dermatología es una especialidad de la medicina que se ocupa del conocimiento y estudio de la piel humana y de las enfermedades que la afectan. Esta especialidad también se preocupa de la prevención de las enfermedades y de la preservación o la recuperación de la normalidad cutánea así como de la dermocosmética que se dedica a la higiene, a la apariencia y protección de la piel.
        </Text>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity style={styles.btnAgendar} onPress={()=>navigation.navigate('Reservar Cita')}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>
            Agendar Cita
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
  },
  titulo: {
    fontSize: 20,
    color: '#1512a4',
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 15
  },
  texto: {
    color: '#3c3c43'
  },
  btnAgendar: {
    marginVertical: 60,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    width: 150,
  }
})

export default DoctorScreen