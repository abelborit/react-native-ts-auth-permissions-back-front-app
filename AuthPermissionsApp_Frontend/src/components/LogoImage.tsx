import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

export const LogoImage = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/react-logo-white.png')}
        style={styles.imageStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.2,
    zIndex: 9999,
  },
  imageStyle: {
    width: 720,
    height: 700,
  },
});
