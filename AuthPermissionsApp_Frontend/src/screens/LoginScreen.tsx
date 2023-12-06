import React, {useEffect, useRef} from 'react';
import {
  Alert,
  Keyboard,
  // KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import {Background} from '../components/Background';
// import {LogoImage} from '../components/LogoImage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {loginRegisterStyles} from '../styles/loginRegisterStyles';
import {globalTheme} from '../theme/globalTheme';
import {useForm} from '../hooks/useForm';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigators/StackNavigator';
import {ImageBackground} from '../components/ImageBackground';
import {useAuthContext} from '../context/authContext/AuthContext';

interface LoginScreenProps
  extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({navigation}: LoginScreenProps) => {
  const dimensions = useWindowDimensions();
  const {formState, handleChangeForm} = useForm({
    email: '',
    password: '',
  });
  const passwordInputRef = useRef<TextInput>();
  const {singIn, errorMessage, removeError} = useAuthContext();

  const handleLogin = () => {
    Keyboard.dismiss();

    singIn({
      correo: formState.email,
      password: formState.password,
    });
  };

  useEffect(() => {
    if (errorMessage.length === 0) return;

    Alert.alert(
      'Login failed ❌',
      'Please, check your data again...',
      [
        {
          text: 'Ok',
          onPress: () => removeError(),
          style: 'default',
        },
      ],
      {
        /* para hacer click afuera de la alerta y salir de esa alerta y luego aparece otra alerta */
        cancelable: true,
        onDismiss: () => console.log('Dismiss Modal'),
      },
    );
  }, [errorMessage, removeError]);

  return (
    <>
      <Background />

      {/* <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}> */}
      {/* si hay problemas con el teclado del dispositivo porque al estar en un input entonces en iOS puede ser que el teclado tape los inputs o parte del formulario entonces se puede usar el KeyboardAvoidingView pero parece que el nativo tiene algunas animaciones que se ven medias raras al activar el teclado entonces también se puede usar react-native-keyboard-aware-scroll-view: https://github.com/APSL/react-native-keyboard-aware-scroll-view y envolver todo este componente */}

      {/* <LogoImage /> */}
      <ImageBackground />

      <Pressable
        onPress={() => Keyboard.dismiss()}
        style={{flex: 1}}
        android_disableSound={true}>
        <View
          style={{
            ...loginRegisterStyles.formContainer,
            padding: dimensions.height > dimensions.width ? 20 : 30,
            marginBottom: dimensions.height > dimensions.width ? 20 : 30,
          }}>
          <Text style={{...loginRegisterStyles.title}}>Login</Text>

          <View
            style={{
              ...loginRegisterStyles.inputFormContainer,
              flexDirection:
                dimensions.height > dimensions.width ? 'column' : 'row',
              gap: dimensions.height > dimensions.width ? 30 : 60,
            }}>
            <View
              style={{
                ...loginRegisterStyles.inputContainer,
                flex: dimensions.height > dimensions.width ? 0 : 1,
              }}>
              <Text style={{...loginRegisterStyles.inputLabel}}>Email:</Text>
              <TextInput
                style={[
                  Platform.OS === 'ios' &&
                    loginRegisterStyles.inputBorderBottomIOS,
                  loginRegisterStyles.inputStyle,
                ]}
                onChangeText={value => handleChangeForm(value, 'email')}
                value={formState.email}
                keyboardType="email-address"
                placeholder="Put here your email..."
                placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                autoCorrect={false} // para evitar que me corrija las palabras que voy escribiendo
                autoCapitalize="none"
                underlineColorAndroid={'#fff'}
                selectionColor={globalTheme.globalSecondaryColor}
                onSubmitEditing={() => {
                  if (passwordInputRef.current) {
                    passwordInputRef.current.focus();
                  }
                }}
              />
            </View>

            <View
              style={{
                ...loginRegisterStyles.inputContainer,
                flex: dimensions.height > dimensions.width ? 0 : 1,
              }}>
              <Text style={{...loginRegisterStyles.inputLabel}}>Password:</Text>
              <TextInput
                ref={passwordInputRef as any}
                style={[
                  Platform.OS === 'ios' &&
                    loginRegisterStyles.inputBorderBottomIOS,
                  loginRegisterStyles.inputStyle,
                ]}
                onChangeText={value => handleChangeForm(value, 'password')}
                value={formState.password}
                keyboardType="default"
                secureTextEntry={true}
                placeholder="Put here your password..."
                placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                autoCorrect={false} // para evitar que me corrija las palabras que voy escribiendo
                autoCapitalize="none"
                underlineColorAndroid={'#fff'}
                selectionColor={globalTheme.globalSecondaryColor}
                onSubmitEditing={() => handleLogin()}
              />
            </View>
          </View>

          <View style={{...loginRegisterStyles.buttonContainer, marginTop: 30}}>
            <TouchableOpacity
              style={{...loginRegisterStyles.buttonStyle}}
              activeOpacity={0.8}
              onPress={() => handleLogin()}>
              <Text style={{...loginRegisterStyles.buttonText}}>Login</Text>
            </TouchableOpacity>
          </View>

          <View style={{...loginRegisterStyles.buttonNewAcountContainer}}>
            <TouchableOpacity
              style={{
                ...loginRegisterStyles.buttonNewAcount,
                marginTop: dimensions.height > dimensions.width ? 35 : 5,
              }}
              activeOpacity={0.8}
              onPress={() => navigation.replace('RegisterScreen')} // para reemplazar la pantalla anterior y que se "destruya" entre comillas para no poder retroceder como lo haríamos habitualmente
            >
              <Text style={{...loginRegisterStyles.buttonNewAcountText}}>
                New Account
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
      {/* </KeyboardAvoidingView> */}
    </>
  );
};
