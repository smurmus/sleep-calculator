import { BIG_HEALTH_COLORS } from '@/theming/BigHealthTheme';

export function useThemeColor(
  colorName: keyof typeof BIG_HEALTH_COLORS,
) {
  return BIG_HEALTH_COLORS[colorName];
}
