import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

interface LoaderComponentProps {
  text?: string;
  colorString?: string;
}

export const LoaderComponent = ({
  text = 'Loading...',
  colorString = '#333',
}: LoaderComponentProps) => {
  return (
    <View style={styles.indicatorContainer}>
      <ActivityIndicator size={60} color={colorString} />

      <Text style={{color: colorString}}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
});
