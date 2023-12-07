import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StackNavigator} from './src/navigators/StackNavigator';
import {AuthProvider} from './src/context/authContext/AuthProvider';
import {ProductsProvider} from './src/context/productContext/ProductsProvider';

export const App = () => {
  return (
    <AuthProvider>
      <ProductsProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </ProductsProvider>
    </AuthProvider>
  );
};
