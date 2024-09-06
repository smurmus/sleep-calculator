import React from 'react';
import { TouchableOpacity, ButtonProps as NativeButtonProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useColor';
import { BIG_HEALTH_COLORS } from '@/theming/BigHealthTheme';

import Text from './Text';

type ButtonProps = NativeButtonProps & {
  color?: keyof typeof BIG_HEALTH_COLORS;
  loading: boolean;
};

const Button = ({
  title,
  onPress,
  color = 'orange',
  disabled,
  loading = false,
  ...otherProps
}: ButtonProps) => {
  const bgcolor = useThemeColor(color);

  return (
    <TouchableOpacity
      role="button"
      disabled={disabled}
      accessibilityRole="button"
      onPress={onPress}
      accessibilityLabel={`${title} Button`}
      style={[
        { backgroundColor: bgcolor },
        styles.base,
        (disabled || loading) ? styles.disabled : {},
      ]}
      {...otherProps}
    >
      <Text type="md" color={(disabled || loading) ? 'grey' : 'text'}>
        {loading ? 'Loading' : title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  base: {
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  disabled: {
    backgroundColor: BIG_HEALTH_COLORS['lightGrey'],
    pointerEvents: 'none',
  }
});