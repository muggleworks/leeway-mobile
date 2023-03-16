import {string | ColorValue} from 'react-native';
import {Theme} from 'styled-system';

declare module 'styled-components/native' {
  export interface DefaultTheme extends Theme {
    fontSizes: {
      xl: number;
      h1: number;
      h2: number;
      h3: number;
      p1: number;
      p2: number;
    };
    colors: {
      primary: string | ColorValue;
      secondary: string | ColorValue;
      white: string | ColorValue;
      text: string | ColorValue;
      textSecondary: string | ColorValue;
      bgActive: string | ColorValue;
      border: string | ColorValue;
      borderActive: string | ColorValue;
    };
    borderWidths: {
      normal: number;
    };
    radii: {
      s: number;
      m: number;
      l: number;
      xl: number;
    };
  }
}
