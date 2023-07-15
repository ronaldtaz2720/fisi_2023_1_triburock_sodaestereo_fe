import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { doctoresData, especialidades } from '../data';

const ReservarCita = ({navigation}) => {
  const [selectedEspecialidad, setSelectedEspecialidad] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedFecha, setSelectedFecha] = useState('');
  const [selectedHorario, setSelectedHorario] = useState(null);
  const [especialidad, setEspecialidad] = useState('')


  const handleEspeChange = (especialidadId) => {
    setSelectedEspecialidad(especialidadId);
    setEspecialidad(especialidades.find(item=>{
      if(item.id === especialidadId){
        return item.nombre
      }
    }))
    setSelectedDoctor(null);
    setSelectedFecha(null);
  };

  const handleDoctorChange = (doctorId) => {
    const doctor = doctoresData.find((item) => item.id === doctorId);
    setSelectedDoctor(doctor || null);
    setSelectedFecha(null);
  };

  const handleFechaChange = (fecha) => {
    setSelectedFecha(fecha);
    setSelectedHorario('');
  };

  const handleHorarioChange = (horario) => {
    setSelectedHorario(horario);
  };

  const handleEnviar = () => {
    if (selectedEspecialidad && selectedDoctor && selectedFecha && selectedHorario) {
      // Pasar los datos capturados como parámetros a la siguiente vista
      navigation.navigate('Check-Out', {
        especialidad: especialidad,
        doctor: selectedDoctor,
        fecha: selectedFecha,
        horario: selectedHorario,
      });
    } else {
      // Muestra una alerta o mensaje de error si no se han seleccionado todos los campos
      alert('Por favor, complete todos los campos.');
    }
  }

  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 30 }}>
        <Text style={styles.label}>Especialidad</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedEspecialidad}
            onValueChange={handleEspeChange}
            style={styles.picker}
          >
            <Picker.Item label="Escoge una especialidad" value="" enabled={false} style={{color: '#aaa'}} />
            {especialidades.map((item) => (
              <Picker.Item
                key={item.id}
                label={item.nombre}
                value={item.id}
              />
            ))}
          </Picker>
        </View>
      </View>
      

      <View style={{ marginBottom: 30 }}>
        <Text style={styles.label}>Doctores</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedDoctor ? selectedDoctor.id : ""}
            onValueChange={handleDoctorChange}
            style={styles.picker}
          >
            <Picker.Item label="Escoge una doctor" value="" enabled={false} style={{color: '#aaa'}} />
              {
              doctoresData
              .filter((item) => item.especialidad === selectedEspecialidad)
              .map((doctor) => (
                <Picker.Item
                  key={doctor.id}
                  label={doctor.nombre}
                  value={doctor.id}
                />
              ))}
          </Picker>
        </View>
      </View>

      <View style={{ marginBottom: 30 }}>
        <Text style={styles.label}>Fecha</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedFecha}
            onValueChange={handleFechaChange}
            style={styles.picker}
          >
            <Picker.Item label="Escoge una fecha" value="" enabled={false} style={{ color: '#aaa' }} />
            {selectedDoctor &&
              selectedDoctor.disponibilidad.map((item) => (
                <Picker.Item
                  key={item.fecha}
                  label={item.fecha}
                  value={item.fecha}
                />
              ))}
          </Picker>
        </View>
      </View>

      <View style={{ marginBottom: 30 }}>
        <Text style={styles.label}>Horario</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedHorario}
            onValueChange={handleHorarioChange}
            style={styles.picker}
          >
            <Picker.Item label="Escoge un horario" value="" enabled={false} style={{ color: '#aaa' }} />
            {selectedDoctor &&
              selectedDoctor.disponibilidad
                .filter((item) => item.fecha === selectedFecha)
                .map((item) => (
                  <Picker.Item
                    key={item.hora}
                    label={item.hora}
                    value={item.hora}
                  />
                ))}
          </Picker>
        </View>
      </View>

      <TouchableOpacity style={styles.btnContinuar} onPress={handleEnviar}>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>Continuar</Text>
      </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    color: '#1512a4',
    fontWeight: 'bold',
    fontSize: 25,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 10,
    width: 300,
    backgroundColor: '#ddd'
  },
  picker: {
    height: 40,
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    justifyContent: 'center',
  },
  btnContinuar: {
    padding: 10,
    backgroundColor: '#ccc',
    width: 180,
    borderRadius: 10,
    alignItems: 'center'
  }
});

export default ReservarCita;
