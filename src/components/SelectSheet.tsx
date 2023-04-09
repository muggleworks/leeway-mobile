import {
  View,
  Text,
  TouchableHighlight,
  SafeAreaView,
  TouchableOpacity,
  AnimatedView,
} from 'react-native-styled';
import React, {
  forwardRef,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import BottomSheet, {
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import Button from './Button';
import {FadeIn, FadeOut} from 'react-native-reanimated';

type Props = {
  title: string;
  options: string[];
  onPress: (index: number) => void;
  selectedIndex?: number;
};

export type SelectSheetRef = {
  open: () => void;
  close: () => void;
};

const SelectSheet = forwardRef<SelectSheetRef, Props>(
  ({title, options, onPress, selectedIndex}, ref) => {
    const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);
    const [isOpen, setIsOpen] = useState(false);

    const bottomSheetRef = useRef<BottomSheet>(null);
    const {
      animatedHandleHeight,
      animatedSnapPoints,
      animatedContentHeight,
      handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

    useImperativeHandle(ref, () => ({
      open: () => {
        bottomSheetRef.current?.expand();
      },
      close: () => {
        bottomSheetRef.current?.close();
      },
    }));

    const onAnimate = (from: number, to: number) => {
      if (to === -1) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    const renderBackdrop = () => {
      if (!isOpen) {
        return null;
      }
      return (
        <AnimatedView
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(300)} // FIXME: Fade out animation not working. Issue: https://github.com/zympl/leeway-mobile/issues/113
          bg="#00000050"
          width="100%"
          height="100%"
          position="absolute"
          zIndex={0}>
          <TouchableOpacity
            flex={1}
            onPress={() => bottomSheetRef.current?.close()}
          />
        </AnimatedView>
      );
    };

    return (
      <BottomSheet
        onAnimate={onAnimate}
        index={-1}
        ref={bottomSheetRef}
        snapPoints={animatedSnapPoints}
        handleHeight={animatedHandleHeight}
        contentHeight={animatedContentHeight}
        enablePanDownToClose={true}
        backdropComponent={renderBackdrop}
        animateOnMount={true}>
        <BottomSheetView onLayout={handleContentLayout}>
          <SafeAreaView pt="4px" px="24px" pb="24px" edges={['bottom']}>
            <Text color="text" fontSize="h2" fontWeight="500" pb="20px">
              {title}
            </Text>
            <View gap={16}>
              {options.map((option, index) => (
                <TouchableHighlight key={index}>
                  <Button
                    active={index === selectedIndex}
                    size="large"
                    label={option}
                    onPress={() => onPress(index)}
                  />
                </TouchableHighlight>
              ))}
            </View>
          </SafeAreaView>
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

export default SelectSheet;
