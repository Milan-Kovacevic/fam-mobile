import { View } from "react-native";
import React from "react";
import { AssetListDTO } from "@/storage/models/asset-lists";
import { Text } from "@/components/ui/Text";
import { cn } from "@/utils/tw";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import CardButton from "@/components/shared/card/CardButton";
import AssetListCard from "./AssetListCard";
import { useTranslation } from "react-i18next";

type RegistrarItemHeaderProps = {
  assetList: AssetListDTO;
  onDelete: (id: number) => void;
};

const RegistrarItemHeader = (props: RegistrarItemHeaderProps) => {
  const { assetList, onDelete } = props;
  const { t } = useTranslation();

  return (
    <View
      className={cn(
        "p-2 mb-1.5 px-4 rounded-xl border-[1.5px] bg-neutral-50 dark:bg-neutral-950 flex-row",
        "border-neutral-400/30 dark:border-neutral-400/30"
      )}
    >
      <View className="flex-1 flex-col p-0.5 pr-0">
        <View className="flex-row gap-x-1">
          <Text variant="neutral" className="font-pmedium text-base">
            {assetList.items.length}
          </Text>
          <Text className="text-base font-pregular text-gray-800 dark:text-gray-300">
            {t("registrar.itemsLabel")}
          </Text>
        </View>

        <View className="flex-row gap-x-1 items-center">
          <Text className="text-xs text-gray-700 dark:text-gray-300/70">
            {t("registrar.createdLabel")}:
          </Text>
          <Text
            className="text-xs font-pregular text-gray-800/80 dark:text-gray-300/90"
            variant="neutral"
          >
            {new Date(parseInt(assetList.dateCreated)).toLocaleString()}
          </Text>
          <Icon
            icon="calendar"
            variant="feather"
            className="text-xs text-gray-500 dark:text-gray-400 pb-px"
          />
        </View>
      </View>
      <View className="self-center">
        <CardButton
          icon="delete"
          iconVariant="material"
          className="text-[22px]"
          onPressed={() => onDelete(assetList.id)}
        />
      </View>
    </View>
  );
};

type RegistrarItemContentProps = {
  assetList: AssetListDTO;
  onDeleteListItem: (listId: number, itemId: number) => void;
  onEditListItem: (itemId: number) => void;
  onAddListItem: (listId: number) => void;
};

const RegistrarItemContent = (props: RegistrarItemContentProps) => {
  const { assetList, onDeleteListItem, onEditListItem, onAddListItem } = props;
  const { t } = useTranslation();

  const dateUpdated = assetList.dateUpdated
    ? new Date(parseInt(assetList.dateUpdated))
    : undefined;

  return (
    <View className="mb-1.5 p-0.5 rounded-xl">
      <View className="flex-row justify-between items-center pl-2 pr-0">
        <View className="flex-row gap-x-1">
          <Icon
            icon="clock"
            variant="feather"
            className="text-xs text-gray-600 dark:text-gray-500 pt-px -mr-px"
          />
          <Text className="font-pregular text-xs text-gray-700/80 dark:text-gray-300/80">
            {t("registrar.updatedLabel")}:
          </Text>
          <Text className="text-xs font-pmedium text-neutral-700 dark:text-neutral-300">
            {dateUpdated?.toLocaleString() ?? t("registrar.neverLabel")}
          </Text>
        </View>
        <View className="mr-0.5">
          <Button
            variant="ghost"
            LeftAccessory={() => (
              <Icon
                icon={"plus"}
                variant={"feather"}
                className="text-xl text-gray-600 dark:text-gray-400"
              />
            )}
            className="p-2 py-0.5 self-center"
            onPressed={() => onAddListItem(assetList.id)}
          />
        </View>
      </View>
      <View className="">
        {assetList.items.length > 0 ? (
          assetList.items.map((item, index) => {
            return (
              <AssetListCard
                assetItem={item}
                key={`asset-${index}`}
                border={index < assetList.items.length - 1}
                onEdit={() => onEditListItem(item.id)}
                onDelete={() => onDeleteListItem(assetList.id, item.id)}
              />
            );
          })
        ) : (
          <View className="px-2">
            <Text variant="muted" className="font-pregular text-xs italic">
              {t("registrar.emptyListItems")}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export { RegistrarItemHeader, RegistrarItemContent };
