import { View, Text } from "react-native";
import React from "react";
import { cn } from "@/utils/tw";
import { Icon, IconVariant } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { EmployeeDTO } from "@/storage/models/employees";
import CardContainer from "@/components/shared/card/CardContainer";

type EmployeeCardProps = {
  item: EmployeeDTO;
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
  pressable?: boolean;
  readonly?: boolean;
  onPressed?: (id: number) => void;
};

const EmployeeCard = (props: EmployeeCardProps) => {
  const { item, onDelete, onEdit, readonly, pressable, onPressed } = props;
  return (
    <CardContainer
      selectable={pressable ?? false}
      onPress={() => {
        if (onPressed) onPressed(item.id);
      }}
    >
      <View className={cn("flex-row gap-1.5 items-center flex-1 h-10")}>
        <Icon
          icon="user"
          variant="feather"
          className="text-base dark:text-gray-400 text-gray-500/90 pt-0.5"
        />
        <Text className="flex-1 text-base font-pregular pt-1 text-gray-800 dark:text-gray-300">
          {item.firstName} {item.lastName}
        </Text>
      </View>
      {!readonly && (
        <View className="flex-row gap-0 self-center items-center justify-center">
          <Button
            variant="ghost"
            LeftAccessory={() => (
              <ActionIcon icon="edit-3" iconVariant="feather" />
            )}
            className="p-2 py-0.5 self-center"
            onPressed={() => {
              if (onEdit) onEdit(item.id);
            }}
          />
          <Button
            variant="ghost"
            LeftAccessory={() => (
              <ActionIcon icon="delete-outline" iconVariant="material" />
            )}
            className="p-2 py-0.5 self-center"
            onPressed={() => {
              if (onDelete) onDelete(item.id);
            }}
          />
        </View>
      )}
    </CardContainer>
  );
};

export default EmployeeCard;

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
