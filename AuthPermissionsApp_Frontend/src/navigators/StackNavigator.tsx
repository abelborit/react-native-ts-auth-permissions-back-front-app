import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../screens/LoginScreen';
import {RegisterScreen} from '../screens/RegisterScreen';
import {ProtectedScreen} from '../screens/ProtectedScreen';

export type RootStackParams = {
  /* colocar las rutas que vamos a tener */
  LoginScreen: undefined; // undefined significa que la ruta no tiene parámetros
  RegisterScreen: undefined;
  ProtectedScreen: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        // headerStyle: {
        //   elevation: 0, // quitar la linea abajo del header en Android
        //   shadowColor: 'transparent', // quitar la linea abajo del header en iOS
        //   backgroundColor: '#ddd',
        // },
        cardStyle: {
          backgroundColor: '#fff',
        },
      }}>
      <Stack.Screen
        name="LoginScreen"
        options={{title: 'Login'}}
        component={LoginScreen}
      />
      <Stack.Screen
        name="RegisterScreen"
        options={{title: 'Register'}}
        component={RegisterScreen}
      />
      <Stack.Screen
        name="ProtectedScreen"
        options={{title: 'Protected Route'}}
        component={ProtectedScreen}
      />
    </Stack.Navigator>
  );
};
