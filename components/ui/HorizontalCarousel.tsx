import {
  View,
  Dimensions,
  ViewProps,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
} from "react-native";
import React, {
  ComponentProps,
  ComponentType,
  createRef,
  useRef,
  useState,
} from "react";
import { cn } from "@/utils/tw";
import { $horizontalMarginClassName, $horizontalMarginOffset } from "./Screen";

const DEVICE_WIDTH = Dimensions.get("window").width;

interface CarouselItemProps extends ViewProps {}

interface HorizontalCarouselProps extends ViewProps {
  items: ComponentType<CarouselItemProps>[];
}

const HorizontalCarousel = (props: HorizontalCarouselProps) => {
  const { items } = props;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const CAROUSEL_WIDTH = DEVICE_WIDTH - $horizontalMarginOffset;

  function handleItemViewChanged(
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const imageIndex = Math.round(contentOffset / CAROUSEL_WIDTH);
    setSelectedIndex(imageIndex < 0 ? 0 : imageIndex);
  }

  return (
    <View className={cn("flex-1 mt-5", $horizontalMarginClassName)}>
      <ScrollView
        horizontal
        pagingEnabled
        snapToAlignment="start"
        decelerationRate={"normal"}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        onMomentumScrollEnd={handleItemViewChanged}
        className="pb-10"
      >
        {items.map((Item, index) => {
          return (
            <View key={`citem-${index}`} style={{ width: CAROUSEL_WIDTH }}>
              <Item key={`citem-${index}`} />
            </View>
          );
        })}
      </ScrollView>
      <View
        style={{ pointerEvents: "none" }}
        className="flex flex-row gap-1 absolute z-10 w-full justify-center bottom-3"
      >
        {items.map((item, index) => (
          <View
            key={`hover-${index}`}
            className={cn(
              "rounded-full h-2.5 w-2.5 bg-secondary-400/70 dark:bg-secondary/90 opacity-80",
              index == selectedIndex && "w-4 opacity-100"
            )}
          />
        ))}
      </View>
    </View>
  );
};

export default HorizontalCarousel;
