import { View, Text } from "react-native";
import React from "react";
import { cn } from "@/utils/tw";
import { Icon, IconVariant } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { EmployeeDTO } from "@/storage/models/employees";
import CardContainer from "@/components/shared/card/CardContainer";
import CardButton from "@/components/shared/card/CardButton";

type EmployeeCardProps = {
  employee: EmployeeDTO;
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
  pressable?: boolean;
  readonly?: boolean;
  onPressed?: (id: number) => void;
};

const EmployeeCard = (props: EmployeeCardProps) => {
  const { employee, onDelete, onEdit, readonly, pressable, onPressed } = props;
  return (
    <CardContainer
      selectable={pressable ?? false}
      onPress={() => {
        if (onPressed) onPressed(employee.id);
      }}
    >
      <View className={cn("flex-row gap-1.5 items-center flex-1 h-10")}>
        <Icon
          icon="user"
          variant="feather"
          className="text-base dark:text-gray-400 text-gray-500/90 pt-0.5"
        />
        <Text className="flex-1 text-base font-pregular pt-1 text-gray-800 dark:text-gray-300">
          {employee.firstName} {employee.lastName}
        </Text>
      </View>
      {!readonly && (
        <View className="flex-row gap-0 self-center items-center justify-center">
          <CardButton
            icon="edit-3"
            iconVariant="feather"
            onPressed={() => {
              if (onEdit) onEdit(employee.id);
            }}
          />
          <CardButton
            icon="delete-outline"
            iconVariant="material"
            onPressed={() => {
              if (onDelete) onDelete(employee.id);
            }}
          />
        </View>
      )}
    </CardContainer>
  );
};

export default EmployeeCard;
