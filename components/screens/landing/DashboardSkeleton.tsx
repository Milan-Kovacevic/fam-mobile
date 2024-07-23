import { View, Text } from "react-native";
import React from "react";

const DashboardSkeleton = () => {
  return (
    <View className="flex flex-row flex-wrap">
      {[1, 2, 3, 4].map((item, index) => (
        <View key={`item-${index}`} className="p-1.5 h-[178px] basis-1/2 ">
          <View className="flex-1 rounded-xl bg-gray-300/30 dark:bg-gray-400/20 animate-pulse" />
        </View>
      ))}
    </View>
  );
};

export default DashboardSkeleton;
