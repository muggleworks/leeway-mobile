import LinearGradientOriginal from 'react-native-linear-gradient';
import {SafeAreaView as SafeAreaViewOriginal} from 'react-native-safe-area-context';

import createStyledComponent from './createStyledComponent';

export {default as View} from './View';
export {default as Text} from './Text';
export {default as TouchableHighlight} from './TouchableHighlight';
export {default as TouchableOpacity} from './TouchableOpacity';
export {default as TextInput} from './TextInput';

// Third party libraries
export const SafeAreaView = createStyledComponent(SafeAreaViewOriginal);
export const LinearGradient = createStyledComponent(LinearGradientOriginal);
