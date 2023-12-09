/* el context es quien va a exponer los datos a los demás componentes */
import {createContext, useContext} from 'react';
import {ProductsInterface} from '../../interfaces/appInterfaces';
import {ImagePickerResponse} from 'react-native-image-picker';

/* aquí es donde se coloca qué es lo que quiero distribuir en el value del Provider, aquí deberían estar todos los métodos, estados, etc... */
interface ProductsContextProps {
  productsState: ProductsInterface[];
  loadProducts: () => Promise<void>;
  addProduct: (
    categoryId: string,
    productName: string,
  ) => Promise<ProductsInterface>;
  updateProduct: (
    categoryId: string,
    productName: string,
    productId: string,
  ) => Promise<void>;
  // deleteProduct: (id: string) => Promise<void>;
  loadProductById: (id: string) => Promise<ProductsInterface>;
  uploadImage: (dataPhoto: ImagePickerResponse, id: string) => Promise<void>;
}

export const ProductsContext = createContext<ProductsContextProps>(
  {} as ProductsContextProps,
);

/* también se puede crear como un custom hook aquí para utilizar este contexto y ahorrarnos unas importaciones y líneas de código adicionales en donde se vaya a utilizar este contexto... */
export const useProductsContext = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProductsContext must be used within a Provider...');
  }

  return {
    ...context,
  };
};
