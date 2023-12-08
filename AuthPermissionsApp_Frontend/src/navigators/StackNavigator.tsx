import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../screens/LoginScreen';
import {RegisterScreen} from '../screens/RegisterScreen';
// import {ProtectedScreen} from '../screens/ProtectedScreen';
import {useAuthContext} from '../context/authContext/AuthContext';
import {LoaderComponent} from '../components/LoaderComponent';
import {StackNavigatorProducts} from './StackNavigatorProducts';

export type RootStackParams = {
  /* colocar las rutas que vamos a tener */
  LoginScreen: undefined; // undefined significa que la ruta no tiene parámetros
  RegisterScreen: undefined;
  // ProtectedScreen: undefined;
  StackNavigatorProducts: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  const {status} = useAuthContext();

  if (status === 'checking') {
    return <LoaderComponent />;
  }

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
      {status !== 'authenticated' ? (
        <>
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
        </>
      ) : (
        <>
          {/* <Stack.Screen
            name="ProtectedScreen"
            options={{title: 'Protected Route'}}
            component={ProtectedScreen}
          /> */}
          <Stack.Screen
            name="StackNavigatorProducts"
            options={{title: 'Products Route'}}
            component={StackNavigatorProducts}
          />
        </>
      )}
    </Stack.Navigator>
  );
};
