import { View } from "react-native";
import React, { ComponentProps } from "react";
import { FlatList } from "react-native-gesture-handler";
import { Text } from "./Text";
import { cn } from "@/utils/tw";

type SwipeableListProps = {
  items: ComponentProps<any>[];
};

const SwipeableList = (props: SwipeableListProps) => {
  const { items } = props;
  return (
    <View className="flex-1 items-center w-full ">
      <View className="gap-2 m-0 items-center justify-center flex-1 w-full">
        <FlatList
          className="w-full flex-1"
          data={items}
          horizontal
          renderItem={({ item }) => item}
        />
        <View className="flex flex-row h-10 gap-1 w-full justify-center">
          {Array.of(1, 2, 3).map((item, index) => (
            <View
              key={`hover-${index}`}
              className={cn(
                "rounded-full h-2.5 w-2.5 bg-primary-400/70 dark:bg-primary/80",
                index == 0 && "w-4 bg-primary-400/90 dark:bg-primary"
              )}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

export default SwipeableList;
