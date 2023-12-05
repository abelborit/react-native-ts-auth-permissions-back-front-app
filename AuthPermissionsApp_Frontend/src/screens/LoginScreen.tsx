import React, {useRef} from 'react';
import {
  Keyboard,
  Platform,
  Text,
  TextInput,
  View,
  useWindowDimensions,
} from 'react-native';
import {Background} from '../components/Background';
import {LogoImage} from '../components/LogoImage';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {loginRegisterStyles} from '../styles/loginRegisterStyles';
import {globalTheme} from '../theme/globalTheme';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useForm} from '../hooks/useForm';
import {StackScreenProps} from '@react-navigation/stack';
import {RootStackParams} from '../navigators/StackNavigator';

interface LoginScreenProps
  extends StackScreenProps<RootStackParams, 'LoginScreen'> {}

export const LoginScreen = ({navigation}: LoginScreenProps) => {
  const insets = useSafeAreaInsets();
  const dimensions = useWindowDimensions();
  const {formState, handleChangeForm} = useForm({
    email: '',
    password: '',
  });
  const passwordInputRef = useRef<TextInput>();

  const handleLogin = () => {
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
              // onSubmitEditing={() => handleLogin()}
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
            style={{...loginRegisterStyles.buttonNewAcount}}
            activeOpacity={0.8}
            onPress={() => navigation.replace('RegisterScreen')} // para reemplazar la pantalla anterior y que se "destruya" entre comillas para no poder retroceder como lo haríamos habitualmente
          >
            <Text style={{...loginRegisterStyles.buttonNewAcountText}}>
              New Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
