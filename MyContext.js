import React, { createContext, useEffect, useState } from 'react';

export const MyContext = createContext();

export const MyContextProvider = ({ children }) => {

    //const [reservas, setReservas] = useState([]);
    const [especialidades, setEspecialidades] = useState([])
    const [doctores, setDoctores] = useState([])
    const [reservas, setReservas] = useState([])

    const fetchEspecialidades = async() => {
      try {
        const response = await fetch('http://192.168.100.10:3100/ux-administracion-presupuesto/appcodigo/servicio-al-cliente/v1/consultar-especialidades')
        const data = await response.json()
        setEspecialidades(data);
      } catch (error) {
        console.log(error)
      }
    }

    const fetchDoctores = async() => {
      try {
        const response = await fetch('http://192.168.100.10:3100/ux-cuenta/appcodigo/servicio-al-cliente/v1/consultar-medicos')
        const data = await response.json()
        setDoctores(data);
      } catch (error) {
        console.log(error)
      }
    }

    const fetchReservas = async() => {
      try {
        const response = await fetch(`http://192.168.100.10:3100/ux-administracion-presupuesto/appcodigo/servicio-al-cliente/v1/consultar-reservas/10`)
        const data = await response.json()
        setReservas(data);
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=>{
      fetchEspecialidades()
      fetchDoctores()
    },[])

    
    useEffect(()=>{
      fetchReservas()
    },[reservas])
    

  return (
    <MyContext.Provider value={{ reservas, especialidades, doctores}}>
      {children}
    </MyContext.Provider>
  );
};
