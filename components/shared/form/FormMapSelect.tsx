import { useColorScheme, View, ViewProps } from "react-native";
import React from "react";
import { Controller } from "react-hook-form";
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { LocationDTO } from "@/storage/models/locations";
import { defaultMapCoordinates } from "../../screens/locations/LocationsMap";
import mapDark from "@/assets/styles/map-dark.json";
import mapLight from "@/assets/styles/map-light.json";

interface FormMapProps extends ViewProps {
  name: string;
  control: any;
  location?: LocationDTO;
  cityLabel: string;
  onPinChange: (coordinates: LatLng) => void;
}

const FormMapSelect = (props: FormMapProps) => {
  const { name, control, location, cityLabel, onPinChange, ...rest } = props;
  const scheme = useColorScheme();
  const initalRegion = {
    latitude: location?.latitude ?? defaultMapCoordinates.latitude,
    longitude: location?.longitude ?? defaultMapCoordinates.longitude,
    latitudeDelta: defaultMapCoordinates.latitudeDelta,
    longitudeDelta: defaultMapCoordinates.longitudeDelta,
  };

  return (
    <View
      className="mt-4 min-h-[320px] rounded-xl flex-1 overflow-hidden border-2 border-neutral-200 dark:border-neutral-800"
      {...rest}
    >
      <Controller
        control={control}
        name="coordinates"
        render={({ field: { value } }) => (
          <MapView
            className="flex-1 "
            provider={PROVIDER_GOOGLE}
            initialRegion={initalRegion}
            loadingEnabled
            onPress={(e) => onPinChange(e.nativeEvent.coordinate)}
            customMapStyle={scheme == "dark" ? mapDark : mapLight}
          >
            <Marker
              title={cityLabel}
              titleVisibility="visible"
              draggable
              coordinate={{ ...value }}
              onDragEnd={(e) => onPinChange(e.nativeEvent.coordinate)}
            />
          </MapView>
        )}
      />
    </View>
  );
};

export default FormMapSelect;
