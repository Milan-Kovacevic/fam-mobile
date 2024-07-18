import { FlatList, RefreshControl, View } from "react-native";
import React from "react";
import { LocationDTO } from "@/storage/models/locations";
import LocationCard from "./LocationCard";
import EmptyListPlaceholder from "@/components/lists/EmptyListPlaceholder";
import FlatListSkeleton from "@/components/lists/FlatListSkeleton";

type LocationsListProps = {
  loading: boolean;
  locations: LocationDTO[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  refreshing: boolean;
  onRefreshing: () => void;
};

const LocationsList = (props: LocationsListProps) => {
  const { loading, locations, onEdit, onDelete, refreshing, onRefreshing } =
    props;
  return (
    <View className="flex-1">
      {loading ? (
        <FlatListSkeleton className="h-[70px]" />
      ) : (
        <FlatList
          className=""
          showsVerticalScrollIndicator={false}
          data={locations}
          keyExtractor={(item) => item.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefreshing} />
          }
          renderItem={({ item }) => {
            return (
              <LocationCard onDelete={onDelete} onEdit={onEdit} {...item} />
            );
          }}
          ListEmptyComponent={
            <EmptyListPlaceholder
              title={"No Locations Found"}
              description="Parhaps you should ajust your search critera or create a new location..."
            />
          }
        />
      )}
    </View>
  );
};

export default LocationsList;
