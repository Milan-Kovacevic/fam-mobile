import React, { useEffect } from "react";
import { $horizontalMarginClassName, SafeScreen } from "@/components/ui/Screen";
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
import HorizontalCarousel from "@/components/ui/HorizontalCarousel";
import LocationsMap from "@/components/screens/locations/LocationsMap";
import { useTranslation } from "react-i18next";

const LocationsScreen = () => {
  const { t } = useTranslation();
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
      showToast(t("locations.removeToastMessage"), scheme);
    }
    return isSuccess;
  }

  return (
    <SafeScreen
      variant="fixed"
      className="h-full w-full"
      contentContainerClassName="flex-1"
    >
      <View className="pt-3.5 mb-1.5 items-stretch flex-1">
        <LocationsHeading
          className={$horizontalMarginClassName}
          onCreateLocation={handleCreateLocation}
        />

        <View className="mb-0 flex-1">
          <View className={$horizontalMarginClassName}>
            <SearchInput
              placeholder={t("common.searchPlaceholder")}
              text={searchText}
              onTextChange={onSearchTextChanged}
              onSearch={onSearch}
              onClear={onSearchClear}
            />
          </View>

          <HorizontalCarousel
            items={[
              () => (
                <LocationsList
                  loading={loading}
                  locations={listData}
                  refreshing={refreshing}
                  onRefreshing={onRefreshing}
                  onDelete={onDeleteItem}
                  onEdit={onEditItem}
                />
              ),
              () => <LocationsMap locations={listData} loading={loading} />,
            ]}
          />
        </View>
      </View>
    </SafeScreen>
  );
};

export default LocationsScreen;
