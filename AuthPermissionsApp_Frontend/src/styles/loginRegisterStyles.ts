import {StyleSheet} from 'react-native';

export const loginRegisterStyles = StyleSheet.create({
  formContainer: {
    justifyContent: 'center',
    flex: 1,
    height: 600,
    zIndex: 9999,
  },
  title: {
    fontSize: 65,
    fontWeight: 'bold',
    marginVertical: 25,
    color: '#28425B',
    textAlign: 'center',
  },
  inputFormContainer: {},
  inputContainer: {},
  inputLabel: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  inputStyle: {
    height: 45,
    fontSize: 17,
    color: '#fff',
    fontWeight: 'bold',
  },
  inputBorderBottomIOS: {
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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
  buttonSecondaryStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#fff',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 2.5,
    height: 52,
    width: 200,
    borderRadius: 50,
  },
  buttonSecondaryText: {
    fontSize: 21,
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonNewAcountContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  buttonNewAcount: {},
  buttonNewAcountText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
});
