import React from 'react';
import {Image, StyleSheet, View, useWindowDimensions} from 'react-native';

export const ImageBackground = () => {
  const dimensions = useWindowDimensions();

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/peak_background.png')}
        style={{
          ...styles.imageStyle,
          width: dimensions.width,
          height: dimensions.height,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.5,
  },
  imageStyle: {},
});
