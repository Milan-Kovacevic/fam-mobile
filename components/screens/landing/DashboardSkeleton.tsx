import { View, Text } from "react-native";
import React from "react";
import Skeleton from "@/components/ui/Skeleton";

const DashboardSkeleton = () => {
  return (
    <View className="flex flex-row flex-wrap">
      {[1, 2, 3, 4].map((_, index) => (
        <View key={`item-${index}`} className="p-1.5 h-[178px] basis-1/2 ">
          <Skeleton className="flex-1" />
        </View>
      ))}
    </View>
  );
};

export default DashboardSkeleton;
