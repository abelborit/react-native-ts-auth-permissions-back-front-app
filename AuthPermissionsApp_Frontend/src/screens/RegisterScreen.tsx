import {StackScreenProps} from '@react-navigation/stack';
import React, {useRef} from 'react';
import {
  Keyboard,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import {RootStackParams} from '../navigators/StackNavigator';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useForm} from '../hooks/useForm';
import {Background} from '../components/Background';
import {LogoImage} from '../components/LogoImage';
import {loginRegisterStyles} from '../styles/loginRegisterStyles';
import {globalTheme} from '../theme/globalTheme';

interface RegisterScreenProps
  extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const RegisterScreen = ({navigation}: RegisterScreenProps) => {
  const insets = useSafeAreaInsets();
  const dimensions = useWindowDimensions();
  const {formState, handleChangeForm} = useForm({
    name: '',
    email: '',
    password: '',
  });
  const passwordInputRef = useRef<TextInput>();
  const emailInputRef = useRef<TextInput>();

  const handleRegister = () => {
    Keyboard.dismiss();
  };

  return (
    <>
      <Background />

      <LogoImage />

      <View
        style={{
          ...loginRegisterStyles.formContainer,
          top: insets.top + 20,
          bottom: insets.bottom + 20,
          padding: dimensions.height > dimensions.width ? 20 : 30,
          marginBottom: dimensions.height > dimensions.width ? 20 : 60,
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
              placeholderTextColor={'rgba(40, 66, 91, 0.6)'}
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
              placeholderTextColor={'rgba(40, 66, 91, 0.6)'}
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
              placeholderTextColor={'rgba(40, 66, 91, 0.6)'}
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
            marginTop: 30,
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
              color: '#333',
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
    </>
  );
};
