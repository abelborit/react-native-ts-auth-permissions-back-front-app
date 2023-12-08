/* --- LOGIN & REGISTER INTERFACES --- */
export interface LoginDataInterface {
  correo: string;
  password: string;
}

export interface RegisterDataInterface {
  nombre: string;
  correo: string;
  password: string;
}

export interface LoginRegisterResponse {
  usuario: UserInterface;
  token: string;
}

export interface UserInterface {
  rol: string;
  estado: boolean;
  google: boolean;
  nombre: string;
  correo: string;
  uid: string;
  img?: string;
}

/* --- PRODUCTS INTERFACES --- */
export interface ProductsResponse {
  total: number;
  productos: ProductsInterface[];
}

export interface ProductsInterface {
  precio: number;
  _id: string;
  nombre: string;
  categoria: CategoryInterface;
  usuario: CategoryInterface;
  img?: string;
}

// export interface CategoryInterface {
//   _id: string;
//   nombre: string;
// }

/* --- CATEGORIES INTERFACES --- */
export interface CagetoriesResponse {
  total: number;
  categorias: CategoryInterface[];
}

export interface CategoryInterface {
  _id: string;
  nombre: string;
  usuario?: CreatedByWhichUser;
}

export interface CreatedByWhichUser {
  _id: string;
  nombre: string;
}
