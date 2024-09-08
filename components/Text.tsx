import {
  Text as NativeText,
  type TextProps as NativeTextProps,
  StyleSheet
} from 'react-native';
import React from 'react';

import { useThemeColor } from '@/hooks/useColor';
import { COLORS } from '@/theming/Theme';

export type TextProps = NativeTextProps & {
  color?: keyof typeof COLORS;
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
    fontFamily: 'Quicksand_500Medium',
  },
  default: {
    fontSize: 16,
    lineHeight: 24,
  },
  lg: {
    fontSize: 48,
    lineHeight: 56,
    fontWeight: 700,
    fontFamily: 'Quicksand_600SemiBold',
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