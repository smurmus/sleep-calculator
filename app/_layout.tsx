import React from 'react';
import { Stack } from 'expo-router';
import { ThemeProvider } from '@react-navigation/native';
import {
  useFonts,
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold
} from '@expo-google-fonts/quicksand';

import BigHealthTheme from '@/theming/BigHealthTheme';

export default function RootLayout() {
  let [fontsLoaded] = useFonts({
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={BigHealthTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
