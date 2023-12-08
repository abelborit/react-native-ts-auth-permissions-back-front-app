/* crear el provider que es un componente que vamos a utilizar para obtener la información de nuestro context y es quien envolverá al componente más alto para repartir la información a sus hijos. Aquí se va a definir el estado a través de una interface para ir viendo cómo quiero que se vea a futuro la aplicación */
import React, {useReducer, useMemo, useCallback, useEffect} from 'react';
import {AuthContext} from './AuthContext';
import {AuthReducer} from './AuthReducer';
import {
  LoginDataInterface,
  LoginRegisterResponse,
  RegisterDataInterface,
  UserInterface,
} from '../../interfaces/appInterfaces';
import {authProductsAPI} from '../../apis/authProductsAPI';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ClearItemAsyncStorage,
  GetItemAsyncStorage,
  SetItemAsyncStorage,
} from '../../helpers/AsyncStorageHelper';

interface AuthProviderProps {
  children: JSX.Element | JSX.Element[];
}

/* aquí es cómo quiero que luzca mi estado inicial que no necesariamente será el mismo que la interface del Context ya que en la función de abajo se crearán funciones (porque se hará uso de los reducers en algunas ocasiones o solo funciones simples sin reducers lo cual se puede eliminar su importación) las cuales serán añadidas al value y ahí ese value tiene que satisfacer todo lo que se solicita en la interface del Context */
export interface AuthProviderStateInterface {
  status: 'checking' | 'authenticated' | 'not-authenticated';
  user: UserInterface | null;
  token: string | null;
  errorMessage: string;
}

const INITIAL_STATE: AuthProviderStateInterface = {
  status: 'checking',
  user: null,
  token: null,
  errorMessage: '',
};

