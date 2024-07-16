import { FlatList, RefreshControl } from "react-native";
import React from "react";
import { LocationDTO } from "@/storage/models/locations";
import LocationCard from "./LocationCard";
import EmptyListPlaceholder from "@/components/lists/EmptyListPlaceholder";

type LocationsListProps = {
  locations: LocationDTO[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  refreshing: boolean;
  onRefreshing: () => void;
};

const LocationsList = (props: LocationsListProps) => {
  const { locations, onEdit, onDelete, refreshing, onRefreshing } = props;
  return (
    <FlatList
      className=""
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
            onDelete={onDelete}
            onEdit={onEdit}
          />
        );
      }}
      ListEmptyComponent={
        <EmptyListPlaceholder
          title={"No Locations Found"}
          description="Parhaps you should ajust your search critera or create a new location..."
        />
      }
    />
  );
};

export default LocationsList;
