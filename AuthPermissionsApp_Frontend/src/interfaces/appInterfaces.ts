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
