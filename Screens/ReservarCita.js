import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { doctoresData, especialidades } from '../data';
import PasosCita from '../Components/PasosCita';

const ReservarCita = ({navigation}) => {
  const [selectedEspecialidad, setSelectedEspecialidad] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedFecha, setSelectedFecha] = useState('');
  const [selectedHorario, setSelectedHorario] = useState(null);
  const [especialidad, setEspecialidad] = useState('');
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleConfirmStep = () => {
    if (step === 1 && selectedEspecialidad && selectedDoctor) {
      handleNextStep();
    } else if (step === 2 && selectedFecha && selectedHorario) {
      handleNextStep();
    } else if (step === 3) {
      console.log('Formulario completado:', {
        especialidad: selectedEspecialidad,
        doctor: selectedDoctor,
        fecha: selectedFecha,
        horario: selectedHorario,
      });
    } else {
      alert('Por favor, complete todos los campos.');
    }
  };

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

 

  return (
    <View style={styles.container}>
      <PasosCita paso={step}/>
      {step === 1 && ( 
        <View>
          <Text style={styles.tituloPasos}>Paso 1: Elige los detalles</Text>
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
          <View style={styles.contenedorBoton}>
            <TouchableOpacity style={styles.btnContinuar} onPress={handleConfirmStep}>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View> 
      )}

      {step === 2 && (

      <View>
        <Text style={styles.tituloPasos}>Paso 2: Escoga fecha y hora</Text>
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

        <View style={styles.contenedorBoton}>
            <TouchableOpacity style={styles.btnContinuar} onPress={handleConfirmStep}>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>Continuar</Text>
            </TouchableOpacity>
          </View>
      </View>
      )}

      {step === 3 && (
        <View>
          <Text style={styles.tituloPasos}>Paso 3: Revise el resumen de su cita</Text>
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
                    <Text style={styles.text}>{selectedDoctor.nombre}</Text>
                </View>
              </View>

              <View style={{ marginBottom: 30 }}>
                <Text style={styles.label}>Fecha</Text>
                <View style={styles.pickerContainer}>
                    <Text style={styles.text}>{selectedFecha}</Text>
                </View>
              </View>

              <View style={{ marginBottom: 30 }}>
                <Text style={styles.label}>Horario</Text>
                <View style={styles.pickerContainer}>
                    <Text style={styles.text}>{selectedHorario}</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.btnContinuar}>
                <Text style={{fontSize: 15, fontWeight: 'bold', color: '#fff'}}>Confirmar</Text>
              </TouchableOpacity>
            </View>
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  label: {
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
  },
  contenedorBoton: {
    alignItems: 'center',
    marginTop: 30,
  },
  tituloPasos: {
    alignItems: 'center',
    fontSize: 16,
    marginBottom: 10,
    color: '#1512a4',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30
  }
});

export default ReservarCita;
