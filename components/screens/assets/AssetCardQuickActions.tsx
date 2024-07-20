import { View } from "react-native";
import React from "react";
import CardButton from "@/components/shared/card/CardButton";

type AssetCardQuickActionsProps = {
  onEdit?: () => void;
  onDelete?: () => void;
};

const AssetCardQuickActions = (props: AssetCardQuickActionsProps) => {
  const { onEdit, onDelete } = props;
  return (
    <View className="flex-row flex-1 mr-2.5 self-end items-center justify-center">
      <CardButton
        icon="edit-3"
        iconVariant="feather"
        onPressed={() => {
          if (onEdit) onEdit();
        }}
      />
      <CardButton
        icon="delete-outline"
        iconVariant="material"
        onPressed={() => {
          if (onDelete) onDelete();
        }}
        className="ml-1.5"
      />
    </View>
  );
};

export default AssetCardQuickActions;
