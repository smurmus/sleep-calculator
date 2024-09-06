import { render, userEvent, waitFor } from '@testing-library/react-native';
import { renderRouter } from 'expo-router/testing-library';

import { submitSleepScore } from '@/api/actions';
import { FormProvider, useForm } from 'react-hook-form';

import SleepDiaryForm from '../sleep-diary-form';

jest.mock('@/api/actions', () => ({
  ...jest.requireActual('@/api/actions'),
  submitSleepScore: jest.fn(),
}));

type setupTestArgs = {
  timeAsleep?: number;
  timeInBed?: number;
}
const setupTest = (args: setupTestArgs) => {
  const TestForm = () => {
    const methods = useForm({
      defaultValues: { ...args }
    });
    return (
      <FormProvider {...methods}>
        <SleepDiaryForm />
      </FormProvider>
    );
  };

  return render(<TestForm />);
}

describe('<SleepDiary />', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Sleep calculator', () => {
    it('Will not call submit when form is empty', async () => {
      const screen = renderRouter();
    
      await waitFor(() => userEvent.press(screen.getByTestId('sleep-diary-tab')));

      await waitFor(() => userEvent.press(screen.getByRole('button', { name: 'Calculate' })));
      expect(submitSleepScore).not.toHaveBeenCalled();
    });

    describe('With filled form', () => {
      it('Valid values submits score', async () => {
        const screen = setupTest({ timeAsleep: 4.5, timeInBed: 6 })

        await waitFor(() => userEvent.press(screen.getByRole('button', { name: 'Calculate' })));
        await waitFor(() => expect(submitSleepScore).toHaveBeenCalled());
      });

      it('Invalid values prevent submission', async () => {
        setupTest({ timeAsleep: 4.5, timeInBed: 2 });
        
        await waitFor(() => expect(submitSleepScore).not.toHaveBeenCalled());
      });
    });
  });
});
