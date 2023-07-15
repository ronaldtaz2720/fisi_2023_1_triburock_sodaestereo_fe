import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import HomeScreen from './Screens/HomeScreen';
import ReservarCita from './Screens/ReservarCita';
import ListaDoctoresScreen from './Screens/ListaDoctoresScreen';
import EspecialidadScreen from './Screens/EspecialidadScreen';
import DoctorScreen from './Screens/DoctorScreen'

const Stack = createStackNavigator()

export default function App() {

  const headerOptions = {
    headerStyle: {
      backgroundColor: '#fff',
    },
    headerTintColor: 'black',
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Agenda tu cita" component={ReservarCita} options={{headerOptions}}/>
        <Stack.Screen name="Doctores" component={ListaDoctoresScreen} options={{headerOptions}}/>
        <Stack.Screen name="Especialidades" component={EspecialidadScreen} options={{headerOptions}}/>
        <Stack.Screen name="Doctor" component={DoctorScreen} options={{headerOptions}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

