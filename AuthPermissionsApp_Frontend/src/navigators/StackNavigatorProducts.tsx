import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ProductsScreen} from '../screens/ProductsScreen';
import {ProductScreen} from '../screens/ProductScreen';

export type RootStackParams = {
  /* colocar las rutas que vamos a tener */
  ProductsScreen: undefined; // undefined significa que la ruta no tiene parámetros
  ProductScreen: {
    id?: string;
    name?: string;
    category?: string; // eliminar cuando funcione la API
    img?: string; // eliminar cuando funcione la API
  }; // opcional porque se usará para actualizar o crear un producto
};

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigatorProducts = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        // headerShown: false,
        headerStyle: {
          elevation: 0, // quitar la linea abajo del header en Android colocando 0
          shadowColor: 'transparent', // quitar la linea abajo del header en iOS colocando 'transparent'
          backgroundColor: '#fff',
        },
        cardStyle: {
          backgroundColor: '#fff',
        },
      }}>
      <Stack.Screen
        name="ProductsScreen"
        options={{title: 'All Products'}}
        component={ProductsScreen}
      />
      <Stack.Screen
        name="ProductScreen"
        options={{title: 'Product'}}
        component={ProductScreen}
      />
    </Stack.Navigator>
  );
};
