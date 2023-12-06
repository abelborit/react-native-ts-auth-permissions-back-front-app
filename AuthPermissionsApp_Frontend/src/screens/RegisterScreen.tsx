import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect, useRef} from 'react';
import {
  Alert,
  Keyboard,
  // KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {RootStackParams} from '../navigators/StackNavigator';
import {useForm} from '../hooks/useForm';
import {Background} from '../components/Background';
// import {LogoImage} from '../components/LogoImage';
import {loginRegisterStyles} from '../styles/loginRegisterStyles';
import {globalTheme} from '../theme/globalTheme';
import {ImageBackground} from '../components/ImageBackground';
import {useAuthContext} from '../context/authContext/AuthContext';

interface RegisterScreenProps
  extends StackScreenProps<RootStackParams, 'RegisterScreen'> {}

export const RegisterScreen = ({navigation}: RegisterScreenProps) => {
  const dimensions = useWindowDimensions();
  const {formState, handleChangeForm} = useForm({
    name: '',
    email: '',
    password: '',
  });
  const passwordInputRef = useRef<TextInput>();
  const emailInputRef = useRef<TextInput>();
  const {singUp, errorMessage, removeError} = useAuthContext();

  const handleRegister = () => {
    Keyboard.dismiss();

    singUp({
      nombre: formState.name,
      correo: formState.email,
      password: formState.password,
    });
  };

  useEffect(() => {
    if (errorMessage.length === 0) return;

    Alert.alert(
      'Register failed ❌',
      'That user already exists or incorrect information...',
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
          <Text style={{...loginRegisterStyles.title}}>Register</Text>

          <View
            style={{
              ...loginRegisterStyles.inputFormContainer,
              flexDirection:
                dimensions.height > dimensions.width ? 'column' : 'row',
              gap: dimensions.height > dimensions.width ? 30 : 40,
            }}>
            <View
              style={{
                ...loginRegisterStyles.inputContainer,
                flex: dimensions.height > dimensions.width ? 0 : 1,
              }}>
              <Text style={{...loginRegisterStyles.inputLabel}}>Name:</Text>
              <TextInput
                style={[
                  Platform.OS === 'ios' &&
                    loginRegisterStyles.inputBorderBottomIOS,
                  loginRegisterStyles.inputStyle,
                ]}
                onChangeText={value => handleChangeForm(value, 'name')}
                value={formState.name}
                keyboardType="default"
                placeholder="Put here your name..."
                placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
                autoCorrect={false} // para evitar que me corrija las palabras que voy escribiendo
                autoCapitalize="words"
                underlineColorAndroid={'#fff'}
                selectionColor={globalTheme.globalSecondaryColor}
                onSubmitEditing={() => {
                  if (emailInputRef.current) {
                    emailInputRef.current.focus();
                  }
                }}
              />
            </View>

            <View
              style={{
                ...loginRegisterStyles.inputContainer,
                flex: dimensions.height > dimensions.width ? 0 : 1,
              }}>
              <Text style={{...loginRegisterStyles.inputLabel}}>Email:</Text>
              <TextInput
                ref={emailInputRef as any}
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
                onSubmitEditing={() => handleRegister()}
              />
            </View>
          </View>

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              gap: dimensions.height > dimensions.width ? 10 : 30,
              marginTop: dimensions.height > dimensions.width ? 30 : 40,
              flexDirection:
                dimensions.height > dimensions.width ? 'column' : 'row',
            }}>
            <View style={{...loginRegisterStyles.buttonContainer}}>
              <TouchableOpacity
                style={{...loginRegisterStyles.buttonStyle}}
                activeOpacity={0.8}
                onPress={() => handleRegister()}>
                <Text style={{...loginRegisterStyles.buttonText}}>
                  Create Account
                </Text>
              </TouchableOpacity>
            </View>

            <Text
              style={{
                alignSelf: 'center',
                marginVertical: 5,
                color: '#fff',
                fontSize: 20,
                // fontWeight: 'bold',
              }}>
              - or -
            </Text>

            <View style={{...loginRegisterStyles.buttonContainer}}>
              <TouchableOpacity
                style={{...loginRegisterStyles.buttonSecondaryStyle}}
                activeOpacity={0.8}
                onPress={() => navigation.replace('LoginScreen')} // para reemplazar la pantalla anterior y que se "destruya" entre comillas para no poder retroceder como lo haríamos habitualmente
              >
                <Text style={{...loginRegisterStyles.buttonSecondaryText}}>
                  Go to login
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Pressable>
      {/* </KeyboardAvoidingView> */}
    </>
  );
};
