import {
  View,
  RefreshControl,
  ViewProps,
  TouchableOpacity,
} from "react-native";
import React from "react";
import EmptyListPlaceholder from "@/components/shared/list/EmptyListPlaceholder";
import FlatListSkeleton from "@/components/shared/list/FlatListSkeleton";
import { AssetDTO } from "@/storage/models/assets";
import AssetCard from "./AssetCard";
import SwipeableFlatList from "react-native-swipeable-list";
import CardButton from "@/components/shared/card/CardButton";
import { Text } from "@/components/ui/Text";
import AssetCardQuickActions from "./AssetCardQuickActions";

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

  return (
    <View className="flex-1 py-5 pb-0 mb-1" {...rest}>
      {loading ? (
        <FlatListSkeleton className="h-[90px]" />
      ) : (
        <SwipeableFlatList
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
          renderQuickActions={({ item }) => (
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
          ListEmptyComponent={
            readonly ? (
              <EmptyListPlaceholder
                title={"No Assets"}
                description="Add some assets to be able to select them..."
              />
            ) : (
              <EmptyListPlaceholder
                title={"No Assets Found"}
                description="Parhaps you should ajust your search critera or create a new asset..."
              />
            )
          }
        />
      )}
    </View>
  );
};

export default AssetsList;
