import { View, Text, FlatList, RefreshControl } from "react-native";
import React from "react";
import { LocationDTO } from "@/storage/models/locations";
import LocationCard from "./LocationCard";
import { Icon } from "@/components/ui/Icon";

type LocationsListProps = {
  locations: LocationDTO[];
  onEditLocation: (id: number) => void;
  onDeleteLocation: (id: number) => void;
  refreshing: boolean;
  onRefreshing: () => void;
};

const LocationsList = (props: LocationsListProps) => {
  const {
    locations,
    onEditLocation,
    onDeleteLocation,
    refreshing,
    onRefreshing,
  } = props;
  return (
    <FlatList
      className="px-4"
      data={locations}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefreshing} />
      }
      renderItem={({ item }) => {
        return (
          <LocationCard
            id={item.id}
            name={item.name}
            onDelete={onDeleteLocation}
            onEdit={onEditLocation}
          />
        );
      }}
      ListEmptyComponent={<EmptyLocations />}
    />
  );
};

export default LocationsList;

const EmptyLocations = () => {
  return (
    <View className="items-center justify-center flex-1 h-full pt-6">
      <Icon
        icon="frowno"
        variant="antdesign"
        className="text-5xl mb-0 text-secondary/80 dark:text-secondary-400/90"
      />
      <Text className="text-center mt-1 font-psemibold text-lg text-neutral-800 dark:text-neutral-200">
        No Locations Found
      </Text>
      <Text className="mx-3 -mt-0.5 text-center font-pregular text-xs text-neutral-500 dark:text-neutral-400">
        Parhaps you should ajust your search critera or create a new location...
      </Text>
    </View>
  );
};
