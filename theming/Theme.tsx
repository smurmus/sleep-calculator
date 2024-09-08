import { Theme as DefaultThemeType, DefaultTheme } from "@react-navigation/native";

type Theme = DefaultThemeType & {
  colors: {
    lightTeal: string;
    darkTeal: string;
    teal: string;
    darkBlue: string;
    lightBlue: string;
    text: string;
    orange: string;
    lightGrey: string;
    red: string;
  },
}

export const COLORS = {
  lightTeal: 'rgb(107, 247, 232)',
  teal: 'rgb(129, 209, 223)',
  darkTeal: 'rgb(30, 88, 110)',
  darkBlue: 'rgb(2, 35, 69)',
  lightBlue: 'rgb(224, 239, 255)',
  text: 'rgb(22, 57, 87)',
  grey: 'rgb(129, 144, 161)',
  lightGrey: 'rgb(222, 228, 233)',
  orange: 'rgb(255, 143, 116)',
  red: 'rgb(217, 57, 0)',
}

const Theme: Theme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    ...COLORS,
  },
};

export default Theme;
