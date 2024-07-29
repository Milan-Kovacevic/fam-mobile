import { useColorScheme, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Screen } from "@/components/ui/Screen";
import { useSQLiteContext } from "expo-sqlite";
import { router, useLocalSearchParams } from "expo-router";

import ManageRegistrarHeading from "@/components/screens/registrar/ManageRegistrarHeading";
import ManageRegistrarForm, {
  RegistrarItemFormType,
} from "@/components/screens/registrar/ManageRegistrarForm";
import { getAssetDetailsByBarcode } from "@/storage/repositories/assets-repository";
import { showToast } from "@/utils/toast";
import { addAssetListItem } from "@/storage/repositories/asset-list-repository";
import { addInventoryListItem } from "@/storage/services/registrar-service";
import { AddAssetListItemDTO } from "@/storage/models/asset-lists";
import { useTranslation } from "react-i18next";

const CreateAssetListItemScreen = () => {
  const { t } = useTranslation();
  const db = useSQLiteContext();
  const { scan, id } = useLocalSearchParams();
  const [listId, setListId] = useState<number>();
  const scheme = useColorScheme();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id == undefined) {
      router.back();
      return;
    }
    var routeId = parseInt(id[0]);
    if (isNaN(routeId)) {
      router.back();
      return;
    }
    setListId(routeId);
  }, []);

  async function handleRegistrarItemSubmitted(formData: RegistrarItemFormType) {
    if (!listId) return;

    setLoading(true);
    var request: AddAssetListItemDTO = {
      listId: listId!,
      assetId: formData.asset.id,
      previousLocationId: formData.previousLocation.id,
      currentLocationId: formData.isSameLocation
        ? formData.previousLocation.id
        : formData.currentLocation?.id!,
      previousEmployeeId: formData.previousEmployee.id,
      currentEmployeeId: formData.isSameEmployee
        ? formData.previousEmployee.id
        : formData.currentEmployee?.id!,
    };
    addInventoryListItem(db, request)
      .then(() => {
        router.push("/registrar");
      })
      .catch(() => {
        showToast(t("registrar.createListItemError"), scheme);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  async function handleBarcodeScanned(code: string) {
    var asset = await getAssetDetailsByBarcode(db, code);
    if (!asset)
      showToast(t("registrar.invalidBarcodeError", { code: code }), scheme);
    return asset;
  }

  return (
    <Screen
      className="h-full w-full px-3 my-4 mt-2.5 mb-6 pb-0"
      variant="scroll"
    >
      <View className="px-2 flex-1">
        <ManageRegistrarHeading
          className="mb-6"
          text={t("registrar.createDescription")}
        />
        <ManageRegistrarForm
          scanCode={scan != undefined}
          loading={loading}
          onSubmit={handleRegistrarItemSubmitted}
          onBarcodeScanned={handleBarcodeScanned}
        />
      </View>
    </Screen>
  );
};

export default CreateAssetListItemScreen;
