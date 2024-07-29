import { useColorScheme, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Screen } from "@/components/ui/Screen";
import { useSQLiteContext } from "expo-sqlite";
import { delay } from "@/utils/util";
import { router, useLocalSearchParams } from "expo-router";

import ManageRegistrarHeading from "@/components/screens/registrar/ManageRegistrarHeading";
import ManageRegistrarForm, {
  RegistrarItemFormType,
} from "@/components/screens/registrar/ManageRegistrarForm";
import { getAssetDetailsByBarcode } from "@/storage/repositories/assets-repository";
import { showToast } from "@/utils/toast";
import {
  getInventoryListItemDetails,
  updateInventoryListItem,
} from "@/storage/services/registrar-service";
import { AssetListItemDTO } from "@/storage/models/asset-lists";
import { useTranslation } from "react-i18next";

const EditAssetListItemScreen = () => {
  const { t } = useTranslation();
  const db = useSQLiteContext();
  const { id } = useLocalSearchParams();
  const [itemId, setItemId] = useState<number>();
  const [inventoryList, setInventoryList] = useState<AssetListItemDTO>();
  const [registrarItem, setRegistrarItem] = useState<RegistrarItemFormType>();
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
    setItemId(routeId);
    setLoading(true);
    getInventoryListItemDetails(db, routeId)
      .then((result) => {
        if (result == null) {
          showToast(t("registrar.itemNotFoundError"), scheme);
          router.push("/registrar");
          return;
        }
        setInventoryList(result);
        setRegistrarItem({
          asset: {
            id: result.assetId,
            label: result.assetName,
          },
          previousLocation: {
            id: result.previousLocationId,
            label: result.previousLocationName,
          },
          currentLocation: {
            id: result.currentLocationId,
            label: result.currentLocationName,
          },
          previousEmployee: {
            id: result.previousEmployeeId,
            label: result.previousEmployeeName,
          },
          currentEmployee: {
            id: result.currentEmployeeId,
            label: result.currentEmployeeName,
          },
          isSameLocation: result.currentLocationId == result.previousLocationId,
          isSameEmployee: result.currentEmployeeId == result.previousEmployeeId,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  async function handleRegistrarItemSubmitted(formData: RegistrarItemFormType) {
    if (!itemId || !inventoryList?.listId) return;

    setLoading(true);
    await delay(750);
    updateInventoryListItem(db, {
      id: itemId,
      listId: inventoryList?.listId,
      assetId: formData.asset.id,
      previousLocationId: formData.previousLocation.id,
      currentLocationId: formData.isSameLocation
        ? formData.previousLocation.id
        : formData.currentLocation?.id!,
      previousEmployeeId: formData.previousEmployee.id,
      currentEmployeeId: formData.isSameEmployee
        ? formData.previousEmployee.id
        : formData.currentEmployee?.id!,
    })
      .then(() => {
        router.push("/registrar");
      })
      .catch(() => {
        showToast(t("registrar.updateListItemError"), scheme);
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
          text={t("registrar.editDescription")}
        />
        {registrarItem && (
          <ManageRegistrarForm
            registrarItem={registrarItem}
            loading={loading}
            onSubmit={handleRegistrarItemSubmitted}
            onBarcodeScanned={handleBarcodeScanned}
          />
        )}
      </View>
    </Screen>
  );
};

export default EditAssetListItemScreen;
