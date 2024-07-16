import { View } from "react-native";
import React from "react";

const FlatListSkeleton = () => {
  return (
    <View>
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </View>
  );
};

export default FlatListSkeleton;

const SkeletonItem = () => {
  return (
    <View className="rounded-xl mb-2 h-12 bg-primary-100/60 dark:bg-primary-900/50 animate-pulse"></View>
  );
};
