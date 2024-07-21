import { View, ViewProps } from "react-native";
import React from "react";
import { Icon } from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";

interface AssetsHeadingProps extends ViewProps {
  onCreateAsset: () => void;
}

const AssetsHeading = (props: AssetsHeadingProps) => {
  const { onCreateAsset, ...rest } = props;
  return (
    <View className="flex-row mb-3.5 mt-0 items-center" {...props}>
      <View className="flex-1 flex-row w-full items-center gap-0.5 ml-0.5 justify-start">
        <Icon
          icon="layers"
          variant="material"
          className="text-xl text-neutral-800 dark:text-neutral-200"
        />
        <Text className="text-2xl font-psemibold tracking-tighter pt-0.5">
          Your Assets
        </Text>
      </View>
      <View className="mr-0.5">
        <Button
          variant="ghost"
          LeftAccessory={() => (
            <Icon
              icon={"plus"}
              variant={"feather"}
              className="text-2xl text-neutral-800 dark:text-neutral-200"
            />
          )}
          className="p-2 py-0.5 self-center"
          onPressed={onCreateAsset}
        />
      </View>
    </View>
  );
};

export default AssetsHeading;
