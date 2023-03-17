import {Platform} from 'react-native';
import styled from 'styled-components/native';
import {
  color,
  ColorProps,
  typography,
  TypographyProps,
  space,
  SpaceProps,
  layout,
  LayoutProps,
  flexbox,
  FlexboxProps,
  background,
  BackgroundProps,
  border,
  BorderProps,
  position,
  PositionProps,
  compose,
} from 'styled-system';

const TextInput = styled.TextInput<
  ColorProps &
    TypographyProps &
    SpaceProps &
    LayoutProps &
    FlexboxProps &
    BackgroundProps &
    BorderProps &
    PositionProps & {
      gap?: number;
      opacity?: number;
    }
>`
  ${compose(
    color,
    typography,
    space,
    layout,
    flexbox,
    background,
    border,
    position,
  )};
  font-family: ${props =>
    (props.fontWeight === 'bold' && 'Rubik-Bold') ||
    (props.fontWeight === '500' && 'Rubik-Medium') ||
    'Rubik-Regular'};
  ${Platform.OS === 'android' && 'font-weight: normal'};
`;

export default TextInput;
