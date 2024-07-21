import { View, ViewProps } from "react-native";
import React from "react";
import { AssetDetailsDTO } from "@/storage/models/assets";
import { cn } from "@/utils/tw";
import Separator from "@/components/ui/Separator";
import AssetDetailsHeading from "./AssetDetailsHeading";
import { Text } from "@/components/ui/Text";
import { Icon } from "@/components/ui/Icon";

interface AssetDetailsInfoProps extends ViewProps {
  asset: AssetDetailsDTO;
}

const AssetDetailsInfo = (props: AssetDetailsInfoProps) => {
  const { asset } = props;
  return (
    <View className={cn("flex-1")}>
      <View className="">
        <AssetDetailsHeading
          icon="box"
          iconVariant="feather"
          text={asset.name}
          variant="title"
        />

        <View className="self-stretch mx-1 mt-3">
          <View className="flex-row gap-1 items-center self-start">
            <Icon
              icon="back-in-time"
              variant="entypo"
              className="text-lg text-gray-500 dark:text-gray-400"
            />
            <Text
              className="text-base font-pregular text-gray-700 dark:text-gray-300 pt-0.5"
              variant="neutral"
            >
              Mon 19th Nov 2024
            </Text>
          </View>

          <View className="mt-1.5 mb-1">
            {asset?.description ? (
              <Text className="text-sm font-pregular text-gray-500 dark:text-gray-400 leading-4">
                {asset.description}
              </Text>
            ) : (
              <Text variant="muted" className="text-sm font-pregular italic">
                No description...
              </Text>
            )}
          </View>
          <Text
            className="text-base font-psemibold self-start "
            variant="neutral"
          >
            {asset.price.toFixed(2)}$
          </Text>
        </View>
      </View>
      <Separator />
      <View className="mx-1">
        <AssetDetailsHeading
          icon="user"
          iconVariant="feather"
          text={" Employee in charge"}
          variant="subtitle"
        />
        <View className="self-start">
          <Text className="text-base font-pmedium pt-0.5 text-gray-800 dark:text-gray-200">
            {asset.employeeName}
          </Text>
        </View>
      </View>
      <Separator />
      <View className="mx-1">
        <AssetDetailsHeading
          icon="map-pin"
          iconVariant="feather"
          text={"Asset location"}
          variant="subtitle"
        />
        <View className="self-start mx-1">
          <Text className="text-base font-pmedium pt-0.5 text-gray-800 dark:text-gray-200">
            {asset.locationName}
          </Text>
          <View className="self-start">
            <Text className="text-xs" variant="muted">
              {asset.locationLatitude.toFixed(8)}°{"  "}
              {asset.locationLongitude.toFixed(8)}°
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AssetDetailsInfo;
