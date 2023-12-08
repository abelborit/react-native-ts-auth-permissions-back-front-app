import {useEffect, useState} from 'react';
import {
  CagetoriesResponse,
  CategoryInterface,
} from '../interfaces/appInterfaces';
import {authProductsAPI} from '../apis/authProductsAPI';

export const useCategories = () => {
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [categoriesState, setCategoriesState] = useState<CategoryInterface[]>(
    [],
  );

  const getCategories = async () => {
    setIsLoadingCategories(true);

    try {
      const response = await authProductsAPI.get<CagetoriesResponse>(
        '/categorias',
      );

      setCategoriesState(response.data.categorias);
    } catch (error) {
      console.log('error getCategories', error);
    } finally {
      setIsLoadingCategories(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return {
    categoriesState,
    isLoadingCategories,
  };
};
