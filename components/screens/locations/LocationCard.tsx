import { TouchableOpacity, View } from "react-native";
import React, { ReactNode } from "react";
import { Button } from "../../ui/Button";
import { Icon, IconVariant } from "../../ui/Icon";
import { cn } from "@/utils/tw";
import { Text } from "@/components/ui/Text";
import CardContainer from "@/components/shared/card/CardContainer";
import CardButton from "@/components/shared/card/CardButton";

type LocationCardProps = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
  pressable?: boolean;
  readonly?: boolean;
  onPressed?: (id: number) => void;
};

const LocationCard = ({
  id,
  name,
  latitude,
  longitude,
  onEdit,
  onDelete,
  pressable,
  readonly,
  onPressed,
}: LocationCardProps) => {
  return (
    <CardContainer
      selectable={pressable ?? false}
      onPress={() => {
        if (onPressed) onPressed(id);
      }}
    >
      <View className="flex-1 items-center">
        <View className={cn("flex-row gap-1.5 items-center")}>
          <Icon
            icon="pushpino"
            variant="antdesign"
            className="text-base dark:text-gray-400 text-gray-500/90"
          />
          <Text className="flex-1 text-base font-pregular pt-0.5 text-gray-800 dark:text-gray-300">{`${name}`}</Text>
        </View>
        <View className="self-start flex-1">
          <Text className="ml-1 text-[11px]" variant="muted">
            {latitude.toFixed(8)}°{"  "}
            {longitude.toFixed(8)}°
          </Text>
        </View>
      </View>

      {!readonly && (
        <View className="flex-row gap-0 self-center items-center justify-center">
          <CardButton
            icon="edit-3"
            iconVariant="feather"
            onPressed={() => {
              if (onEdit) onEdit(id);
            }}
          />
          <CardButton
            icon="delete-outline"
            iconVariant="material"
            onPressed={() => {
              if (onDelete) onDelete(id);
            }}
          />
        </View>
      )}
    </CardContainer>
  );
};

export default LocationCard;
