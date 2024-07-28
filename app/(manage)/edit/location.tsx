import React, { useEffect, useState } from "react";
import { Screen } from "@/components/ui/Screen";
import { useColorScheme, View } from "react-native";
import {
  getLocationById,
  updateLocation,
} from "@/storage/repositories/locations-repository";
import { useSQLiteContext } from "expo-sqlite";
import { router, useLocalSearchParams } from "expo-router";
import { LocationDTO } from "@/storage/models/locations";
import ManageLocationHeading from "@/components/screens/locations/ManageLocationHeading";
import ManageLocationForm, {
  LocationForm,
} from "@/components/screens/locations/ManageLocationForm";
import { delay } from "@/utils/util";
import { showToast } from "@/utils/toast";
import { useTranslation } from "react-i18next";

const EditLocationScreen = () => {
  const { t } = useTranslation();
  const db = useSQLiteContext();
  const { id } = useLocalSearchParams();
  const [locationId, setLocationId] = useState<number>();
  const [location, setLocation] = useState<LocationDTO | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const scheme = useColorScheme();

  useEffect(() => {
    if (id == undefined) {
      router.push("/locations");
      return;
    }
    var routeId = parseInt(id[0]);
    if (isNaN(routeId)) {
      router.push("/locations");
      return;
    }
    setLocationId(routeId);
    setLoading(true);
    getLocationById(db, routeId)
      .then((result) => {
        if (result == null) {
          showToast(t("locations.notFoundError"), scheme);
          router.push("/locations");
          return;
        }
        setLocation(result);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  async function handleLocationSubmitted(formData: LocationForm) {
    setLoading(true);
    await delay(750);
    updateLocation(db, {
      id: locationId!,
      name: formData.name,
      ...formData.coordinates,
    })
      .then((isSuccess) => {
        if (isSuccess) router.push("/locations");
        else {
          showToast(t("locations.updateError"), scheme);
        }
      })
      .catch((err) => {
        showToast(t("locations.duplicateError"), scheme);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Screen className="h-full w-full px-3 py-4 mt-6" variant="scroll">
      <View className="px-2">
        <ManageLocationHeading
          className="mb-6"
          text={t("locations.editDescription")}
        />
        {location && (
          <ManageLocationForm
            loading={loading}
            location={location}
            onSubmit={handleLocationSubmitted}
          />
        )}
      </View>
    </Screen>
  );
};

export default EditLocationScreen;