export const AuthProvider = ({children}: AuthProviderProps) => {
  const [authState, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  const checkToken = async () => {
    try {
      const currentToken = await GetItemAsyncStorage('authToken');

      /* no hay token -> no autenticado */
      if (!currentToken) return dispatch({type: 'notAuthenticated'});

      /* ****************************** ELIMINAR ****************************** */
      console.log('Correct Login ✅');
      dispatch({
        type: 'singIn',
        payload: {
          user: {
            rol: 'rol_user',
            estado: true,
            google: false,
            nombre: 'Nombre 1',
            correo: 'correo@correo.com',
            uid: 'nombre_1_uid',
          },
          token: 'NUEVO_token_del_usuario',
        },
      });
      SetItemAsyncStorage('authToken', 'NUEVO_token_del_usuario');
      /* ****************************** ELIMINAR ****************************** */

      /* si hay token -> verificar el token */
      const response = await authProductsAPI.get('/auth');
      if (response.status !== 200) return dispatch({type: 'notAuthenticated'});

      SetItemAsyncStorage('authToken', response.data.token); // este sería un nuevo token ya que cada vez que se haga login se genera un nuevo token en el backend
      dispatch({
        type: 'singIn',
        payload: {
          user: response.data.usuario,
          token: response.data.token,
        },
      });
    } catch (error) {
      console.error('Error al intentar obtener el valor de AsyncStorage:', {
        error,
      });
    }
  };

  useEffect(() => {
    // /* se trabaja aquí con el .then() porque el AsyncStorage trabaja con promesas entonces como al useEffect() no puede trabajar directamente con async y no se creará una función asíncrona se puede trabajar con el .then() para trabajar con promesas pero ya se hizo un helper GetItemAsyncStorage */
    // AsyncStorage.getItem('authToken')
    //   .then(storageElement => {
    //     console.log({storageElement});
    //   })
    //   .catch(error => {
    //     console.log({error});
    //   });

    checkToken();
  }, []);

  /* funciones y métodos para colocar en el value... */
  /* Para optimizar sería bueno hacer uso de useCallback() para las funciones y useMemo() para los valores que se le pasarán al value para evitar que en cada render del provider (se hace un nuevo render cada vez que cambia el estado) se cree una nueva referencia en memoria de la misma función y el mismo objeto del estado (misma referencia en memoria pero diferente valor ya que se va cambiando). Esto es lo mismo que se haría para un custom hook para mejorar el performance y no tener fugas de memoria. Es decir, si el valor de API Context es un objeto deberemos pasarlo memorizado ya que si no se ahce esto entonces en cada render estaremos generando una nueva instancia del mismo objeto lo que provocará que todos los componentes consumidores se rendericen. Para resolver este problema emplearemos los hooks useMemo y useCallback... */

  const singIn = useCallback(async (loginData: LoginDataInterface) => {
    /* ****************************** ELIMINAR ****************************** */
    /* se está trabajando con este if ya que no se conectó a la base de datos, pero cuando se conecte entonces borrar este if y trabajar con el código de abajo */
    if (
      loginData.correo === 'correo@correo.com' &&
      loginData.password === '123456'
    ) {
      console.log('Correct Login ✅');
      dispatch({
        type: 'singIn',
        payload: {
          user: {
            rol: 'rol_user',
            estado: true,
            google: false,
            nombre: 'Nombre 1',
            correo: 'correo@correo.com',
            uid: 'nombre_1_uid',
          },
          token: 'token_del_usuario',
        },
      });
      SetItemAsyncStorage('authToken', 'token_del_usuario');
    } else {
      console.log('Incorrect Login ❌');
      dispatch({
        type: 'authError',
        payload: 'Incorrect information ❌',
      });
    }
    /* ****************************** ELIMINAR ****************************** */

    try {
      const response = await authProductsAPI.post<LoginRegisterResponse>(
        '/auth/login',
        {
          correo: loginData.correo,
          password: loginData.password,
        },
      );
      // console.log(response.data);

      dispatch({
        type: 'singIn',
        payload: {
          user: response.data.usuario,
          token: response.data.token,
        },
      });

      /* se trabaja aquí con el await porque está dentro de una función asíncrona y tiene el async al inicio pero ya se hizo un helper que es SetItemAsyncStorage */
      // await AsyncStorage.setItem('authToken', response.data.token);
      SetItemAsyncStorage('authToken', response.data.token);
    } catch (error: any) {
      console.log('error singIn', error);
      // console.log('error singIn', error.response.data.msg);
      dispatch({
        type: 'authError',
        payload:
          error.response.data.errors[0].msg || 'Incorrect information ❌',
      });
    }
  }, []);

  const singUp = useCallback(async (registerData: RegisterDataInterface) => {
    /* ****************************** ELIMINAR ****************************** */
    /* se está trabajando con este if ya que no se conectó a la base de datos, pero cuando se conecte entonces borrar este if y trabajar con el código de abajo */
    if (
      registerData.correo !== 'correo@correo.com' &&
      registerData.correo === 'correo2@correo.com' &&
      registerData.password === '123456'
    ) {
      console.log('Correct Register ✅');
      dispatch({
        type: 'singUp',
        payload: {
          user: {
            rol: 'rol_user',
            estado: true,
            google: false,
            nombre: 'Nombre 2',
            correo: 'correo2@correo.com',
            uid: 'nombre_2_uid',
          },
          token: 'token_del_usuario_2',
        },
      });
      SetItemAsyncStorage('authToken', 'token_del_usuario_2');
    } else {
      console.log('That user already exists or incorrect information ❌');
      dispatch({
        type: 'authError',
        payload: 'That user already exists or incorrect information ❌',
      });
    }
    /* ****************************** ELIMINAR ****************************** */

    try {
      const response = await authProductsAPI.post<LoginRegisterResponse>(
        '/usuarios',
        {
          nombre: registerData.nombre,
          correo: registerData.correo,
          password: registerData.password,
        },
      );
      // console.log(response.data);

      dispatch({
        type: 'singUp',
        payload: {
          user: response.data.usuario,
          token: response.data.token,
        },
      });

      /* se trabaja aquí con el await porque está dentro de una función asíncrona y tiene el async al inicio pero ya se hizo un helper que es SetItemAsyncStorage */
      // await AsyncStorage.setItem('authToken', response.data.token);
      SetItemAsyncStorage('authToken', response.data.token);
    } catch (error: any) {
      console.log('error singUp', error);
      // console.log('error singUp', error.response.data.msg);
      dispatch({
        type: 'authError',
        payload: error.response.data.msg || 'Incorrect information ❌',
      });
    }
  }, []);

  const logOut = useCallback(() => {
    dispatch({type: 'logout'});
    ClearItemAsyncStorage('authToken');
  }, []);

  const removeError = useCallback(() => {
    dispatch({type: 'removeError'});
  }, []);

  const valueProvider = useMemo(
    () => ({
      ...authState,
      singIn,
      singUp,
      logOut,
      removeError,
    }),
    [authState, singIn, singUp, logOut, removeError],
  );

  return (
    <AuthContext.Provider value={valueProvider}>
      {children}
    </AuthContext.Provider>
  );
};
