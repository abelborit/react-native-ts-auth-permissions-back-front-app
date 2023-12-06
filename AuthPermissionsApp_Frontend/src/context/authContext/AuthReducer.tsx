import {UserInterface} from '../../interfaces/appInterfaces';
import {AuthProviderStateInterface} from './AuthProvider';
/* la idea de un reducer es una función que recibe el estado y retorna un objeto del mismo tipo del estado y también recibe acciones y estas acciones nos sirven para determinar el nuevo estado. Este reducer regresará o retornará algo de tipo AuthProviderStateInterface creado en su provider */

/* se usa un type y no una interface por preferencia ya que con type para las acciones sabemos que estas no se van a extender, es algo rígido */
type ReducerActions =
  | {type: 'singIn'; payload: {token: string; user: UserInterface}}
  | {type: 'singUp'; payload: {token: string; user: UserInterface}}
  | {type: 'authError'; payload: string}
  | {type: 'removeError'}
  | {type: 'notAuthenticated'}
  | {type: 'logout'};

export const AuthReducer = (
  state: AuthProviderStateInterface,
  action: ReducerActions,
): AuthProviderStateInterface => {
  switch (action.type) {
    // case 'singIn':
    //   return {
    //     ...state,
    //     user: action.payload.user,
    //     token: action.payload.token,
    //     status: 'authenticated',
    //     errorMessage: '',
    //   };

    /* para colocar que ambas acciones realizan lo mismo */
    case 'singIn':
    case 'singUp':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        status: 'authenticated',
        errorMessage: '',
      };

    case 'authError':
      return {
        ...state,
        user: null,
        token: null,
        status: 'not-authenticated',
        errorMessage: action.payload,
      };

    case 'removeError':
      return {
        ...state,
        errorMessage: '',
      };

    /* para colocar que ambas acciones realizan lo mismo */
    case 'logout':
    case 'notAuthenticated':
      return {
        ...state,
        user: null,
        token: null,
        status: 'not-authenticated',
      };

    // case 'logout':
    //   return {
    //     ...state,
    //     user: null,
    //     token: null,
    //     status: 'not-authenticated',
    //   };

    default:
      return state;
  }
};
