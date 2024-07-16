import React, { useEffect, useState } from "react";
import { SafeScreen } from "@/components/ui/Screen";
import { useSQLiteContext } from "expo-sqlite";
import { useColorScheme, View } from "react-native";
import { LocationDTO } from "@/storage/models/locations";
import {
  deleteLocation,
  getAllLocations,
  getLocationsByName,
} from "@/storage/repositories/locations-repository";
import SearchInput from "@/components/ui/SearchInput";
import { router } from "expo-router";
import LocationsList from "@/components/screens/locations/LocationsList";
import LocationsHeading from "@/components/screens/locations/LocationsHeading";
import LocationsSkeleton from "@/components/screens/locations/LocationsSkeleton";
import { delay } from "@/utils/util";
import { showToast } from "@/utils/toast";

const LocationsScreen = () => {
  const db = useSQLiteContext();
  const [locations, setLocations] = useState<LocationDTO[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const scheme = useColorScheme();

  useEffect(() => {
    fetchLocations();
  }, []);

  async function fetchLocations() {
    setLoading(true);
    await delay(300);
    const result = await getAllLocations(db);
    setLocations(result);
    setLoading(false);
  }
  async function searchLocations(query: string) {
    setLoading(true);
    await delay(300);
    const result = await getLocationsByName(db, query);
    setLocations(result);
    setLoading(false);
  }

  async function handleSearchClear() {
    setSearchText("");
    await fetchLocations();
  }

  async function handleTextChanged(text: string) {
    setSearchText(text);
    if (text == "") await fetchLocations();
  }
  async function handleSearchLocations() {
    await searchLocations(searchText);
  }

  async function onRefreshing() {
    setRefreshing(true);
    await fetchLocations();
    setRefreshing(false);
    setSearchText("");
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
      setLocations([...locations.filter((x) => x.id != id)]);
      showToast("Location removed successfully!", scheme);
    }
  }

  return (
    <SafeScreen
      variant="fixed"
      className="h-full w-full"
      contentContainerClassName="flex-1"
    >
      <View className="px-3 pt-3.5 mb-1.5 mx-1 items-center">
        <LocationsHeading onCreateLocation={handleCreateLocation} />
        <SearchInput
          className=""
          placeholder="Search..."
          text={searchText}
          onTextChange={handleTextChanged}
          onSearch={handleSearchLocations}
          onClear={handleSearchClear}
        />
      </View>
      <View className="flex-1 py-2 pb-0 mb-1 mt-2">
        {loading ? (
          <LocationsSkeleton />
        ) : (
          <LocationsList
            refreshing={refreshing}
            onRefreshing={onRefreshing}
            onEditLocation={handleEditLocation}
            onDeleteLocation={handleDeleteLocation}
            locations={locations}
          />
        )}
      </View>
    </SafeScreen>
  );
};

export default LocationsScreen;
