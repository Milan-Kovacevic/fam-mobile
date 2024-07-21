import { ScrollViewProps, View, ViewProps, useColorScheme } from "react-native";
import React from "react";
import ActionSheet from "react-native-actions-sheet";
import { palette } from "@/theme/colors";

interface BaseActionSheetProps extends ViewProps {
  children?: React.ReactNode;
}

const BaseActionSheet = (props: BaseActionSheetProps) => {
  const { children, ...rest } = props;
  const scheme = useColorScheme();

  return (
    <ActionSheet
      gestureEnabled={true}
      animated={true}
      closeOnPressBack={true}
      defaultOverlayOpacity={0.5}
      indicatorStyle={{
        marginTop: 10,
        backgroundColor:
          scheme == "dark" ? palette.neutral700 : palette.neutral300,
      }}
      containerStyle={{
        backgroundColor:
          scheme == "dark" ? palette.neutral900 : palette.neutral50,
      }}
    >
      <View className="px-3.5 pt-2 mb-3" {...rest}>
        {children}
      </View>
    </ActionSheet>
  );
};

export default BaseActionSheet;
