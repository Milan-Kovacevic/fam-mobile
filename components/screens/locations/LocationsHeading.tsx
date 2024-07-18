import { View, ViewProps } from "react-native";
import React from "react";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Text } from "@/components/ui/Text";

interface LocationsHeadingProps extends ViewProps {
  onCreateLocation: () => void;
}

const LocationsHeading = (props: LocationsHeadingProps) => {
  const { onCreateLocation } = props;
  return (
    <View className="flex-row mx-0.5 mb-3.5 mt-0 items-center" {...props}>
      <View className="flex-1 flex-row w-full items-center gap-0.5 ml-0.5 justify-start">
        <Icon
          icon="location-pin"
          variant="material"
          className="text-xl mt-0.5 text-neutral-800 dark:text-neutral-200"
        />
        <Text className="text-2xl font-psemibold tracking-tighter pt-0.5">
          Your Locations
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
          onPressed={onCreateLocation}
        />
      </View>
    </View>
  );
};

export default LocationsHeading;
