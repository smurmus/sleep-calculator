import { COLORS } from '@/theming/Theme';

export function useThemeColor(
  colorName: keyof typeof COLORS,
) {
  return COLORS[colorName];
}
