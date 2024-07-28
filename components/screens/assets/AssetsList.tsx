import { View, RefreshControl, ViewProps, FlatList } from "react-native";
import React from "react";
import EmptyListPlaceholder from "@/components/shared/list/EmptyListPlaceholder";
import FlatListSkeleton from "@/components/shared/list/FlatListSkeleton";
import { AssetDTO } from "@/storage/models/assets";
import AssetCard from "./AssetCard";
import SwipeableFlatList from "react-native-swipeable-list";
import AssetCardQuickActions from "./AssetCardQuickActions";
import { useTranslation } from "react-i18next";

interface AssetsListProps extends ViewProps {
  assets: AssetDTO[];
  loading: boolean;
  refreshing?: boolean;
  onRefreshing?: () => void;
  onDelete?: (id: number) => void;
  onEdit?: (id: number) => void;
  onItemPressed?: (id: number) => void;
  readonly?: boolean;
  pressable?: boolean;
  scrollEnabled?: boolean;
}

const AssetsList = (props: AssetsListProps) => {
  const {
    assets,
    refreshing,
    loading,
    onRefreshing,
    onEdit,
    onDelete,
    readonly,
    pressable,
    onItemPressed,
    scrollEnabled,
    ...rest
  } = props;
  const scrollable = scrollEnabled ?? true;
  const { t } = useTranslation();

  const emptyListPlaceholder = () => {
    return readonly ? (
      <EmptyListPlaceholder
        title={t("assets.emptySheetTitle")}
        description={t("assets.emptySheetDescription")}
      />
    ) : (
      <EmptyListPlaceholder
        title={t("assets.emptyListTitle")}
        description={t("assets.emptyListDescription")}
      />
    );
  };

  return (
    <View className="flex-1 py-5 pb-0 mb-1" {...rest}>
      {loading ? (
        <FlatListSkeleton className="h-[90px]" />
      ) : readonly ? (
        <FlatList
          scrollEnabled={scrollable}
          showsVerticalScrollIndicator={false}
          data={assets}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            readonly ? undefined : (
              <RefreshControl
                refreshing={refreshing ?? false}
                onRefresh={onRefreshing}
              />
            )
          }
          renderItem={({ item }) => {
            return (
              <AssetCard
                key={item.id}
                asset={item}
                pressable={pressable}
                readonly={readonly}
                onPressed={onItemPressed}
              />
            );
          }}
          ListEmptyComponent={emptyListPlaceholder}
        />
      ) : (
        <SwipeableFlatList
          scrollEnabled={scrollable}
          showsVerticalScrollIndicator={false}
          data={assets}
          keyExtractor={(item: AssetDTO) => item.id.toString()}
          refreshControl={
            readonly ? undefined : (
              <RefreshControl
                refreshing={refreshing ?? false}
                onRefresh={onRefreshing}
              />
            )
          }
          renderItem={({ item }: { item: AssetDTO }) => {
            return (
              <AssetCard
                key={item.id}
                asset={item}
                pressable={pressable}
                readonly={readonly}
                onPressed={onItemPressed}
              />
            );
          }}
          renderQuickActions={({ item }: { item: AssetDTO }) => (
            <AssetCardQuickActions
              onEdit={() => {
                if (onEdit) onEdit(item.id);
              }}
              onDelete={() => {
                if (onDelete) onDelete(item.id);
              }}
            />
          )}
          maxSwipeDistance={100}
          shouldBounceOnMount={true}
          ListEmptyComponent={emptyListPlaceholder}
        />
      )}
    </View>
  );
};

export default AssetsList;
