import { View, StyleSheet } from 'react-native';

import { Dropdown } from '@/components/Dropdown';

/** @param increment number in minutes */
const sleepHourOptions = (increment: number) => {
  let hours = [];
  for (let hour = 0; hour <= 24; hour++) {
    const totalHours = hour + (increment/60);
    // Items: 0-24 hours, in 30-minute increments
    hours.push({
      label: `${totalHours} hours`,
      value: totalHours,
    });
  };

  return hours;
};

const SleepDiary = () => {
  return (
    <View style={styles.container}>
      <Dropdown<number>
        label="Duration in Bed"
        options={sleepHourOptions(30)}
      />
    </View>
  );
};

export default SleepDiary;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
  },
});