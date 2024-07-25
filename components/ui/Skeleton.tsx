import { View, Text, Animated, Easing, ViewProps } from "react-native";
import React, { useEffect, useRef } from "react";
import { cn } from "@/utils/tw";

interface SkeletonProps extends ViewProps {}

const Skeleton = (props: SkeletonProps) => {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const sharedAnimationConfig = {
      duration: 1000,
      useNativeDriver: true,
    };
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          ...sharedAnimationConfig,
          toValue: 1,
          easing: Easing.out(Easing.ease),
        }),
        Animated.timing(pulseAnim, {
          ...sharedAnimationConfig,
          toValue: 0,
          easing: Easing.in(Easing.ease),
        }),
      ])
    ).start();

    return () => {
      // cleanup
      pulseAnim.stopAnimation();
    };
  }, []);

  const opacityAnim = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.35, 0.5],
  });

  return (
    <View {...props}>
      <Animated.View
        style={[{ opacity: opacityAnim }]}
        className={cn(
          "rounded-xl bg-gray-300/80 dark:bg-gray-400/40 flex-1",
          props.className
        )}
      />
    </View>
  );
};

export default Skeleton;
