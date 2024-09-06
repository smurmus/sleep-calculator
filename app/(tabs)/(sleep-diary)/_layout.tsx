import { View, StyleSheet } from 'react-native';
import { useForm, FormProvider } from 'react-hook-form'

import { ControlledDropdown } from '@/components/ControlledDropdown';

/** @param increment number in minutes */
const sleepHourOptions = (increment: number) => {
  let hours = [];
  for (let hour = 0; hour <= 24; hour++) {
    const totalHours = hour + (increment / 60);
    // Items: 0-24 hours, in 30-minute increments
    hours.push({
      label: `${totalHours} hours`,
      value: totalHours,
    });
  };

  return hours;
};

const SleepDiary = () => {
  const methods = useForm({
    defaultValues: {
      timeInBed: undefined,
      timeAsleep: undefined,
    },
    // @TODO: add resolver
  });

  // @TODO: type correctly + pass into handleSubmit
  // const onSubmit = (data: any) => console.log(data);

  return (
    <View style={styles.container}>
      <FormProvider {...methods}>
        <ControlledDropdown<number>
          id="timeInBed"
          label="Duration in Bed"
          options={sleepHourOptions(30)}
          name="timeInBed"
          rules={{ required: true }}
        />
      </FormProvider>
    </View>
  );
};

export default SleepDiary;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});