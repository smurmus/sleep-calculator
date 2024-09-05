import { Theme as DefaultThemeType, DefaultTheme } from "@react-navigation/native";

type Theme = DefaultThemeType & {
  colors: {
    lightTeal: string;
    darkTeal: string;
    teal: string;
    darkBlue: string;
    lightBlue: string;
    text: string;
  },
}

export const BIG_HEALTH_COLORS = {
  lightTeal: 'rgb(107, 247, 232)',
  teal: 'rgb(129, 209, 223)',
  darkTeal: 'rgb(30, 88, 110)',
  darkBlue: 'rgb(2, 35, 69)',
  lightBlue: 'rgb(224, 239, 255)',
  text: 'rgb(22, 57, 87)',
  lightGrey: 'rgb(129, 144, 161)',
}

const BigHealthTheme: Theme = {
  dark: false,
  colors: {
    ...DefaultTheme.colors,
    ...BIG_HEALTH_COLORS,
  },
};

export default BigHealthTheme;
