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

const TouchableOpacity = styled.TouchableOpacity.attrs(props => ({
  activeOpacity: props.activeOpacity || 0.8,
}))<
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

export default TouchableOpacity;
