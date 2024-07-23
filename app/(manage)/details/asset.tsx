import { useColorScheme, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeScreen } from "@/components/ui/Screen";
import { AssetDetailsDTO, AssetDTO } from "@/storage/models/assets";
import { router, useLocalSearchParams } from "expo-router";
import { getAssetDetails } from "@/storage/repositories/assets-repository";
import { useSQLiteContext } from "expo-sqlite";
import { showToast } from "@/utils/toast";
import AssetDetailsImage from "@/components/screens/assets/AssetDetailsImage";
import AssetDetailsInfo from "@/components/screens/assets/AssetDetailsInfo";
import HorizontalCarousel from "@/components/ui/HorizontalCarousel";
import AssetDetailsLocationMap from "@/components/screens/assets/AssetDetailsLocationMap";
import { SheetManager } from "react-native-actions-sheet";

const AssetDetailsScreen = () => {
  const db = useSQLiteContext();
  const scheme = useColorScheme();
  const { id } = useLocalSearchParams();
  const [asset, setAsset] = useState<AssetDetailsDTO | undefined>(undefined);
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

    setLoading(true);
    getAssetDetails(db, routeId)
      .then((result) => {
        if (result == null) {
          showToast("Asset was not found, try again later.", scheme);
          router.push("/assets");
          return;
        }
        setAsset({ ...result });
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function onOpenAssetsSheet() {
    SheetManager.show("assets-sheet", {
      payload: {
        onAssetSelected: handleAssetSelected,
        locationId: asset?.locationId,
      },
    });
  }

  function handleAssetSelected(asset?: AssetDTO) {
    router.push({ pathname: `/details/asset`, params: { id: asset?.id } });
    SheetManager.hide("assets-sheet");
  }

  return (
    <SafeScreen
      variant="fixed"
      className="h-full w-full"
      contentContainerClassName="flex-1"
    >
      <View className="mb-1.5 items-stretch h-full">
        <AssetDetailsImage asset={asset} />
        {asset && (
          <HorizontalCarousel
            className="mt-4"
            items={[
              () => <AssetDetailsInfo asset={asset} />,
              () => (
                <AssetDetailsLocationMap
                  asset={asset}
                  onPinPressed={onOpenAssetsSheet}
                />
              ),
            ]}
          />
        )}
      </View>
    </SafeScreen>
  );
};

export default AssetDetailsScreen;
