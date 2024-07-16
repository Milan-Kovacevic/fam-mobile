import React, { useState } from "react";
import { Screen } from "@/components/ui/Screen";
import { useColorScheme, View } from "react-native";
import { createLocation } from "@/storage/repositories/locations-repository";
import { useSQLiteContext } from "expo-sqlite";
import { router } from "expo-router";
import ManageLocationHeading from "@/components/screens/locations/ManageLocationHeading";
import ManageLocationForm from "@/components/screens/locations/ManageLocationForm";
import { delay } from "@/utils/util";
import { showToast } from "@/utils/toast";

const CreateLocationScreen = () => {
  const db = useSQLiteContext();
  const scheme = useColorScheme();
  const [loading, setLoading] = useState(false);

  async function handleLocationSubmitted(formData: { name: string }) {
    setLoading(true);
    await delay(750);
    createLocation(db, { name: formData.name })
      .then((location) => {
        router.push("/locations");
      })
      .catch((err) => {
        showToast("Unable to create location. Possible duplicate name", scheme);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Screen className="h-full w-full px-4 py-4 mt-10" variant="scroll">
      <View className="px-2">
        <ManageLocationHeading text="Please enter the required data and press 'Submit' to create new location." />

        <ManageLocationForm
          loading={loading}
          onSubmit={handleLocationSubmitted}
        />
      </View>
    </Screen>
  );
};

export default CreateLocationScreen;
