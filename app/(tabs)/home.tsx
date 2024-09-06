import React from 'react';
import { View, StyleSheet } from 'react-native';

import Text from '@/components/Text';

export default function Tab() {
  return (
    <View style={styles.container}>
      <Text type="lg">HOME SCREEN</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
