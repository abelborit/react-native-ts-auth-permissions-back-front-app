import React from 'react';
import {StyleSheet, View, useWindowDimensions} from 'react-native';
import {globalTheme} from '../theme/globalTheme';

export const Background = () => {
  const dimensions = useWindowDimensions();

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: globalTheme.globalPrimaryColor,
        width: dimensions.width * 1.85,
        height: dimensions.height * 1.5,
        // transform: [
        //   {
        //     rotate: dimensions.height > dimensions.width ? '-75deg' : '0deg',
        //   },
        // ],
        top: dimensions.height > dimensions.width ? -185 : 0,
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
  },
});
