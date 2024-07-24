import { View } from "react-native";
import React from "react";
import { AssetListItemDTO } from "@/storage/models/asset-lists";
import { cn } from "@/utils/tw";
import { Icon } from "@/components/ui/Icon";
import { Text } from "@/components/ui/Text";
import CardButton from "@/components/shared/card/CardButton";

type AssetListCardProps = {
  assetItem: AssetListItemDTO;
  onDelete?: () => void;
  onEdit?: () => void;
  border?: boolean;
};

const AssetListCard = (props: AssetListCardProps) => {
  const { assetItem, onDelete, onEdit, border } = props;

  return (
    <View
      className={cn(
        "p-2 pt-1 flex-row ",
        border &&
          " border-b-[1.5px] border-neutral-400/30 dark:border-neutral-400/30"
      )}
    >
      <View className="flex-1">
        <Text className="text-sm font-psemibold text-gray-800 dark:text-gray-300">
          {assetItem.assetName}
        </Text>
        <View className="mt-0.5">
          <ListItemHistory
            previous={assetItem.previousLocationName}
            current={assetItem.currentLocationName}
          />
          <ListItemHistory
            previous={assetItem.previousEmployeeName}
            current={assetItem.currentEmployeeName}
          />
        </View>
      </View>

      <View className="flex-row self-center items-center justify-center">
        <CardButton
          icon="edit-3"
          iconVariant="feather"
          onPressed={() => {
            if (onEdit) onEdit();
          }}
          className="text-base"
        />
        <CardButton
          icon="delete-outline"
          iconVariant="material"
          onPressed={() => {
            if (onDelete) onDelete();
          }}
          className="text-base"
        />
      </View>
    </View>
  );
};

export default AssetListCard;

const ListItemHistory = ({
  previous,
  current,
}: {
  previous: string;
  current: string;
}) => {
  return (
    <View className="flex-row items-center self-start flex-1">
      <Text className="text-[11px] font-pregular leading-3 text-gray-700 dark:text-gray-300/70">
        {previous}
      </Text>
      <Icon
        icon="arrowright"
        variant="antdesign"
        className="text-gray-500 dark:text-gray-400 mx-1 self-center"
        size={10}
      />
      <Text className="text-[11px] font-pregular leading-3 text-gray-700 dark:text-gray-300/70">
        {current}
      </Text>
    </View>
  );
};
