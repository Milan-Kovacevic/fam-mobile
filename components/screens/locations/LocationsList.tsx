import { FlatList, RefreshControl, View, ViewProps } from "react-native";
import React from "react";
import { LocationDTO } from "@/storage/models/locations";
import LocationCard from "./LocationCard";
import EmptyListPlaceholder from "@/components/shared/list/EmptyListPlaceholder";
import FlatListSkeleton from "@/components/shared/list/FlatListSkeleton";
import { useTranslation } from "react-i18next";

interface LocationsListProps extends ViewProps {
  loading: boolean;
  locations: LocationDTO[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  refreshing?: boolean;
  onRefreshing?: () => void;
  readonly?: boolean;
  pressable?: boolean;
  onItemPressed?: (id: number) => void;
  scrollEnabled?: boolean;
}

const LocationsList = (props: LocationsListProps) => {
  const {
    loading,
    locations,
    onEdit,
    onDelete,
    refreshing,
    onRefreshing,
    readonly,
    pressable,
    onItemPressed,
    scrollEnabled,
    ...rest
  } = props;
  const scrollable = scrollEnabled ?? true;
  const { t } = useTranslation();

  return (
    <View className="flex-1" {...rest}>
      {loading ? (
        <FlatListSkeleton className="h-[70px]" />
      ) : (
        <FlatList
          scrollEnabled={scrollable}
          showsVerticalScrollIndicator={false}
          data={locations}
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
              <LocationCard
                onDelete={onDelete}
                onEdit={onEdit}
                {...item}
                pressable={pressable}
                readonly={readonly}
                onPressed={onItemPressed}
              />
            );
          }}
          ListEmptyComponent={
            readonly ? (
              <EmptyListPlaceholder
                title={t("locations.emptyLocationsSheetTitle")}
                description={t("locations.emptyLocationsSheetDescription")}
              />
            ) : (
              <EmptyListPlaceholder
                title={t("locations.emptyLocationsListTitle")}
                description={t("locations.emptyLocationsListDescription")}
              />
            )
          }
        />
      )}
    </View>
  );
};

export default LocationsList;
