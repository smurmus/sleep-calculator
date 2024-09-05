import React from 'react';
import { Tabs } from 'expo-router';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { useThemeColor } from "@/hooks/useColor";

const BottomTabs = () => {
  const activeColor = useThemeColor('teal');
  const inactiveColor = useThemeColor('lightGrey');
  const background = useThemeColor('darkBlue');

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: activeColor,
        tabBarInactiveTintColor: inactiveColor,
        tabBarStyle: { backgroundColor: background }
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarTestID: 'home-tab',
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="home-filled"
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Sleep Diary',
          tabBarTestID: 'sleep-diary-tab',
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="access-time-filled"
              color={color}
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="sleep-now"
        options={{
          title: 'Sleep Now',
          tabBarTestID: 'sleep-now-tab',
          tabBarIcon: ({ color }) => (
            <MaterialIcons
              name="bedtime"
              color={color}
              size={24}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default BottomTabs;