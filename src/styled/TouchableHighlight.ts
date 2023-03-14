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

const TouchableHighlight = styled.TouchableHighlight<
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

export default TouchableHighlight;
