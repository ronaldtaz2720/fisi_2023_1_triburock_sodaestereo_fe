import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useContext, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
//import { doctoresData, especialidades } from '../data';
import PasosCita from '../Components/PasosCita';
import { MyContext } from '../MyContext';
import DoctorLogo from 'react-native-vector-icons/Fontisto';
import EspecialidadLogo from 'react-native-vector-icons/Octicons';
import FechaLogo from 'react-native-vector-icons/AntDesign';
import HoraLogo from 'react-native-vector-icons/Ionicons';


const ReservarCita = ({navigation}) => {  

  const { especialidades, doctores } = useContext(MyContext);
  const [selectedClinica, setSelectedClinica] = useState(null);
  const [selectedClinicaId, setSelectedClinicaId] = useState(null);
  const [especialidadesFiltradas, setEspecialidadesFiltradas] = useState([]);
  const [selectedIdTiemposDisponibles, setSelectedIdTiemposDisponibles] = useState(null);



  const clinicas = doctores.filter(doctor => doctor.nombreClinica);
  const sedes = Array.from(new Set(clinicas.map(clinica => clinica.nombreClinica)));
  const sedesIds = clinicas.reduce((ids, clinica) => {
    if (!ids.includes(clinica.idClinica)) {
      ids.push(clinica.idClinica);
    }
    return ids;
  }, []);

  const registrarReserva = async (selectedClinicaId) => {
    const url = 'http://192.168.100.10:3100/ux-administracion-presupuesto/appcodigo/servicio-al-cliente/v1/registrar-reserva/10';
  
    const reservaData = {
      fechaagenda: selectedFecha.substring(0, 10),
      horaagenda: selectedHorario,
      idmedico: selectedDoctor.idMedico,
      idespecialidad: selectedDoctor.idEspecialidad,
      idclinica: selectedClinicaId,
      idtiempos_disponibles:2,
      precio: 100.00,
      idpago: 'COD-001',
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservaData),
      });
  
      if (response.ok) {
        // La solicitud se realizó correctamente
        console.log('Reserva registrada con éxito');
        // Aquí puedes realizar alguna acción adicional si es necesario
      } else {
        // La solicitud falló
        console.error('Error al registrar la reserva:', response.status);
        // Aquí puedes manejar el error de acuerdo a tus necesidades
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      // Aquí puedes manejar el error de acuerdo a tus necesidades
    }
  };

  const [selectedEspecialidad, setSelectedEspecialidad] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedFecha, setSelectedFecha] = useState('');
  const [selectedHorario, setSelectedHorario] = useState(null);
  const [especialidad, setEspecialidad] = useState('');
  const [step, setStep] = useState(1);
  const [fechasDisponibles, setFechasDisponibles] = useState([]);
  const [horasDisponibles, setHorasDisponibles] = useState([]);

  const fetchDisponibilidad  = async(idespecialidad, idMedico) => {
    const response = await fetch(`http://192.168.100.10:3100/ux-gestion-pagos/appcodigo/servicio-al-cliente/v1/consultar-horarios/${selectedClinicaId}/${idespecialidad}/${idMedico}`);
    const data = await response.json()

    const horariosDisponibles = data.map(item => {
      return {
        fechadisponible: item.fechadisponible,
        horadisponible: item.horadisponible,
        idtiempos_disponibles: item.idtiempos_disponibles
      };
    });
    

    // Extrae las fechas disponibles del array de objetos
    const fechas = horariosDisponibles.map(item => item.fechadisponible);
    // Extrae las horas disponibles del array de objetos
    const horas = horariosDisponibles.map(item => item.horadisponible);
    setFechasDisponibles(fechas);
    setHorasDisponibles(horas);
  }

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handleClinicaChange = (clinica) => {
    setSelectedClinica(clinica);
    const clinicaIndex = sedes.findIndex((item) => item === clinica);
    const clinicaId = sedesIds[clinicaIndex];
    setSelectedClinicaId(clinicaId);
    setSelectedEspecialidad(null);
    setSelectedDoctor(null);
    setSelectedFecha(null);

    // Filtrar las especialidades relacionadas con la clínica seleccionada
  const especialidadesFiltradas = especialidades.filter(
    (especialidad) =>
      doctores.some(
        (doctor) =>
        doctor.nombreClinica === clinica &&
        doctor.idClinica === clinicaId && // Agregar esta condición
        doctor.idEspecialidad === especialidad.idespecialidad
      )
  );
  setEspecialidadesFiltradas(especialidadesFiltradas);

  };  

  const handleConfirmStep = () => {
    if (step === 1 && selectedClinica && selectedEspecialidad && selectedDoctor) {
      fetchDisponibilidad(selectedEspecialidad, selectedDoctor.idMedico);
      handleNextStep();
    } else if (step === 2 && selectedFecha && selectedHorario) {
      handleNextStep();
    } else if (step === 3) {
      console.log(selectedHorario.idtiempos_disponibles)
      registrarReserva(selectedClinicaId); 
      navigation.navigate('Pago');
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
    const doctor = doctores.find((item) => item.idMedico === doctorId);
    setSelectedDoctor(doctor || null);
    setSelectedFecha(null);
  };

  const handleFechaChange = (fecha) => {
    setSelectedFecha(fecha);
    setSelectedHorario('');
  };

  const handleHorarioChange = (horario) => {
    setSelectedHorario(horario);
    // Obtener el id de tiempos_disponibles correspondiente al horario seleccionado
    const horarioSeleccionado = horasDisponibles.find((hora) => hora.horadisponible === horario);
    setSelectedIdTiemposDisponibles(horarioSeleccionado ? horarioSeleccionado.idtiempos_disponibles : null);
  };

 

  return (
    <View style={styles.container}>
      <PasosCita paso={step}/>
      {step === 1 && ( 
        <View>
          <Text style={styles.tituloPasos}>Paso 1: Elige los detalles</Text>

            <View style={{ marginBottom: 30 }}>
              <Text style={styles.label}>Clínica</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={selectedClinica}
                  onValueChange={handleClinicaChange}
                  style={styles.picker}
                >
                  <Picker.Item label="Escoge una clínica" value="" enabled={false} style={{ color: '#aaa' }} />
                    {sedes.map((clinica, index) => (
                      <Picker.Item key={index} label={clinica} value={clinica} />
                    ))}
                </Picker>
              </View>
            </View>

          <View style={{ marginBottom: 30 }}>
            <Text style={styles.label}>Especialidad</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedEspecialidad}
                onValueChange={handleEspeChange}
                style={styles.picker}
              >
                <Picker.Item label="Escoge una especialidad" value="" enabled={false} style={{color: '#aaa'}} />
                {especialidadesFiltradas.map((item) => (
                  <Picker.Item
                    key={item.idespecialidad}
                    label={item.nombreespecialidad}
                    value={item.idespecialidad}
                  />
                ))}
              </Picker>
            </View>
          </View>
        
          <View style={{ marginBottom: 30 }}>
            <Text style={styles.label}>Doctores</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedDoctor ? selectedDoctor.idMedico : ""}
                onValueChange={handleDoctorChange}
                style={styles.picker}
              >
                <Picker.Item label="Escoge una doctor" value="" enabled={false} style={{color: '#aaa'}} />
                  {
                  doctores
                  .filter((item) => item.idEspecialidad === selectedEspecialidad &&
                  item.idClinica === selectedClinicaId)
                  .map((doctor) => (
                    <Picker.Item
                      key={doctor.idMedico}
                      label={doctor.nombre}
                      value={doctor.idMedico}
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
              {fechasDisponibles.map((fecha, index) => (
                <Picker.Item key={index} label={fecha.substring(0, 10)} value={fecha} />
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
              {horasDisponibles.map((hora, index) => (
                <Picker.Item key={index} label={hora.substring(0, 5)} value={hora} />
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
        <ScrollView>
          <View>
            <Text style={styles.tituloPasos}>Paso 3: Revise el resumen de su cita</Text>
              <View style={styles.container}>
                  <View style={styles.confirmarContainer}>
                    <EspecialidadLogo name="checklist" size={30} color="#000" />
                    <View>
                      <Text style={styles.textConfirmar}>Especialidad</Text>
                      <Text style={styles.text}>{selectedDoctor.nombreEspecialidad}</Text>
                    </View>
                  </View>
                
                  <View style={styles.confirmarContainer}>
                      <DoctorLogo name="doctor" size={30} color="#000" />
                      <View>
                        <Text style={styles.textConfirmar}>Doctor</Text>
                        <Text style={styles.text}>{selectedDoctor.nombre}</Text>
                      </View>
                  </View>

                  <View style={styles.confirmarContainer}>
                      <FechaLogo name="calendar" size={30} color="#000" />
                      <View>
                        <Text style={styles.textConfirmar}>Fecha</Text>
                        <Text style={styles.text}>{selectedFecha.substring(0, 10)}</Text>
                      </View>
                  </View>

                  <View style={styles.confirmarContainer}>
                      <HoraLogo name="timer-outline" size={30} color="#000" />
                          <View>
                            <Text style={styles.textConfirmar}>Hora</Text>
                      <Text style={styles.text}>{selectedHorario.substring(0, 5)}</Text>
                      </View>
                </View>

                <TouchableOpacity style={styles.btnContinuar} onPress={handleConfirmStep}>
                  <Text style={{fontSize: 15, fontWeight: 'bold', color: '#000'}}>Confirmar</Text>
                </TouchableOpacity>
              </View>
          </View>
        </ScrollView>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
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
  },
  confirmarContainer: {
    borderColor: '#ccc',
    borderRadius: 10,
    width: 300,
    backgroundColor: '#ddd',
    flexDirection: 'row',
    padding: 18,
    gap: 25,
    alignItems: 'center',
    marginBottom: 15,
  },
  textConfirmar: {
    color: '#777', 
    paddingBottom: 5
  }
});

export default ReservarCita;
