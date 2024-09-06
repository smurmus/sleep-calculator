import { View, StyleSheet } from 'react-native';
import { useFormContext } from 'react-hook-form'
import * as z from 'zod';

import { ControlledDropdown } from '@/components/ControlledDropdown';
import Button from '@/components/Button';

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

export type SleepDiaryFormValues = {
  timeInBed: number,
  timeAsleep: number,
};

export const sleepDiarySchema = z.object({
  timeInBed: z.number().positive(),
  timeAsleep: z.number().positive(),
})

export type SleepSchema = z.infer<typeof sleepDiarySchema>;

const SleepDiaryForm = () => {
  const { getValues, formState, watch } = useFormContext<SleepSchema>();

  const onSubmit = (data: SleepSchema) => {
    // @TODO: "save" 
    console.log('Submitted', data, formState);
  };

  return (
    <View style={styles.container}>
      <ControlledDropdown<number>
        id="timeInBed"
        label="Duration in bed"
        options={sleepHourOptions(30)}
        name="timeInBed"
        rules={{ required: true }}
        elevation={20}
      />
      <ControlledDropdown<number>
        id="timeAsleep"
        label="Duration asleep"
        options={sleepHourOptions(30)}
        name="timeAsleep"
        rules={{ required: true }}
      />
      <Button
        disabled={formState.isLoading || !formState.isValid}
        title="Calculate"
        onPress={() => onSubmit(getValues())}
      />
    </View>
  );
};

export default SleepDiaryForm;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    height: '100%',
    flex: 1,
    zIndex: -1,
  },
});