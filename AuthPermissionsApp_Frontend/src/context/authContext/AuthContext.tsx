/* el context es quien va a exponer los datos a los demás componentes */
import {createContext, useContext} from 'react';
import {
  LoginDataInterface,
  RegisterDataInterface,
  UserInterface,
} from '../../interfaces/appInterfaces';

/* aquí es donde se coloca qué es lo que quiero distribuir en el value del Provider, aquí deberían estar todos los métodos, estados, etc... */
interface AuthContextProps {
  status: 'checking' | 'authenticated' | 'not-authenticated';
  user: UserInterface | null;
  token: string | null;
  errorMessage: string;
  singIn: (loginData: LoginDataInterface) => void;
  singUp: (registerData: RegisterDataInterface) => void;
  logOut: () => void;
  removeError: () => void;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
);

/* también se puede crear como un custom hook aquí para utilizar este contexto y ahorrarnos unas importaciones y líneas de código adicionales en donde se vaya a utilizar este contexto... */
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within a Provider...');
  }

  return {
    ...context,
  };
};
