import { useColorScheme, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Screen } from "@/components/ui/Screen";
import ManageAssetForm, {
  AssetForm,
} from "@/components/screens/assets/ManageAssetForm";
import { useSQLiteContext } from "expo-sqlite";
import { delay } from "@/utils/util";
import { createAsset } from "@/storage/repositories/assets-repository";
import { router, useLocalSearchParams } from "expo-router";
import { showToast } from "@/utils/toast";

const CreateAssetScreen = () => {
  const db = useSQLiteContext();
  const { scan } = useLocalSearchParams();
  const scheme = useColorScheme();
  const [loading, setLoading] = useState(false);

  async function handleAssetSubmitted(formData: AssetForm) {
    setLoading(true);
    await delay(750);
    createAsset(db, {
      ...formData,
      employeeId: formData.employee.id,
      locationId: formData.location.id,
      dateCreated: new Date().getUTCMilliseconds(),
    })
      .then((data) => {
        router.push("/assets");
      })
      .catch((err) => {
        showToast("Unable to create asset. Try again later.", scheme);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Screen
      className="h-full w-full px-3 my-4 mt-2.5 mb-6 pb-0"
      variant="scroll"
    >
      <View className="px-2 flex-1">
        <ManageAssetForm
          scanCode={scan != undefined}
          loading={loading}
          onSubmit={handleAssetSubmitted}
        />
      </View>
    </Screen>
  );
};

export default CreateAssetScreen;
