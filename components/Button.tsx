import React from 'react';
import { TouchableOpacity, Button as NativeButton, ButtonProps as NativeButtonProps, StyleSheet } from 'react-native';

import { useThemeColor } from '@/hooks/useColor';
import { BIG_HEALTH_COLORS } from '@/theming/BigHealthTheme';

import Text from './Text';

type ButtonProps = NativeButtonProps & {
  color?: keyof typeof BIG_HEALTH_COLORS;
};

const Button = ({
  title,
  onPress,
  color = 'orange',
  disabled,
  ...otherProps
}: ButtonProps) => {
  const bgcolor = useThemeColor(color);

  return (
    <TouchableOpacity
      onPress={onPress}
      accessibilityLabel={`${title} Button`}
      style={[
        { backgroundColor: bgcolor },
        styles.base,
        disabled ? styles.disabled : {},
      ]}
      {...otherProps}
    >
      <Text type="md" color={disabled ? 'grey' : 'text'}>
        {title}
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