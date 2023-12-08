import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {RootStackParams} from '../navigators/StackNavigatorProducts';
import {globalTheme} from '../theme/globalTheme';
import {useCategories} from '../hooks/useCategories';
import {useForm} from '../hooks/useForm';
import {useProductsContext} from '../context/productContext/ProductsContext';

const FICTITIOUS_CATEGORIES = [
  {
    _id: 'asd483673546',
    nombre: 'CONTROLES',
    usuario: {
      id: '87898asdasda',
      nombre: 'Nombre 1',
    },
  },
  {
    _id: 'a853759ASES58',
    nombre: 'PANTALLAS',
    usuario: {
      id: '87898asdasda',
      nombre: 'Nombre 1',
    },
  },
  {
    _id: 'yeogmuvmr825',
    nombre: 'TECLADOS',
    usuario: {
      id: '87898asdasda',
      nombre: 'Nombre 1',
    },
  },
];

interface ProductScreenProps
  extends StackScreenProps<RootStackParams, 'ProductScreen'> {}

export const ProductScreen = ({navigation, route}: ProductScreenProps) => {
  /* hay que eliminar category = '', img = '' cuando funcione la API */
  const {id = '', name = '', category = '', img = ''} = route.params;
  const {categoriesState, isLoadingCategories} = useCategories();
  const {loadProductById, addProduct, updateProduct} = useProductsContext();
  const {formState, handleChangeForm, setFormValue} = useForm({
    _id: id,
    categoriaID: category, // colocar categoriaID: '' cuando funcione la API
    nombre: name,
    img: img, // colocar img: '' cuando funcione la API
  });

  useEffect(() => {
    navigation.setOptions({
      title: formState.nombre ? formState.nombre : 'Sin nombre del producto',
      headerTitleAlign: 'center',
      headerTintColor: formState.nombre
        ? globalTheme.globalSecondaryColorLight
        : '#D00',
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formState.nombre]);

  const loadProduct = async () => {
    if (id.length === 0) return; // el id puede ser vacío entonces se hace una validación

    const response = await loadProductById(id);
    setFormValue({
      ...formState,
      categoriaID: response.categoria._id,
    });
    // setFormValue({
    //   _id: id,
    //   categoriaID: response.categoria._id,
    //   img: response.img || '',
    //   nombre: formState.nombre,
    // });
  };

  useEffect(() => {
    loadProduct();

    /* aquí se podría mandar a llamar al handleChangeForm y cambiar los valores del formulario que nos haga falta como el categoriaID o img pero lo que se hará es crear una nueva función en el useForm por si queremos actualizar algún valor del formulario */

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveOrUpdateProduct = async () => {
    if (id.length > 0) {
      updateProduct(formState.categoriaID, formState.nombre, formState._id);
    } else {
      /* porque cabe la posibilidad de que la categoria se mande como string vacío al momento de guardar, entonces si es así que tome la primera categoría ya que no seleccionó otra y si selecciona entonces que tome esa categoría seleccionada. Se podría colocar un if() y mostrar una alerta o información adicional pero de esta forma es suficiente para este proyecto */
      const templateCategory = formState.categoriaID || categoriesState[0]._id;
      const newProduct = await addProduct(templateCategory, formState.nombre);

      handleChangeForm(newProduct._id, '_id');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.containerInput}>
          <Text style={styles.labelProduct}>Product Name:</Text>
          <TextInput
            style={styles.inputProduct}
            placeholderTextColor={globalTheme.gray777}
            placeholder="Product"
            value={formState.nombre}
            onChangeText={value => handleChangeForm(value, 'nombre')}
          />
        </View>

        <View style={styles.containerInput}>
          <Text style={styles.labelProduct}>Category Name:</Text>

          <View>
            {isLoadingCategories ? (
              <View style={{marginVertical: 18}}>
                <ActivityIndicator
                  size={35}
                  color={globalTheme.globalPrimaryColor}
                />
              </View>
            ) : (
              /* este Picker cambia su diseño y estilos en Android y iOS (son estilos diferentes) */
              <Picker
                selectedValue={formState.categoriaID}
                onValueChange={itemValue =>
                  handleChangeForm(itemValue, 'categoriaID')
                }
                mode="dialog"
                dropdownIconRippleColor={globalTheme.globalPrimaryColor}
                style={styles.pickerCategoryContainer}>
                {/* puede ser que haya un problema, cuando se guarde la categoría, y se sale de la pantalla de ProductScreen y se vuelve a entrar puede aparecer que el producto era el de la primera categoría que apareciera en el picker (en este caso CONTROLES). Para solucionarlo se puede colocar hacer una condición que mientras no se obtenga el dato de categoriaID que se muestre un ActivityIndicator, ya que la app no obtendría el dato de manera inmediata, y por lo tanto se tomaba CONTROLES como valor por defecto */}
                {/* {categoriesState.map(element => (
                <Picker.Item
                  key={element._id}
                  label={element.nombre}
                  value={element._id}
                  style={styles.pickerCategoryOption}
                />
              ))} */}
                {FICTITIOUS_CATEGORIES.map(element => (
                  <Picker.Item
                    key={element._id}
                    label={element.nombre}
                    value={element._id}
                    style={styles.pickerCategoryOption}
                  />
                ))}
              </Picker>
            )}
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.8}
            onPress={() => saveOrUpdateProduct()}>
            <Text style={styles.buttonText}>Save Product</Text>
          </TouchableOpacity>
        </View>

        {formState._id.length > 0 ? (
          <View style={styles.buttonContainerSecondary}>
            <TouchableOpacity
              style={styles.buttonStyleSecondary}
              activeOpacity={0.8}>
              <Text style={styles.buttonTextSecondary}>Open Camara</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonStyleSecondary}
              activeOpacity={0.8}>
              <Text style={styles.buttonTextSecondary}>Open Galery</Text>
            </TouchableOpacity>
          </View>
        ) : null}

        {formState.img.length > 0 ? (
          <Image
            source={{uri: formState.img}}
            style={{
              width: '100%',
              height: 300,
              marginTop: 20,
              objectFit: 'contain',
            }}
          />
        ) : (
          <Text
            style={{
              marginVertical: 50,
              fontSize: 20,
              color: '#333',
            }}>
            {JSON.stringify(formState, null, 3)}
          </Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  containerInput: {
    gap: 8,
    marginBottom: 20,
  },
  labelProduct: {
    fontSize: 22,
    color: '#333',
    fontWeight: 'bold',
  },
  inputProduct: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'rgba(0,0,0,0.4)',
    paddingHorizontal: 10,
    height: 45,
    fontSize: 18,
    color: '#333',
  },
  pickerCategoryContainer: {},
  pickerCategoryOption: {
    fontSize: 18,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#28425B',
    height: 52,
    width: 200,
    borderRadius: 50,
  },
  buttonText: {
    fontSize: 21,
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonContainerSecondary: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    flexDirection: 'row',
    gap: 50,
  },
  buttonStyleSecondary: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    width: 160,
    borderRadius: 50,
    borderColor: '#28425B',
    backgroundColor: 'rgba(40,66,91,0.15)',
    borderWidth: 2.5,
  },
  buttonTextSecondary: {
    fontSize: 19,
    color: '#28425B',
    fontWeight: 'bold',
  },
});
