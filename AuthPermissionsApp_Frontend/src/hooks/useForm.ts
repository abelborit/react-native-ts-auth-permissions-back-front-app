import {useState} from 'react';

/* T se extenderá de cualquier objeto */
/* No usar Object como tipo <T extends Object>. El tipo Object en realidad significa "cualquier valor no null", por lo que es ligeramente mejor que "unkdown". */

/* Si desea un tipo que signifique "cualquier objeto", probablemente desee Record <string, unknown> en su lugar. Esto le dice a typescript como sera el tipo del objeto key, value, es decir accedemos con una key de tipo string y el value puede ser cualquier cosa. */

/* FORMA 1 */
// export const useForm = <T extends Record<string, unknown>>(initialState: T) => {
//   const [formState, setFormState] = useState(initialState);

//   const handleChangeForm = (value: string | boolean, inputField: keyof T) => {
//     setFormState({
//       ...formState,
//       [inputField]: value,
//     });
//   };

//   return {
//     ...formState,
//     formState,
//     handleChangeForm,
//   };
// };

/* FORMA 2 */
/* <T extends {[key: string]: string | number | boolean}> para que acepte objetos donde su value puede ser string, number o boolean */
export const useForm = <T extends {[key: string]: string | number | boolean}>(
  initialState: T,
) => {
  const [formState, setFormState] = useState(initialState);

  /* se coloca de esta forma <K extends keyof T> para yo poder mandarle otro tipo de dato según lo que ya le estoy mandando con el genérico T, es decir, si le mando un value de tipo string entonces que lo trate como string, si le mando un value de tipo boolean entonces que lo trate como boolean, etc.... */
  const handleChangeForm = <K extends keyof T>(value: T[K], inputField: K) => {
    setFormState({
      ...formState,
      [inputField]: value,
    });
  };

  return {
    ...formState,
    formState,
    handleChangeForm,
  };
};
