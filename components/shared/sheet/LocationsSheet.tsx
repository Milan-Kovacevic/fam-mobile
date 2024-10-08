import React from "react";
import { SheetProps } from "react-native-actions-sheet";
import BaseActionSheet from "./BaseActionSheet";
import LocationsList from "@/components/screens/locations/LocationsList";
import { getAllLocations } from "@/storage/repositories/locations-repository";
import { useSQLiteContext } from "expo-sqlite";
import { LocationDTO } from "@/storage/models/locations";
import useReadonlyList from "@/hooks/useReadonlyList";
import { Text } from "@/components/ui/Text";
import ScrollableSheetContainer from "./ScrollableSheetContainer";
import { useTranslation } from "react-i18next";

const LocationsSheet = (props: SheetProps<"locations-sheet">) => {
  const { t } = useTranslation();
  const { payload } = props;
  const db = useSQLiteContext();
  const { loading, listData: locations } = useReadonlyList<LocationDTO>({
    fetchData: fetchLocations,
  });

  async function fetchLocations() {
    const result = await getAllLocations(db);
    return result;
  }

  function handleLocationSelected(id: number) {
    var location = locations.find((x) => x.id == id);
    payload?.onLocationSelected(location);
  }

  return (
    <BaseActionSheet>
      <Text variant="neutral" className="mx-2 mb-2 text-base text-center">
        {t("sheets.locationsTitle")}
      </Text>
      <ScrollableSheetContainer>
        <LocationsList
          className="mt-1 pt-0 flex-1"
          readonly={true}
          pressable={true}
          locations={locations}
          loading={loading}
          onItemPressed={handleLocationSelected}
          scrollEnabled={false}
        />
      </ScrollableSheetContainer>
    </BaseActionSheet>
  );
};

export default LocationsSheet;
