import { useColorScheme, View, ViewProps } from "react-native";
import React, { useRef } from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { LocationDTO } from "@/storage/models/locations";
import mapDark from "@/assets/styles/map-dark.json";
import mapLight from "@/assets/styles/map-light.json";
import { palette } from "@/theme/colors";

interface LocationsMapProps extends ViewProps {
  locations: LocationDTO[];
  loading: boolean;
}

const defaultMapCoordinates = {
  latitude: 44.7722,
  longitude: 17.191,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const LocationsMap = (props: LocationsMapProps) => {
  const { locations, loading } = props;
  const mapRef = useRef<MapView>(null);
  const scheme = useColorScheme();

  function handleMapLoaded() {
    mapRef.current?.fitToCoordinates(locations, {
      edgePadding: { top: 25, right: 25, bottom: 25, left: 25 },
      animated: true,
    });
  }

  return (
    <View className="flex-1 border-2 border-transparent overflow-hidden rounded-2xl bg-primary-100/60 dark:bg-primary-900/50">
      {loading ? (
        <View className="flex-1 bg-primary-100/60 dark:bg-primary-900/50 animate-pulse" />
      ) : (
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          onMapReady={handleMapLoaded}
          className="flex-1 "
          initialRegion={defaultMapCoordinates}
          loadingEnabled={true}
          loadingBackgroundColor={
            scheme == "dark" ? palette.primary950 : palette.primary50
          }
          customMapStyle={scheme == "dark" ? mapDark : mapLight}
        >
          {locations.map((item: any, index: number) => (
            <Marker
              key={`pin-${index}`}
              pinColor="tan"
              title={item.name}
              titleVisibility="visible"
              coordinate={{ ...item }}
            />
          ))}
        </MapView>
      )}
    </View>
  );
};

export default LocationsMap;
export { defaultMapCoordinates };
