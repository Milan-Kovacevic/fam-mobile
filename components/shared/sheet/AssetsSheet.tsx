import React from "react";
import { SheetProps } from "react-native-actions-sheet";
import BaseActionSheet from "./BaseActionSheet";
import { useSQLiteContext } from "expo-sqlite";
import useReadonlyList from "@/hooks/useReadonlyList";
import { Text } from "@/components/ui/Text";
import ScrollableSheetContainer from "./ScrollableSheetContainer";
import { AssetDTO } from "@/storage/models/assets";
import { getAssetsByLocation } from "@/storage/repositories/assets-repository";
import AssetsList from "@/components/screens/assets/AssetsList";

const AssetsSheet = (props: SheetProps<"assets-sheet">) => {
  const { payload } = props;
  const db = useSQLiteContext();
  const { loading, listData: assets } = useReadonlyList<AssetDTO>({
    fetchData: fetchAssets,
  });

  async function fetchAssets() {
    const result = await getAssetsByLocation(db, payload?.locationId ?? 0);
    return result;
  }

  function handleAssetSelected(id: number) {
    var asset = assets.find((x) => x.id == id);
    payload?.onAssetSelected(asset);
  }

  return (
    <BaseActionSheet>
      <Text variant="neutral" className="mx-2 mb-2 text-base text-center">
        Assets on this location
      </Text>
      <ScrollableSheetContainer>
        <AssetsList
          className="mt-1 pt-0 flex-1"
          readonly={true}
          pressable={true}
          assets={assets}
          loading={loading}
          onItemPressed={handleAssetSelected}
          scrollEnabled={false}
        />
      </ScrollableSheetContainer>
    </BaseActionSheet>
  );
};

export default AssetsSheet;
