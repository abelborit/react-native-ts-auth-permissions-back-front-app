/* crear el provider que es un componente que vamos a utilizar para obtener la información de nuestro context y es quien envolverá al componente más alto para repartir la información a sus hijos. Aquí se va a definir el estado a través de una interface para ir viendo cómo quiero que se vea a futuro la aplicación */
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {ProductsContext} from './ProductsContext';
import {
  ProductsInterface,
  ProductsResponse,
} from '../../interfaces/appInterfaces';
import {authProductsAPI} from '../../apis/authProductsAPI';

interface ProductsProviderProps {
  children: JSX.Element | JSX.Element[];
}

/* aquí es cómo quiero que luzca mi estado inicial que no necesariamente será el mismo que la interface del Context ya que en la función de abajo se crearán funciones (porque se hará uso de los reducers en algunas ocasiones o solo funciones simples sin reducers lo cual se puede eliminar su importación) las cuales serán añadidas al value y ahí ese value tiene que satisfacer todo lo que se solicita en la interface del Context */
// export interface ProductsProviderStateInterface {
//   products: ProductsInterface[];
// }

// const INITIAL_STATE: ProductsProviderStateInterface = {
//   products: [],
// };

export const ProductsProvider = ({children}: ProductsProviderProps) => {
  // const [productsState, setProductsState] = useState(INITIAL_STATE.products);
  const [productsState, setProductsState] = useState<ProductsInterface[]>([]);

  /* funciones y métodos para colocar en el value... */
  /* Para optimizar sería bueno hacer uso de useCallback() para las funciones y useMemo() para los valores que se le pasarán al value para evitar que en cada render del provider (se hace un nuevo render cada vez que cambia el estado) se cree una nueva referencia en memoria de la misma función y el mismo objeto del estado (misma referencia en memoria pero diferente valor ya que se va cambiando). Esto es lo mismo que se haría para un custom hook para mejorar el performance y no tener fugas de memoria. Es decir, si el valor de API Context es un objeto deberemos pasarlo memorizado ya que si no se ahce esto entonces en cada render estaremos generando una nueva instancia del mismo objeto lo que provocará que todos los componentes consumidores se rendericen. Para resolver este problema emplearemos los hooks useMemo y useCallback... */

  const loadProducts = useCallback(async () => {
    try {
      const response = await authProductsAPI.get<ProductsResponse>(
        '/productos?limite=50',
      );

      // setProductsState(prevState => [...prevState, ...response.data.productos]);
      setProductsState([...response.data.productos]);
    } catch (error) {
      console.log('error loadProducts', error);
    }
  }, []);

  useEffect(() => {
    loadProducts();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addProduct = useCallback(
    async (
      categoryId: string,
      productName: string,
    ) /* : Promise<ProductsInterface> */ => {
      // console.log('addProduct');
      // console.log({categoryId, productName});
      try {
        const response = await authProductsAPI.post<ProductsInterface>(
          '/productos',
          {
            nombre: productName,
            categoria: categoryId,
          },
        );

        setProductsState(prevState => [...prevState, response.data]);

        /* se retorna para tener esa data a la mano por si se requiere hacer algo adicional como mostrar una alerta o mostrar los botones de cámara o galería */
        return response.data;
      } catch (error) {
        console.log('error addProduct', error);
      }
    },
    [],
  );

  const updateProduct = useCallback(
    async (categoryId: string, productName: string, productId: string) => {
      // console.log('updateProduct');
      // console.log({categoryId, productName, productId});
      try {
        const response = await authProductsAPI.put<ProductsInterface>(
          `/productos/${productId}`,
          {
            nombre: productName,
            categoria: categoryId,
          },
        );

        setProductsState(
          productsState.map(product => {
            return product._id === productId ? response.data : product;
          }),
        );
      } catch (error) {
        console.log('error updateProduct', error);
      }
    },
    [productsState],
  );

  const loadProductById = useCallback(
    async (id: string) /* : Promise<ProductsInterface> */ => {
      try {
        const response = await authProductsAPI.get<ProductsInterface>(
          `/productos/${id}`,
        );

        return response.data;
      } catch (error) {
        console.log('error loadProductById', error);
      }
    },
    [],
  );

  const uploadImage = useCallback(async (data: any, id: string) => {}, []);

  // const deleteProduct = useCallback(async (id: string) => {}, []);

  const valueProvider = useMemo(
    () => ({
      ...productsState,
      loadProducts,
      addProduct,
      updateProduct,
      // deleteProduct,
      loadProductById,
      uploadImage,
    }),
    [
      productsState,
      addProduct,
      // deleteProduct,
      loadProductById,
      loadProducts,
      updateProduct,
      uploadImage,
    ],
  );

  return (
    <ProductsContext.Provider value={valueProvider}>
      {children}
    </ProductsContext.Provider>
  );
};
