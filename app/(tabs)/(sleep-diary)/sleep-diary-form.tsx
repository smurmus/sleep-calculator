import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useFormContext } from 'react-hook-form'
import * as z from 'zod';

import { ControlledDropdown } from '@/components/ControlledDropdown';
import Button from '@/components/Button';
import Text from '@/components/Text';
import { BIG_HEALTH_COLORS } from '@/theming/BigHealthTheme';
import { submitSleepScore } from '@/api/actions';

/** @param increment number in minutes */
const sleepHourOptions = (increment: number) => {
  let hours = [];
  for (let hour = 0; hour <= 24; hour++) {
    const totalHours = hour + (increment / 60);
    // Items: 0-24 hours, in 30-minute increments
    hours.push(...[
      {
        label: `${hour} hours`,
        value: hour,
      },
      {
        label: `${totalHours} hours`,
        value: totalHours,
      },
    ]);
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
  .refine(schema => {
    return schema.timeInBed >= schema.timeAsleep;
  }, { message: 'Duration asleep cannot be longer than duration in bed.', path: ['timeAsleep'] });

export type SleepSchema = z.infer<typeof sleepDiarySchema>;

const SleepDiaryForm = () => {
  const { formState, watch } = useFormContext<SleepSchema>();
  const [sleepScore, setSleepScore] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { timeAsleep, timeInBed } = watch();

  const onSubmit = async (data: SleepSchema) => {
    console.log('Submitted', data);
    const { timeAsleep, timeInBed } = data;

    if (formState.isValid) {
      const score = (100 * (timeAsleep / timeInBed)).toFixed();
      // try to "save" the score first
      try {

        const result = await submitSleepScore({ sleepScore: score }, 'res=500');
        
        // if it was successful, then set the score text
        if (result === 200) {
          setSleepScore(score);
        }
      } catch (e) {
        // otherwise, show an error of some kind
        // @TODO: display error
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <ControlledDropdown<number>
          id="timeInBed"
          label="Duration in bed"
          options={sleepHourOptions(30)}
          name="timeInBed"
          elevation={20}
          initialValue={timeInBed}
        />
        <ControlledDropdown<number>
          id="timeAsleep"
          label="Duration asleep"
          options={sleepHourOptions(30)}
          name="timeAsleep"
          initialValue={timeAsleep}
        />
        <Button
          loading={loading}
          disabled={formState.isLoading || !formState.isValid}
          title="Calculate"
          onPress={() => {
            setLoading(true);
            onSubmit({ timeAsleep, timeInBed });
          }}
        />
      </View>
      <View style={styles.score}>
        <Text type="md" style={{ paddingBottom: 16 }}>Sleep score:</Text>
        <Text type="lg">{sleepScore ? sleepScore : '-'}</Text>
      </View>
    </View>
  );
};

export default SleepDiaryForm;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    height: '100%',
    flex: 1,
    zIndex: -1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  formContainer: {
    gap: 24,
  },
  score: {
    borderRadius: 24,
    height: 200,
    width: 200,
    padding: 12,
    backgroundColor: BIG_HEALTH_COLORS['lightBlue'],
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
});
