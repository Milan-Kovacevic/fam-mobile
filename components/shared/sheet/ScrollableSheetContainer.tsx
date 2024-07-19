import { View, Text, ScrollViewProps, Dimensions } from "react-native";
import React, { ReactNode } from "react";
import { ScrollView } from "react-native-actions-sheet";

interface ScrollableSheetProps extends ScrollViewProps {
  children: ReactNode;
}

const SCREEN_HEIGHT = Dimensions.get("window").height;

const ScrollableSheetContainer = (props: ScrollableSheetProps) => {
  const { children, ...rest } = props;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      className="pb-2"
      style={{
        height: SCREEN_HEIGHT / 2.25,
      }}
      {...rest}
    >
      {children}
    </ScrollView>
  );
};

export default ScrollableSheetContainer;
