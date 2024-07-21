import { TouchableOpacity, View } from "react-native";
import React, { ReactNode } from "react";
import { Button } from "../../ui/Button";
import { Icon, IconVariant } from "../../ui/Icon";
import { cn } from "@/utils/tw";
import { Text } from "@/components/ui/Text";
import CardContainer from "@/components/shared/card/CardContainer";
import { AssetDTO } from "@/storage/models/assets";
import CardButton from "@/components/shared/card/CardButton";

type AssetCardProps = {
  asset: AssetDTO;
  onPressed?: (id: number) => void;
  pressable?: boolean;
  readonly?: boolean;
};

const AssetCard = (props: AssetCardProps) => {
  const { asset, onPressed, pressable, readonly } = props;
  return (
    <CardContainer
      selectable={pressable ?? false}
      onPress={() => {
        if (onPressed) onPressed(asset.id);
      }}
    >
      <View className="flex-1 items-center">
        <View className={cn("flex-row gap-1 items-center self-start")}>
          <Icon
            icon="qr-code"
            variant="material"
            className="text-sm text-gray-500 dark:text-gray-400"
          />
          <Text className="text-xs font-pmedium" variant="neutral">
            {asset.barcode}
          </Text>
        </View>
        <View className="self-start flex-1 mt-0.5">
          <Text className="flex-1 text-base font-pregular leading-4 pt-1 text-gray-800 dark:text-gray-200">
            {asset.name}
          </Text>
          {asset.description ? (
            <Text className="flex-1 text-[11px] font-pregular text-gray-500 dark:text-gray-400 line-clamp-1 text-clip leading-4 h-5">
              {asset.description?.substring(0, 25)}
              {asset.description?.length > 25 && "..."}
            </Text>
          ) : (
            <Text
              variant="muted"
              className="flex-1 text-[11px] font-pregular italic"
            >
              No description...
            </Text>
          )}
        </View>
      </View>
      <View className="flex-row gap-0 items-stretch justify-center my-0.5">
        <Text
          className="ml-1 text-sm font-psemibold self-start text-neutral-800 dark:text-neutral-200"
          variant="neutral"
        >
          {asset.price.toFixed(2)}$
        </Text>
      </View>
    </CardContainer>
  );
};

export default AssetCard;
