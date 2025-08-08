// 颜色定义
export interface ColorPalette {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface Colors {
  primary: ColorPalette;
  gray: ColorPalette;
  success: ColorPalette;
  warning: ColorPalette;
  error: ColorPalette;
  info: ColorPalette;
  white: string;
  black: string;
  transparent: string;
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    inverse: string;
  };
  border: {
    default: string;
    light: string;
    dark: string;
  };
}

// 排版定义
export interface Typography {
  fontFamily: {
    sans: string;
    mono: string;
  };
  fontSize: Record<string, string>;
  fontWeight: Record<string, number>;
  lineHeight: Record<string, number>;
  letterSpacing: Record<string, string>;
}

// 间距定义
export interface Spacing {
  [key: string]:
    | string
    | {
        [key: string]: string;
      };
}

// 主题定义
export interface Theme {
  name: string;
  id: string;
  colors: Colors;
  typography: Typography;
  spacing: Spacing;
  borderRadius: Record<string, string>;
  shadows: Record<string, string>;
  borders: {
    width: Record<string, string>;
    style: Record<string, string>;
  };
  transitions: {
    duration: Record<string, string>;
    timing: Record<string, string>;
  };
  zIndex: Record<string, number | string>;
}

// Token 类型
export type DesignToken = string | number | Record<string, any>;

// Token 集合
export interface DesignTokens {
  [category: string]: DesignToken;
}
