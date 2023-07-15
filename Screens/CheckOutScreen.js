import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'

const CheckOutScreen = ({route, navigation}) => {

    const { especialidad, doctor, fecha, horario } = route.params;

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 30 }}>
        <Text style={styles.label}>Especialidad</Text>
        <View style={styles.pickerContainer}>
          <Text style={styles.text}>{especialidad.nombre}</Text>
        </View>
      </View>
      

      <View style={{ marginBottom: 30 }}>
        <Text style={styles.label}>Doctores</Text>
        <View style={styles.pickerContainer}>
            <Text style={styles.text}>{doctor.nombre}</Text>
        </View>
      </View>

      <View style={{ marginBottom: 30 }}>
        <Text style={styles.label}>Fecha</Text>
        <View style={styles.pickerContainer}>
            <Text style={styles.text}>{fecha}</Text>
        </View>
      </View>

      <View style={{ marginBottom: 30 }}>
        <Text style={styles.label}>Horario</Text>
        <View style={styles.pickerContainer}>
            <Text style={styles.text}>{horario}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.btnContinuar}>
        <Text style={{fontSize: 15, fontWeight: 'bold', color: '#fff'}}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent:'center',
      padding: 20,
      backgroundColor: '#fff'
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 10,
        width: 300,
        backgroundColor: '#ddd'
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
        color: '#1512a4',
        fontWeight: 'bold',
        fontSize: 25,
    },
    text: {
        padding: 10,
        textAlign: 'center'
    },
    btnContinuar: {
        padding: 10,
        backgroundColor: '#1512a4',
        width: 180,
        borderRadius: 10,
        alignItems: 'center'
      }
})

export default CheckOutScreen