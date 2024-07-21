import { useColorScheme, View, ViewProps } from "react-native";
import React, { useRef } from "react";
import AssetDetailsHeading from "./AssetDetailsHeading";
import { Text } from "@/components/ui/Text";
import { AssetDetailsDTO } from "@/storage/models/assets";
import { defaultMapCoordinates } from "../locations/LocationsMap";
import MapView, {
  Marker,
  MarkerPressEvent,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import { palette } from "@/theme/colors";
import mapDark from "@/assets/styles/map-dark.json";
import mapLight from "@/assets/styles/map-light.json";

interface AssetDetailsLocationMapProps extends ViewProps {
  asset: AssetDetailsDTO;
  onPinPressed: () => void;
}

const AssetDetailsLocationMap = (props: AssetDetailsLocationMapProps) => {
  const { asset, onPinPressed } = props;
  const scheme = useColorScheme();
  const mapRef = useRef<MapView>(null);

  function handleMapLoaded() {
    mapRef.current?.fitToSuppliedMarkers(["location"], {
      edgePadding: { top: 25, right: 25, bottom: 25, left: 25 },
      animated: true,
    });
  }

  const mapCoordinates = {
    latitude: asset.locationLatitude || defaultMapCoordinates.latitude,
    longitude: asset.locationLongitude || defaultMapCoordinates.longitude,
    latitudeDelta: defaultMapCoordinates.latitudeDelta,
    longitudeDelta: defaultMapCoordinates.longitudeDelta,
  };

  function handleMapPinPressed(event: MarkerPressEvent) {
    event.preventDefault();
    onPinPressed();
  }

  return (
    <View className="flex-1 border-2 border-transparent overflow-hidden rounded-2xl bg-primary-100/60 dark:bg-primary-900/50">
      <MapView
        ref={mapRef}
        provider={PROVIDER_GOOGLE}
        onMapReady={handleMapLoaded}
        className="flex-1"
        initialRegion={mapCoordinates}
        loadingEnabled={true}
        loadingBackgroundColor={
          scheme == "dark" ? palette.primary950 : palette.primary50
        }
        customMapStyle={scheme == "dark" ? mapDark : mapLight}
      >
        <Marker
          pinColor="tan"
          title={asset.locationName}
          titleVisibility="visible"
          coordinate={{
            latitude: asset.locationLatitude,
            longitude: asset.locationLongitude,
          }}
          identifier="location"
          id="location"
          onPress={handleMapPinPressed}
        />
      </MapView>
    </View>
  );
};

export default AssetDetailsLocationMap;
