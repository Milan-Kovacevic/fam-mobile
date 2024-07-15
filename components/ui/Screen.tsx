import { palette } from "@/theme/colors";
import { cn } from "@/utils/tw";
import { useScrollToTop } from "@react-navigation/native";
import { StatusBar, StatusBarProps } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  LayoutChangeEvent,
  Platform,
  ScrollView,
  ScrollViewProps,
  StyleProp,
  useColorScheme,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface BaseScreenProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  className?: string;
  contentContainerClassName?: string;
}

interface FixedScreenProps extends BaseScreenProps {
  variant?: "fixed";
}
interface ScrollScreenProps extends BaseScreenProps {
  variant?: "scroll";
  ScrollViewProps?: ScrollViewProps;
}

interface AutoScreenProps extends Omit<ScrollScreenProps, "variant"> {
  variant?: "auto";
  /**
   * Threshold to trigger the automatic disabling/enabling of scroll ability.
   * Defaults to `{ percent: 0.92 }`.
   */
  scrollEnabledToggleThreshold?: { percent?: number; point?: number };
}

export type ScreenProps =
  | ScrollScreenProps
  | FixedScreenProps
  | AutoScreenProps;

const isIos = Platform.OS === "ios";

type ScreenVariant = "fixed" | "scroll" | "auto";

function isNonScrolling(variant?: ScreenVariant) {
  return !variant || variant === "fixed";
}

function useAutoPreset(props: AutoScreenProps): {
  scrollEnabled: boolean;
  onContentSizeChange: (w: number, h: number) => void;
  onLayout: (e: LayoutChangeEvent) => void;
} {
  const { variant, scrollEnabledToggleThreshold } = props;
  const { percent = 0.92, point = 0 } = scrollEnabledToggleThreshold || {};

  const scrollViewHeight = useRef<null | number>(null);
  const scrollViewContentHeight = useRef<null | number>(null);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  function updateScrollState() {
    if (
      scrollViewHeight.current === null ||
      scrollViewContentHeight.current === null
    )
      return;

    // check whether content fits the screen then toggle scroll state according to it
    const contentFitsScreen = (function () {
      if (point) {
        return (
          scrollViewContentHeight.current < scrollViewHeight.current - point
        );
      } else {
        return (
          scrollViewContentHeight.current < scrollViewHeight.current * percent
        );
      }
    })();

    // content is less than the size of the screen, so we can disable scrolling
    if (scrollEnabled && contentFitsScreen) setScrollEnabled(false);

    // content is greater than the size of the screen, so let's enable scrolling
    if (!scrollEnabled && !contentFitsScreen) setScrollEnabled(true);
  }

  function onContentSizeChange(w: number, h: number) {
    // update scroll-view content height
    scrollViewContentHeight.current = h;
    updateScrollState();
  }

  function onLayout(e: LayoutChangeEvent) {
    const { height } = e.nativeEvent.layout;
    // update scroll-view  height
    scrollViewHeight.current = height;
    updateScrollState();
  }

  // update scroll state on every render
  if (variant === "auto") updateScrollState();

  return {
    scrollEnabled: variant === "auto" ? scrollEnabled : true,
    onContentSizeChange,
    onLayout,
  };
}

function ScreenWithoutScrolling(props: ScreenProps) {
  const { style, contentContainerClassName, className, children } = props;
  return (
    <View className={cn($outerClassName, className)} style={[style]}>
      <View className={cn($innerClassName, contentContainerClassName)}>
        {children}
      </View>
    </View>
  );
}

function ScreenWithScrolling(props: ScreenProps) {
  const { children, className, ScrollViewProps, style } =
    props as ScrollScreenProps;

  const ref = useRef<ScrollView>(null);

  const { scrollEnabled, onContentSizeChange, onLayout } = useAutoPreset(
    props as AutoScreenProps
  );
  useScrollToTop(ref);

  return (
    <ScrollView
      {...{ scrollEnabled, ref }}
      {...ScrollViewProps}
      onLayout={(e) => {
        onLayout(e);
        ScrollViewProps?.onLayout?.(e);
      }}
      onContentSizeChange={(w: number, h: number) => {
        onContentSizeChange(w, h);
        ScrollViewProps?.onContentSizeChange?.(w, h);
      }}
      className={cn($outerClassName, props.contentContainerClassName)}
      style={[ScrollViewProps?.style, style]}
      contentContainerStyle={[ScrollViewProps?.contentContainerStyle]}
    >
      {children}
    </ScrollView>
  );
}

export function Screen(props: ScreenProps) {
  const colorScheme = useColorScheme();
  const statusBarStyle = colorScheme == "dark" ? "light" : "dark";

  return (
    <View
      className={cn(
        "bg-primary-50/70 dark:bg-primary-950/70",
        $containerClassName
      )}
    >
      <StatusBar style={statusBarStyle} />

      <KeyboardAvoidingView
        behavior={isIos ? "padding" : "height"}
        keyboardVerticalOffset={0}
        className={cn($keyboardAvoidingViewClassName)}
      >
        {isNonScrolling(props.variant) ? (
          <ScreenWithoutScrolling {...props} />
        ) : (
          <ScreenWithScrolling {...props} />
        )}
      </KeyboardAvoidingView>
    </View>
  );
}

export function SafeScreen(props: ScreenProps) {
  const colorScheme = useColorScheme();
  const statusBarStyle = colorScheme == "dark" ? "light" : "dark";

  return (
    <SafeAreaView
      className={cn(
        "bg-primary-50/70 dark:bg-primary-950/70",
        $containerClassName
      )}
    >
      <StatusBar style={statusBarStyle} />

      <KeyboardAvoidingView
        behavior={isIos ? "padding" : "height"}
        keyboardVerticalOffset={0}
        className={cn($keyboardAvoidingViewClassName)}
      >
        {isNonScrolling(props.variant) ? (
          <ScreenWithoutScrolling {...props} />
        ) : (
          <ScreenWithScrolling {...props} />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const $containerClassName = "flex-1 h-full w-full";
const $keyboardAvoidingViewClassName = "flex-1";
const $outerClassName = "flex-1 h-full w-full";
const $innerClassName = "flex-start items-stretch";
