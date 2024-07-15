import React, { useEffect, useState } from "react";
import { SafeScreen, Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";
import { useSQLiteContext } from "expo-sqlite";
import { ActivityIndicator, ScrollView, TextInput, View } from "react-native";
import { LocationDTO } from "@/storage/models/locations";
import {
  deleteLocation,
  getAllLocations,
} from "@/storage/repositories/locations-repository";
import FormField from "@/components/ui/FormField";
import SearchInput from "@/components/ui/SearchInput";
import { palette } from "@/theme/colors";
import { Button } from "@/components/ui/Button";
import { Icon, IconVariant } from "@/components/ui/Icon";
import LocationCard from "@/components/LocationCard";
import { FAButton } from "@/components/ui/FAButton";
import { router } from "expo-router";

interface Todo {
  value: string;
  intValue: number;
}

const LocationsScreen = () => {
  const db = useSQLiteContext();
  const [locations, setLocations] = useState<LocationDTO[]>([]);

  useEffect(() => {
    async function setup() {
      const result = await getAllLocations(db);
      setLocations(result);
    }
    setup();
  }, []);

  function handleCreateLocation() {
    router.push("/create/location");
  }

  function handleEditLocation(id: number) {
    router.push("/edit/location");
  }

  async function handleDeleteLocation(id: number) {
    var isSuccess = await deleteLocation(db, id);
    if (isSuccess) setLocations([...locations.filter((x) => x.id != id)]);
  }

  return (
    <View className="flex-1">
      <FAButton
        icon="plus"
        variant="feather"
        onPressed={handleCreateLocation}
        iconClassName="text-2xl"
        className="right-4 bottom-4"
      />
      <SafeScreen
        variant="fixed"
        className="p-4 h-full w-full"
        contentContainerClassName="flex-1"
      >
        <View className="mb-6 mx-2 gap-0 mt-0 items-center">
          <LocationsHeading />
          <SearchInput
            className=""
            text={""}
            placeholder="Search..."
            handleSearch={(text) => console.log(text)}
          />
        </View>
        <ScrollView className="flex-1 mx-2 ml-0 space-y-1.5">
          {locations.map((location) => (
            <View key={location.id} className="flex-1">
              <LocationCard
                id={location.id}
                name={location.name}
                onDelete={handleDeleteLocation}
                onEdit={handleEditLocation}
              />
            </View>
          ))}
        </ScrollView>
      </SafeScreen>
    </View>
  );
};

export default LocationsScreen;

const LocationsHeading = () => {
  return (
    <View className="flex-row w-full items-center gap-0.5 justify-start mx-0.5 mb-2.5">
      <Icon
        icon="location-pin"
        variant="material"
        className="text-xl mb-0.5 mr-0"
      />
      <Text className="text-2xl font-psemibold tracking-tighter">
        Your Locations
      </Text>
    </View>
  );
};
