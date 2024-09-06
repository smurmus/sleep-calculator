import React from 'react';
import { Stack } from 'expo-router';
import { ThemeProvider } from '@react-navigation/native';

import BigHealthTheme from '@/theming/BigHealthTheme';

export default function RootLayout() {
  return (
    <ThemeProvider value={BigHealthTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
