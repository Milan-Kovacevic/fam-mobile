import { useColorScheme, View } from "react-native";
import React, { useState } from "react";
import { FormField } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import { LocationDTO } from "@/storage/models/locations";
import MapView, { ClickEvent, LatLng, Marker } from "react-native-maps";
import mapDark from "@/assets/styles/map-dark.json";
import mapLight from "@/assets/styles/map-light.json";
import { defaultMapCoordinates } from "./LocationsMap";

export type LocationForm = {
  name: string;
  latitude: number;
  longitude: number;
};

type ManageLocationFormProps = {
  onSubmit: (fromData: LocationForm) => void;
  location?: LocationDTO;
  loading: boolean;
};

const ManageLocationForm = (props: ManageLocationFormProps) => {
  const { onSubmit, loading, location } = props;
  const scheme = useColorScheme();

  const [locationForm, setLocationForm] = useState<LocationForm>({
    name: location?.name ?? "",
    latitude: location?.latitude ?? defaultMapCoordinates.latitude,
    longitude: location?.longitude ?? defaultMapCoordinates.longitude,
  });

  const [errors, setErrors] = useState<{ name?: string }>({
    name: undefined,
  });

  function handleChangeLocationName(text: string) {
    setLocationForm({ ...locationForm, name: text });
  }

  function handleLocationSubmitted() {
    setErrors({ name: undefined });
    if (locationForm.name.trim() == "") {
      setErrors((prev) => ({ ...prev, name: "Name cannot be empty" }));
      return;
    }

    onSubmit({ ...locationForm });
  }

  const initalRegion = {
    latitude: location?.latitude ?? defaultMapCoordinates.latitude,
    longitude: location?.longitude ?? defaultMapCoordinates.longitude,
    latitudeDelta: defaultMapCoordinates.latitudeDelta,
    longitudeDelta: defaultMapCoordinates.longitudeDelta,
  };

  function handleChangeLocationPin(locationPin: LatLng) {
    setLocationForm({
      ...locationForm,
      latitude: locationPin.latitude,
      longitude: locationPin.longitude,
    });
  }

  function handleMapPressed(event: ClickEvent) {
    handleChangeLocationPin(event.nativeEvent.coordinate);
  }

  return (
    <View>
      <FormField
        title={"City name"}
        text={locationForm.name}
        handleChangeText={handleChangeLocationName}
        handleSubmitted={handleLocationSubmitted}
        placeholder="ex. Banja Luka"
        returnKeyType="done"
        error={errors.name}
      />
      <View className="mt-4 min-h-[320px] rounded-xl flex-1 overflow-hidden border-2 border-neutral-200 dark:border-neutral-800">
        <MapView
          className="flex-1 "
          initialRegion={initalRegion}
          loadingEnabled
          onPress={handleMapPressed}
          customMapStyle={scheme == "dark" ? mapDark : mapLight}
        >
          <Marker
            title={
              locationForm.name == "" ? "Enter location" : locationForm.name
            }
            titleVisibility="visible"
            draggable
            coordinate={{ ...locationForm }}
            onDragEnd={(e) => handleChangeLocationPin(e.nativeEvent.coordinate)}
          />
        </MapView>
      </View>

      <Button
        variant="primary"
        text="Submit"
        onPressed={handleLocationSubmitted}
        className="mt-6"
        loading={loading}
      />
    </View>
  );
};

export default ManageLocationForm;
