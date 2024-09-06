import { userEvent, waitFor } from '@testing-library/react-native';
import { renderRouter } from 'expo-router/testing-library';

describe('<RootLayout />', () => {
  it('Renders tabs successfully', async () => {
    const { root, getByTestId } = renderRouter();
    expect(root).toBeTruthy();

    await waitFor(() => {

      expect(getByTestId('home-tab'));
      expect(getByTestId('sleep-diary-tab'));
      expect(getByTestId('sleep-now-tab'));
    });
  });

  it('Navigates to Sleep Diary tab successfully', async () => {
    const { getByRole, getByTestId, getByText } = renderRouter();

    const diaryTab = getByTestId('sleep-diary-tab');
    userEvent.press(diaryTab);

    await waitFor(() => {
      expect(getByText('Duration asleep'));
      expect(getByText('Duration in bed'));
      expect(getByRole('button', { name: 'Calculate' }));
    })
  })
});
