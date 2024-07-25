import { View, ViewProps } from "react-native";
import React from "react";
import Skeleton from "@/components/ui/Skeleton";

const FlatListSkeleton = (props: ViewProps) => {
  return (
    <View className="flex-1 w-full h-full">
      {Array.of(1, 2, 3, 4).map((item, index) => (
        <SkeletonItem key={`item-${index}`} {...props} />
      ))}
    </View>
  );
};

export default FlatListSkeleton;

const SkeletonItem = (props: ViewProps) => {
  return <Skeleton className="mb-2 h-12" {...props}></Skeleton>;
};
