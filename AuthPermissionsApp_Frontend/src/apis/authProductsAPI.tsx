import axios, {AxiosError, InternalAxiosRequestConfig} from 'axios';
import {GetItemAsyncStorage} from '../helpers/AsyncStorageHelper';

/* es el que se irá cambiando en modo desarrollo y producción */
// const BASE_URL = process.env.NODE_ENV === 'production' ? 'http://IP_USUARIO:8080/api' : 'http://localhost:8080/api';
export const BASE_URL = 'http://IP_USUARIO:8080/api';

export const authProductsAPI = axios.create({
  baseURL: BASE_URL,
});

/* se creó este axios interceptor ya que el token se necesitará en gran parte de la aplicación (no se usará en Login ni Register pero igual se puede hacer esto o sino también crear otra instancia de axios con esas dos API's pero en este caso lo trabajaremos así) */
authProductsAPI.interceptors.request.use(
  async (config: InternalAxiosRequestConfig<any>) => {
    try {
      const authToken = await GetItemAsyncStorage('authToken');

      if (authToken) {
        // Verifica que 'config.headers' esté definido antes de acceder a sus propiedades
        config.headers = config.headers || {};

        /* computar el header ya que tiene x-token ya que si fuera token sería solo config.headers.token */
        config.headers['x-token'] = authToken;
      }

      return config;
    } catch (error) {
      console.error('Error al intentar obtener el valor de AsyncStorage:', {
        error,
      });
    }
  },
  (error: AxiosError) => {
    // Manejar errores de solicitud
    return Promise.reject(error);
  },
);
