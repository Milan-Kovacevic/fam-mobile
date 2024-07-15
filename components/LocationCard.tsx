import { View, Text } from "react-native";
import React from "react";
import { Button } from "./ui/Button";
import { Icon, IconVariant } from "./ui/Icon";
import { router } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { deleteLocation } from "@/storage/repositories/locations-repository";

type LocationCardProps = {
  id: number;
  name: string;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};

const LocationCard = ({ id, name, onEdit, onDelete }: LocationCardProps) => {
  return (
    <View className="flex-1 p-3 px-4 rounded-xl border-[1.5px] border-primary-400/50 bg-primary-100/30 dark:bg-primary-900/20 dark:border-primary/50 flex-row">
      <Text className="flex-1 text-lg text-gray-800 dark:text-gray-300">{`${name}`}</Text>
      <View className="flex-row gap-0 self-center items-center justify-center">
        <Button
          variant="ghost"
          LeftAccessory={() => (
            <ActionIcon icon="edit" iconVariant="material" />
          )}
          className="p-2.5 py-0.5 self-center"
          onPressed={() => onEdit(id)}
        />
        <Button
          variant="ghost"
          LeftAccessory={() => (
            <ActionIcon icon="delete" iconVariant="material" />
          )}
          className="p-2.5 py-0.5 self-center"
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
      className="text-xl text-neutral-700 dark:text-neutral-400" //dark:text-gray-400 text-gray-500/90
    />
  );
};
