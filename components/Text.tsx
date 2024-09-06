import {
  Text as NativeText,
  type TextProps as NativeTextProps,
  StyleSheet
} from 'react-native';
import React from 'react';

import { useThemeColor } from '@/hooks/useColor';
import { BIG_HEALTH_COLORS } from '@/theming/BigHealthTheme';

export type TextProps = NativeTextProps & {
  color?: keyof typeof BIG_HEALTH_COLORS;
  type?: keyof typeof styles;
}

const Text = ({ color = 'text', type = 'default', style, ...rest }: TextProps) => {
  const textColor = useThemeColor(color);

  return (
    <NativeText
      style={[
        { color: textColor },
        styles.base,
        styles[type],
        style,
      ]}
      {...rest}
    />
  );
};

export default Text;

const styles = StyleSheet.create({
  base: {
    fontFamily: 'Quicksand',
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  lg: {
    fontSize: 48,
    lineHeight: 56,
    fontWeight: 700,
  },
  md: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: 500,
  },
  sm: {
    fontSize: 14,
    lineHeight: 20,
  },
  xs: {
    fontSize: 12,
    lineHeight: 16,
  },
});