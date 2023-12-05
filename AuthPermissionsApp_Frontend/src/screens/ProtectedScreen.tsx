import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const ProtectedScreen = () => {
  return (
    <View style={styles.container}>
      <Text>ProtectedScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
