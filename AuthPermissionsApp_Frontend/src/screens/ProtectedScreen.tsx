import React from 'react';
import {StyleSheet, Text, View, useWindowDimensions} from 'react-native';
import {useAuthContext} from '../context/authContext/AuthContext';
import {TouchableOpacity} from 'react-native-gesture-handler';

export const ProtectedScreen = () => {
  const dimensions = useWindowDimensions();
  const {user, token, logOut} = useAuthContext();

  return (
    <View
      style={{
        ...styles.container,
        gap: dimensions.height > dimensions.width ? 30 : 5,
      }}>
      <View
        style={{
          flexDirection:
            dimensions.height > dimensions.width ? 'column' : 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            ...styles.titleScreen,
            width: dimensions.height > dimensions.width ? 'auto' : '50%',
          }}>
          This is a Protected Screen when user is login or is a new register
        </Text>
        <Text
          style={{
            ...styles.title,
            width: dimensions.height > dimensions.width ? 'auto' : '50%',
          }}>
          User Info
        </Text>
      </View>

      <View
        style={{
          flexDirection:
            dimensions.height > dimensions.width ? 'column' : 'row',
          gap: dimensions.height > dimensions.width ? 40 : 100,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View>
          <Text style={styles.userInfo}>{JSON.stringify(user, null, 3)}</Text>

          <Text style={styles.userInfo}>
            Token: {JSON.stringify(token, null, 3)}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => logOut()}
          style={styles.btnLogout}>
          <Text style={styles.btnLogoutText}>LogOut</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  titleScreen: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 70,
    fontWeight: 'bold',
    color: '#28425B',
  },
  userInfo: {
    fontSize: 22,
    color: '#555',
  },
  btnLogout: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#28425B',
    height: 52,
    width: 200,
    borderRadius: 50,
  },
  btnLogoutText: {
    fontSize: 21,
    color: '#fff',
    fontWeight: 'bold',
  },
});
