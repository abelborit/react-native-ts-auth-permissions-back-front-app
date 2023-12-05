module.exports = {
  root: true,
  extends: '@react-native',
  rules: {
    /* evitar que aparezcan warnings de: "Inline style: { <Propiedad>:<Valor> }" cuando se colocan estilos en línea */
    'react-native/no-inline-styles': 'off',
    /* evitar que aparezcan warnings de: "Expected { after 'if' condition." que es para especificar cómo deben utilizarse las llaves en las estructuras de control (if, else, while, etc...) en JavaScript, TypeScript para que se puedan aceptar con llaves para bloques de código y también sin llaves cuando es solo una sola declaración de código */
    curly: ['error', 'multi-line'],
    /* evitar que aparezcan warning de: "Do not define components during render. React will see a new component type on every render and destroy the entire subtree’s DOM nodes and state (https://reactjs.org/docs/reconciliation.html#elements-of-different-types). Instead, move this component definition out of the parent component “BottomTabsNavigator” and pass data as props. If you want to allow component creation in props, set allowAsProps option to true." que son para evitar componentes anidados en la renderización de ese componente */
    'react/no-unstable-nested-components': 'off',
  },
};
