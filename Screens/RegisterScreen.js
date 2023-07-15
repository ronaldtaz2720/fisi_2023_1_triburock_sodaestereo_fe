import { View, Text } from 'react-native'
import React from 'react'

const RegisterScreen = () => {
  return (
    <View>
      <TextInput placeholder='Nombre'/>
      <TextInput placeholder='Apellido'/>
      <TextInput placeholder='Email'/>
      <TextInput placeholder='Contraseña'/>
      <TouchableOpacity>
          <Text>
            Registrarse
          </Text>
        </TouchableOpacity>
    </View>
  )
}

export default RegisterScreen