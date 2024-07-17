import { View, Text } from "react-native";
import React from "react";
import { cn } from "@/utils/tw";
import { Icon, IconVariant } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { EmployeeDTO } from "@/storage/models/employees";

type EmployeeCardProps = {
  item: EmployeeDTO;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
};

const EmployeeCard = (props: EmployeeCardProps) => {
  const { item, onDelete, onEdit } = props;
  return (
    <View
      className={cn(
        "flex-1 mb-1.5 p-2 px-4 rounded-xl border-[1.5px] bg-primary-100/30 dark:bg-primary-900/20 flex-row",
        "border-neutral-400/30 dark:border-neutral-400/20"
      )}
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

      <View className="flex-row gap-0 self-center items-center justify-center">
        <Button
          variant="ghost"
          LeftAccessory={() => (
            <ActionIcon icon="edit-3" iconVariant="feather" />
          )}
          className="p-2 py-0.5 self-center"
          onPressed={() => onEdit(item.id)}
        />
        <Button
          variant="ghost"
          LeftAccessory={() => (
            <ActionIcon icon="delete-outline" iconVariant="material" />
          )}
          className="p-2 py-0.5 self-center"
          onPressed={() => onDelete(item.id)}
        />
      </View>
    </View>
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
