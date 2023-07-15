import { View, Text } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'

const LoginScreen = () => {
  return (
    <View>
      <TextInput placeholder='Email'/>
      <TextInput placeholder='Contraseña'/>
      <TouchableOpacity>
        <Text>Entrar</Text>
      </TouchableOpacity>
      <View>
        <Text>¿No tiene una cuenta?</Text>
        <TouchableOpacity>
          <Text>
            Registrarse
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginScreen