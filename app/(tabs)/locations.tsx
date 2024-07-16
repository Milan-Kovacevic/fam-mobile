import React, { useEffect } from "react";
import { SafeScreen } from "@/components/ui/Screen";
import { useSQLiteContext } from "expo-sqlite";
import { useColorScheme, View } from "react-native";
import {
  deleteLocation,
  getAllLocations,
  getLocationsByName,
} from "@/storage/repositories/locations-repository";
import SearchInput from "@/components/ui/SearchInput";
import { router } from "expo-router";
import LocationsList from "@/components/screens/locations/LocationsList";
import LocationsHeading from "@/components/screens/locations/LocationsHeading";
import { showToast } from "@/utils/toast";
import useSearchableList from "@/hooks/useSearchableList";
import FlatListSkeleton from "@/components/lists/FlatListSkeleton";

const LocationsScreen = () => {
  const db = useSQLiteContext();
  const scheme = useColorScheme();

  const {
    searchText,
    loading,
    refreshing,
    listData,
    onSearch,
    onSearchClear,
    onSearchTextChanged,
    onDeleteItem,
    onEditItem,
    onRefreshing,
  } = useSearchableList({
    fetchData: fetchLocations,
    searchData: searchLocations,
    onDelete: handleDeleteLocation,
    onEdit: handleEditLocation,
  });

  useEffect(() => {
    fetchLocations();
  }, []);

  async function fetchLocations() {
    const result = await getAllLocations(db);
    return result;
  }
  async function searchLocations(query: string) {
    const result = await getLocationsByName(db, query);
    return result;
  }

  function handleCreateLocation() {
    router.push("/create/location");
  }

  function handleEditLocation(id: number) {
    router.push({ pathname: `/edit/location`, params: { id: id } });
  }

  async function handleDeleteLocation(id: number) {
    var isSuccess = await deleteLocation(db, id);
    if (isSuccess) {
      showToast("Location removed successfully!", scheme);
    }
    return isSuccess;
  }

  return (
    <SafeScreen
      variant="fixed"
      className="h-full w-full"
      contentContainerClassName="flex-1"
    >
      <View className="px-3 pt-3.5 mb-1.5 mx-1 items-center">
        <LocationsHeading onCreateLocation={handleCreateLocation} />

        <View className="mb-1.5">
          <SearchInput
            className=""
            placeholder="Search..."
            text={searchText}
            onTextChange={onSearchTextChanged}
            onSearch={onSearch}
            onClear={onSearchClear}
          />
          <View className="flex-1 py-2 pb-0 mb-1 mt-3.5">
            {loading ? (
              <FlatListSkeleton />
            ) : (
              <LocationsList
                locations={listData}
                refreshing={refreshing}
                onRefreshing={onRefreshing}
                onDelete={onDeleteItem}
                onEdit={onEditItem}
              />
            )}
          </View>
        </View>
      </View>
    </SafeScreen>
  );
};

export default LocationsScreen;
