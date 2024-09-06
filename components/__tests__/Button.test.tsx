import { render, userEvent, waitFor } from '@testing-library/react-native';

import Button from '../Button';

const mockOnPress = jest.fn();

describe('<Button />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  })

  it('renders correct CTA', () => {
    const screen = render(
      <Button
        title="Submit"
        onPress={mockOnPress}
      />
    );

    expect(screen.getByRole('button', { name: 'Submit' })).toBeDefined();
  });

  it('disables button when loading', () => {
    const screen = render(
      <Button
        title="Submit"
        loading
        onPress={mockOnPress}
      />
    );

    const button = screen.getByRole('button', { name: 'Loading' });
    expect(button).toBeDefined();
    expect(button.props.accessibilityState.disabled).toBeTruthy();
  });

  it('calls onPress when pressed', async () => {
    mockOnPress.mockImplementation(() => console.log('Submit pressed!'))
    const logSpy = jest.spyOn(console, 'log');
  
    const screen = render(
      <Button
        title="Submit"
        onPress={mockOnPress}
      />
    );

    const button = screen.getByRole('button', { name: 'Submit' });
    expect(button).toBeDefined();
    await waitFor(() => userEvent.press(button));
    expect(logSpy).toHaveBeenCalledWith('Submit pressed!');
  });
});