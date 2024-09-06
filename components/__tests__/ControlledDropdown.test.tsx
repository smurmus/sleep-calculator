import { render, waitFor } from '@testing-library/react-native';
import { FormProvider, useForm } from 'react-hook-form';

import { ControlledDropdown } from '../ControlledDropdown';

const TEST_OPTIONS = [
  { label: 'water', value: 'water', testID: 'water-option' },
  { label: 'earth', value: 'earth', testID: 'earth-option' },
  { label: 'fire', value: 'fire', testID: 'fire-option' },
  { label: 'air', value: 'air', testID: 'air-option' },
];

type TestWrapperProps = {
  children: React.ReactNode;
  args?: {},
};

const TestWrapper = ({ children, args }: TestWrapperProps) => {
  const methods = useForm({ ...args });

  return (
    <FormProvider {...methods}>
      {children}
    </FormProvider>
  )
};

describe('<ControlledDropdown />', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  })

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', async () => {
    const screen = render(
      <TestWrapper>
        <ControlledDropdown
          id="test-1"
          label="Test label"
          options={TEST_OPTIONS}
          name="test"
          placeholder="Select test item"
        />
      </TestWrapper>
    );

    await waitFor(() => {
      expect(screen.getByText('Test label')).toBeDefined();
      expect(screen.getByText('Select test item')).toBeDefined();
    })
  });

  it('renders initial values correctly', async () => {
    const screen = render(
      <TestWrapper>
        <ControlledDropdown
          id="test-2"
          label="Test label"
          options={TEST_OPTIONS}
          name="test"
          initialValue="earth"
        />
      </TestWrapper>
    );

    // only 'earth' should be visible in the dropdown
    await waitFor(() => {
      expect(screen.getByText('earth')).toBeDefined();
      expect(screen.queryByText('air')).toBeNull();
      expect(screen.queryByText('fire')).toBeNull();
      expect(screen.queryByText('water')).toBeNull();
    });
  });
});