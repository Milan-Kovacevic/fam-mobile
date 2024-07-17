import { View } from "react-native";
import React from "react";
import { Button } from "../../ui/Button";
import { Icon, IconVariant } from "../../ui/Icon";
import { cn } from "@/utils/tw";
import { Text } from "@/components/ui/Text";

type LocationCardProps = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};

const LocationCard = ({
  id,
  name,
  latitude,
  longitude,
  onEdit,
  onDelete,
}: LocationCardProps) => {
  return (
    <View
      className={cn(
        "flex-1 mb-1.5 p-2 px-4 rounded-xl border-[1.5px] bg-primary-100/30 dark:bg-primary-900/20 flex-row",
        "border-neutral-400/30 dark:border-neutral-400/20"
      )}
    >
      <View className="flex-1 items-center">
        <View className={cn("flex-row gap-1.5 items-center")}>
          <Icon
            icon="pushpino"
            variant="antdesign"
            className="text-base dark:text-gray-400 text-gray-500/90"
          />
          <Text className="flex-1 text-base font-pregular pt-1 text-gray-800 dark:text-gray-300">{`${name}`}</Text>
        </View>
        <View className="self-start flex-1">
          <Text className="ml-1 text-[11px]" variant="muted">
            {latitude.toFixed(8)}°{"  "}
            {longitude.toFixed(8)}°
          </Text>
        </View>
      </View>

      <View className="flex-row gap-0 self-center items-center justify-center">
        <Button
          variant="ghost"
          LeftAccessory={() => (
            <ActionIcon icon="edit-3" iconVariant="feather" />
          )}
          className="p-2 py-0.5 self-center"
          onPressed={() => onEdit(id)}
        />
        <Button
          variant="ghost"
          LeftAccessory={() => (
            <ActionIcon icon="delete-outline" iconVariant="material" />
          )}
          className="p-2 py-0.5 self-center"
          onPressed={() => onDelete(id)}
        />
      </View>
    </View>
  );
};

export default LocationCard;

const ActionIcon = ({
  icon,
  iconVariant,
}: {
  icon: string;
  iconVariant: IconVariant;
}) => {
  return (
    <Icon
      icon={icon}
      variant={iconVariant}
      className="text-xl text-neutral-700 dark:text-neutral-400"
    />
  );
};
