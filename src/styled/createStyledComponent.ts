import {ComponentType} from 'react';
import styled from 'styled-components/native';
import {
  color,
  ColorProps,
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

export default function createStyledComponent<T>(Component: ComponentType<T>) {
  return styled(Component)<
    ColorProps &
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
    ${compose(color, space, layout, flexbox, background, border, position)};
  `;
}
