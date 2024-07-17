import { View, ViewProps } from "react-native";
import React from "react";

const FlatListSkeleton = (props: ViewProps) => {
  return (
    <View className="flex-1 w-full">
      {Array.of(1, 2, 3, 4).map((item, index) => (
        <SkeletonItem key={`item-${index}`} {...props} />
      ))}
    </View>
  );
};

export default FlatListSkeleton;

const SkeletonItem = (props: ViewProps) => {
  return (
    <View
      className="rounded-xl mb-2 h-12 bg-primary-100/60 dark:bg-primary-900/50 animate-pulse"
      {...props}
    ></View>
  );
};
