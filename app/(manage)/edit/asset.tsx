import { useColorScheme, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Screen } from "@/components/ui/Screen";
import ManageAssetForm, {
  AssetForm,
} from "@/components/screens/assets/ManageAssetForm";
import { useSQLiteContext } from "expo-sqlite";
import { delay } from "@/utils/util";
import { getAssetDetails } from "@/storage/repositories/assets-repository";
import { router, useLocalSearchParams } from "expo-router";
import { showToast } from "@/utils/toast";
import { useTranslation } from "react-i18next";
import { updateFixedAsset } from "@/storage/services/assets-service";

const EditAssetScreen = () => {
  const { t } = useTranslation();
  const db = useSQLiteContext();
  const scheme = useColorScheme();
  const { id } = useLocalSearchParams();
  const [assetId, setAssetId] = useState<number>();
  const [asset, setAsset] = useState<AssetForm | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id == undefined) {
      router.push("/assets");
      return;
    }
    var routeId = parseInt(id[0]);
    if (isNaN(routeId)) {
      router.push("/assets");
      return;
    }
    setAssetId(routeId);
    setLoading(true);
    getAssetDetails(db, routeId)
      .then((result) => {
        if (result == null) {
          showToast(t("assets.notFoundError"), scheme);
          router.push("/assets");
          return;
        }

        setAsset({
          ...result,
          employee: { id: result.employeeId, label: result.employeeName },
          location: { id: result.locationId, label: result.locationName },
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  async function handleAssetSubmitted(formData: AssetForm) {
    setLoading(true);
    await delay(750);
    updateFixedAsset(db, {
      id: assetId!,
      ...formData,
      employeeId: formData.employee.id,
      locationId: formData.location.id,
    })
      .then((data) => {
        router.push("/assets");
      })
      .catch((err) => {
        showToast(t("assets.updateError"), scheme);
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
        {asset && (
          <ManageAssetForm
            asset={asset}
            loading={loading}
            onSubmit={handleAssetSubmitted}
          />
        )}
      </View>
    </Screen>
  );
};

export default EditAssetScreen;
