import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod';

import SleepDiaryForm, { sleepDiarySchema, SleepSchema } from './sleep-diary-form';

const SleepDiary = () => {
  const methods = useForm<SleepSchema>({
    defaultValues: {
      timeInBed: undefined,
      timeAsleep: undefined,
    },
    resolver: zodResolver(sleepDiarySchema),
    mode: 'onChange'
  });

  return (
    <View style={styles.container}>
      <FormProvider {...methods}>
        <SleepDiaryForm />
      </FormProvider>
    </View>
  );
};

export default SleepDiary;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    height: '100%',
    flex: 1,
  },
});