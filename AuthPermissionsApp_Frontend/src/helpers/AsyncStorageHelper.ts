import AsyncStorage from '@react-native-async-storage/async-storage';

// type SetItemAsyncStorageInterface<T> = {
//   keyStorage: string;
//   valueStorage: T;
// };

/* enviar los argumentos como objeto */
// export const SetItemAsyncStorage = async <T>({
//   keyStorage,
//   valueStorage,
// }: SetItemAsyncStorageInterface<T>) => {

/* enviar los argumentos como valores directos */
export const SetItemAsyncStorage = async <T>(
  keyStorage: string,
  valueStorage: T,
) => {
  // Implementación de la función para almacenar el valor asincrónicamente

  try {
    await AsyncStorage.setItem(keyStorage, JSON.stringify(valueStorage));

    console.log({valueStorage});
  } catch (error) {
    /* este catch se trabaja más que todo cuando por alguna razón no se logra leer o entrar al AsyncStorage o está bloquedo o no hay almacenamiento suficiente algo por el estilo y con eso se tendría que manejar el error de forma distinta por ejemplo diciéndole al usuario que revise el almacenamiento del dispositivo o que isntale de nuevo la aplicación, etc... porque si la keyStorage existe o no existe igual leerá el espacio en memoria y pasará por el try y si no existe dará un null y si existe entonces se obtendrá el valueStorage pero igual en esos casos no pasará por el catch */
    console.error('Error al intentar almacenar el valor en AsyncStorage:', {
      error,
    });
    // throw new Error('No se pudo almacenar el valor en AsyncStorage');
  }
};

export const GetItemAsyncStorage = async (keyStorage: string) => {
  // Implementación de la función para obtener el valor almacenado asincrónicamente

  try {
    const valueStorage = await AsyncStorage.getItem(keyStorage);
    console.log({valueStorage: JSON.parse(valueStorage ?? 'null')});

    /* operador de coalescencia nula (??) */
    return JSON.parse(valueStorage ?? 'null');
    // return valueStorage != null ? JSON.parse(valueStorage) : null;
  } catch (error) {
    /* este catch se trabaja más que todo cuando por alguna razón no se logra leer o entrar al AsyncStorage o está bloquedo o no hay almacenamiento suficiente algo por el estilo y con eso se tendría que manejar el error de forma distinta por ejemplo diciéndole al usuario que revise el almacenamiento del dispositivo o que isntale de nuevo la aplicación, etc... porque si la keyStorage existe o no existe igual leerá el espacio en memoria y pasará por el try y si no existe dará un null y si existe entonces se obtendrá el valueStorage pero igual en esos casos no pasará por el catch */
    console.error('Error al intentar obtener el valor de AsyncStorage:', {
      error,
    });
    // throw new Error('No se pudo obtener el valor de AsyncStorage');
  }
};

export const ClearItemAsyncStorage = async (keyStorage: string) => {
  // Implementación de la función para limpiar el valor almacenado asincrónicamente

  try {
    await AsyncStorage.removeItem(keyStorage);

    console.log({keyStorage});
  } catch (error) {
    /* este catch se trabaja más que todo cuando por alguna razón no se logra leer o entrar al AsyncStorage o está bloquedo o no hay almacenamiento suficiente algo por el estilo y con eso se tendría que manejar el error de forma distinta por ejemplo diciéndole al usuario que revise el almacenamiento del dispositivo o que isntale de nuevo la aplicación, etc... porque si la keyStorage existe o no existe igual leerá el espacio en memoria y pasará por el try y si no existe dará un null y si existe entonces se obtendrá el valueStorage pero igual en esos casos no pasará por el catch */
    console.error('Error al intentar remover el valor de AsyncStorage:', {
      error,
    });
    // throw new Error('No se pudo remover el valor de AsyncStorage');
  }
};
