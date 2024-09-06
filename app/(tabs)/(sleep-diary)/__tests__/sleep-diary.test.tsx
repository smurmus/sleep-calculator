import { render, userEvent, waitFor } from '@testing-library/react-native';
import { renderRouter } from 'expo-router/testing-library';

import { submitSleepScore } from '@/api/actions';
import { FormProvider, useForm } from 'react-hook-form';

import SleepDiaryForm from '../sleep-diary-form';

jest.mock('@/api/actions');

const mockSubmitSleepScore = submitSleepScore as jest.Mock;


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
    jest.resetAllMocks();
  });

  describe('Sleep calculator', () => {
    it('Will not call submit when form is empty', async () => {
      const screen = renderRouter();

      await waitFor(() => userEvent.press(screen.getByTestId('sleep-diary-tab')));
      await waitFor(() => userEvent.press(screen.getByRole('button', { name: 'Calculate' })));
      expect(submitSleepScore).not.toHaveBeenCalled();
    });

    describe('With filled form', () => {
      it('Valid values calculates score correctly', async () => {
        mockSubmitSleepScore.mockImplementation(() => {
          return { state: 'success' }
        });

        const screen = setupTest({ timeAsleep: 4.5, timeInBed: 6 })
        const button = screen.getByRole('button', { name: 'Calculate' });

        await waitFor(() => {
          expect(button.props.accessibilityState.disabled).toBeFalsy();
          userEvent.press(button);
          jest.advanceTimersByTime(500);
        });
        await waitFor(() => expect(submitSleepScore).toHaveBeenCalledWith({ sleepScore: '75' }, 'res=200'));

        expect(screen.getByText('75')).toBeDefined();
      });

      it('Invalid values prevent submission', async () => {
        mockSubmitSleepScore.mockImplementation(() => {
          return { state: 'error' }
        });

        const screen = setupTest({ timeAsleep: 4.5, timeInBed: 2 });

        const button = screen.getByRole('button', { name: 'Calculate' });
        expect(button.props.accessibilityState.disabled).toBeTruthy();

        await waitFor(() => userEvent.press(button));
        await waitFor(() => expect(submitSleepScore).not.toHaveBeenCalled());
      });

      it('Displays error when error is returned', async () => {
        mockSubmitSleepScore.mockImplementation(() => {
          return { state: 'error' }
        });
        const screen = setupTest({ timeAsleep: 4.5, timeInBed: 6 });

        mockSubmitSleepScore({ sleepScore: 75 }, 'res=500');
        const button = screen.getByRole('button', { name: 'Calculate' });

        await waitFor(() => {
          expect(button.props.accessibilityState.disabled).toBeFalsy();
          userEvent.press(button);
          jest.advanceTimersByTime(500);
        })

        const errorMessage = 'Unable to calculate score. Please try again!';
        expect(screen.getByText(errorMessage)).toBeDefined();

        // timeout to stop showing message
        jest.advanceTimersByTime(3000);
        expect(screen.queryByText(errorMessage)).toBe(null);
      });
    });
  });
});
