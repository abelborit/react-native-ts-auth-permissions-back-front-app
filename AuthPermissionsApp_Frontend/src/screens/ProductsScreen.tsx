import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useProductsContext} from '../context/productContext/ProductsContext';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RootStackParams} from '../navigators/StackNavigatorProducts';
import {StackScreenProps} from '@react-navigation/stack';
import {globalTheme} from '../theme/globalTheme';
import {useAuthContext} from '../context/authContext/AuthContext';

const FICTITIOUS_PRODUCTS = [
  {
    precio: 0,
    _id: '457832685asd',
    nombre: 'PS5 Control',
    categoria: {
      _id: 'asd483673546',
      nombre: 'CONTROLES',
    },
    usuario: {
      id: '87898asdasda',
      nombre: 'Nombre 1',
    },
    img: 'https://sm.ign.com/ign_nl/news/t/the-first-/the-first-ever-third-party-ps5-controller-has-been-announced_kcbg.jpg',
  },
  {
    precio: 0,
    _id: '486354dasdsd',
    nombre: 'ACER',
    categoria: {
      _id: 'a853759ASES58',
      nombre: 'PANTALLAS',
    },
    usuario: {
      id: '87898asdasda',
      nombre: 'Nombre 1',
    },
    img: '',
  },
  {
    precio: 0,
    _id: '875293450gsd',
    nombre: 'LOGITECH',
    categoria: {
      _id: 'yeogmuvmr825',
      nombre: 'TECLADOS',
    },
    usuario: {
      id: '87898asdasda',
      nombre: 'Nombre 1',
    },
    img: '',
  },
];

interface ProductsScreenProps
  extends StackScreenProps<RootStackParams, 'ProductsScreen'> {}

export const ProductsScreen = ({navigation}: ProductsScreenProps) => {
  const dimensions = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const {products, loadProducts} = useProductsContext();
  const {user, logOut} = useAuthContext();
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.8}
          style={{marginRight: 15}}
          onPress={() => navigation.navigate('ProductScreen', {})}>
          <Text
            style={{fontSize: 16, color: globalTheme.globalPrimaryColorDark}}>
            Add Product
          </Text>
        </TouchableOpacity>
      ),
      headerTitleAlign: 'center',
      headerTintColor: globalTheme.globalSecondaryColorLight,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadProductsFromBackend = useCallback(async () => {
    setIsRefreshing(true);

    try {
      /* cargar los productos del backend cuando se haga el pull to refresh */
      await loadProducts();
    } catch (error) {
      console.log('error loadProducsFromBackend', error);
    } finally {
      setIsRefreshing(false);
      console.log('finish refresh');
    }
  }, [loadProducts]);

  return (
    <View
      style={{
        ...styles.container,
        top: insets.top,
      }}>
      <View style={styles.flatListContainer}>
        {/* <Text>ProductsScreen</Text> */}

        <Text style={{fontSize: 16}}>
          <Text style={{fontWeight: 'bold'}}>User: </Text>
          {user?.nombre} ({user?.rol})
        </Text>

        <Text style={{fontSize: 16}}>
          <Text style={{fontWeight: 'bold'}}>Email: </Text> {user?.correo}
        </Text>
        <View
          style={{
            marginBottom: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16}}>
            <Text style={{fontWeight: 'bold'}}>Products: </Text>{' '}
            {FICTITIOUS_PRODUCTS.length}
          </Text>

          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => logOut()}
            style={styles.btnLogout}>
            <View>
              <Text style={styles.btnLogoutTxt}>LogOut</Text>
            </View>
          </TouchableOpacity>
        </View>

        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => loadProductsFromBackend()}
              progressBackgroundColor={'#fff'} // Android
              colors={['red', 'blue', 'green', 'purple', 'orange']} // Android
              progressViewOffset={50} // Android e iOS
              style={{backgroundColor: 'red'}} // iOS
              tintColor={globalTheme.globalPrimaryColor} // iOS
              title="Loading..." // iOS
              titleColor={globalTheme.globalPrimaryColor} // iOS
            />
          }
          keyboardDismissMode="on-drag" // al hacer scroll se oculte el teclado
          // data={products}
          data={FICTITIOUS_PRODUCTS}
          key={dimensions.height > dimensions.width ? '_' : '#'} // para evitar errores con el numColumns
          keyExtractor={item => item._id} // para evitar errores con el numColumns
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('ProductScreen', {
                  id: item._id,
                  name: item.nombre,
                  category: item.categoria._id, // eliminar cuando funcione la API
                  img: item.img, // eliminar cuando funcione la API
                })
              }>
              <View style={{flexDirection: 'row', paddingHorizontal: 10}}>
                <Text style={styles.productName}>⚡ {item.nombre}</Text>
                <View style={{flex: 1}} />
                <Text style={styles.productName}>➡️</Text>
              </View>
            </TouchableOpacity>
          )} // se desestructura así porque item es de tipo SimplePokemonInterface y ahí viene de forma directa no como un objeto con sus llaves:valor
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 20,
  },
  flatListContainer: {
    // justifyContent: 'center',
    // alignItems: 'center',
    flex: 1,
  },
  productName: {
    fontSize: 20,
    color: '#333',
  },
  itemSeparator: {
    borderBottomWidth: 2,
    marginVertical: 5,
    borderBottomColor: 'rgba(100, 100, 100, 0.5)',
  },
  btnLogout: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#d00',
    borderWidth: 1,
    height: 30,
    width: 90,
    borderRadius: 8,
  },
  btnLogoutTxt: {
    fontSize: 15,
    color: '#d00',
  },
});
