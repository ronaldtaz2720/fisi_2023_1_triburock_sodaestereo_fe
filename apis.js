const axios = require('axios');

// Función para obtener todas las especialidades
const getEspecialidades = async () => {
  try {
    const response = await axios.get('http:localhost:3000/ux-administracion-presupuesto/appcodigo/servicio-al-cliente/v1/especialidad/consultar-especialidades');
    return response.data;
  } catch (error) {
    console.error('Error al obtener las especialidades:', error);
    throw error;
  }
};

// Función para obtener las especialidades de una clínica específica
const getEspecialidadClinica = async (idClinica) => {
  try {
    const response = await axios.get(`http:localhost:3000/ux-administracion-presupuesto/appcodigo/servicio-al-cliente/v1/especialidad/consultar-especialidades/${idClinica}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las especialidades de la clínica:', error);
    throw error;
  }
};

// Función para obtener las especialidades favoritas de un usuario
const getEspecialidadesFavoritasPorUsuario = async (idUsuario) => {
  try {
    const response = await axios.get(`http:localhost:3000/ux-administracion-presupuesto/appcodigo/servicio-al-cliente/v1/especialidad/consultar-especialidades-favoritas/${idUsuario}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las especialidades favoritas del usuario:', error);
    throw error;
  }
};

// Función para asignar una especialidad como favorita
const putEspecialidadFavorita = async (especialidadId) => {
  try {
    const response = await axios.put('http:localhost:3000/ux-administracion-presupuesto/appcodigo/servicio-al-cliente/v1/especialidad/asignar-especialidades-favoritas', {
      especialidadId: especialidadId,
    });
    return response.data;
  } catch (error) {
    console.error('Error al asignar la especialidad como favorita:', error);
    throw error;
  }
};

const getMedicos = async () => {
    try {
      const response = await axios.get('http:localhost:3000/ux-cuenta/appcodigo/servicio-al-cliente/v1/medico/consultar-medicos');
      return response.data;
    } catch (error) {
      console.error('Error al obtener los médicos:', error);
      throw error;
    }
  };
  
  // Función para obtener un médico específico por su ID
  const getMedico = async (idMedico) => {
    try {
      const response = await axios.get(`http:localhost:3000/ux-cuenta/appcodigo/servicio-al-cliente/v1/medico/consultar-medico/${idMedico}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener el médico:', error);
      throw error;
    }
  };
  
  // Función para obtener los médicos favoritos de un usuario
  const getMedicosFavoritos = async (idUsuario) => {
    try {
      const response = await axios.get(`http:localhost:3000/ux-cuenta/appcodigo/servicio-al-cliente/v1/medico/consultar-medicos-favoritos/${idUsuario}`);
      return response.data;
    } catch (error) {
      console.error('Error al obtener los médicos favoritos del usuario:', error);
      throw error;
    }
  };
  
  // Función para asignar un médico como favorito para un usuario
  const putMedicoFavorito = async (idUsuario, idMedico) => {
    try {
      const response = await axios.put(`http:localhost:3000/ux-cuenta/appcodigo/servicio-al-cliente/v1/medico/asignar-medico-favorito/${idUsuario}`, { idMedico });
      return response.data;
    } catch (error) {
      console.error('Error al asignar el médico como favorito:', error);
      throw error;
    }
  };
  

  (async () => {
    try {
      const medicos = await getMedicos();
      console.log('Médicos:', medicos);
  
      const idMedico = 123;
      const medico = await getMedico(idMedico);
      console.log('Médico:', medico);
  
      const idUsuario = 456;
      const medicosFavoritos = await getMedicosFavoritos(idUsuario);
      console.log('Médicos favoritos del usuario:', medicosFavoritos);
  
      const idUsuarioAsignarFavorito = 789;
      const idMedicoAsignarFavorito = 123;
      const resultadoAsignarFavorito = await putMedicoFavorito(idUsuarioAsignarFavorito, idMedicoAsignarFavorito);
      console.log('Resultado de asignar médico favorito:', resultadoAsignarFavorito);
    } catch (error) {
      console.error('Error:', error);
    }
  })();


(async () => {
  try {
    const especialidades = await getEspecialidades();
    console.log('Especialidades:', especialidades);

    const especialidadesClinica = await getEspecialidadClinica(123);
    console.log('Especialidades de la clínica:', especialidadesClinica);

    const especialidadesFavoritas = await getEspecialidadesFavoritasPorUsuario(456);
    console.log('Especialidades favoritas del usuario:', especialidadesFavoritas);

    const resultadoAsignarFavorita = await putEspecialidadFavorita(789);
    console.log('Resultado de asignar especialidad favorita:', resultadoAsignarFavorita);
  } catch (error) {
    console.error('Error:', error);
  }
})();
