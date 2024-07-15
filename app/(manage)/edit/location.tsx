import React, { useState } from "react";
import { Screen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";
import { ToastAndroid, View } from "react-native";
import FormField from "@/components/ui/FormField";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { createLocation } from "@/storage/repositories/locations-repository";
import { useSQLiteContext } from "expo-sqlite";
import { router } from "expo-router";

const EditLocationScreen = () => {
  const db = useSQLiteContext();
  const [locationForm, setLocationForm] = useState({
    name: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string }>({
    name: undefined,
  });

  function handleChangeLocationName(text: string) {
    setLocationForm({ ...locationForm, name: text });
  }

  async function handleLocationSubmitted() {
    setErrors({ name: undefined });
    if (locationForm.name.trim() == "") {
      setErrors({ ...errors, name: "Name cannot be empty" });
      return;
    }

    setLoading(true);
    createLocation(db, { name: locationForm.name })
      .then((location) => {
        router.push("/locations");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Screen className="h-full w-full px-4 py-4 mt-10" variant="scroll">
      <View className="px-2">
        <View className="flex-col mx-4 mb-6 items-center justify-center">
          <Icon
            icon="map-signs"
            variant="fontawesome"
            className="text-primary-400 dark:text-primary"
            size={60}
          />
          <Text className="mt-3 text-center" variant="muted">
            Please enter the required data and press 'Submit' to create new
            location.
          </Text>
        </View>

        <FormField
          title={"Location name"}
          text={locationForm.name}
          handleChangeText={handleChangeLocationName}
          handleSubmitted={handleLocationSubmitted}
          placeholder="ex. Banja Luka"
          returnKeyType="done"
          error={errors.name}
        />
        <Button
          variant="secondary"
          text="Submit"
          onPressed={handleLocationSubmitted}
          className="mt-4"
          loading={loading}
        />
      </View>
    </Screen>
  );
};

export default EditLocationScreen;
