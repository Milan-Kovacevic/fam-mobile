import { View, Modal } from "react-native";
import React, { useEffect, useState } from "react";
import { BarcodeScanningResult, Camera, CameraView } from "expo-camera";
import { Text } from "@/components/ui/Text";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextField } from "@/components/ui/TextField";
import { useTranslation } from "react-i18next";

type BarCodeScannerProps = {
  onBarCodeRead: (data: string) => void;
  onCanceled: () => void;
};

const BarCodeScanner = (props: BarCodeScannerProps) => {
  const { onBarCodeRead, onCanceled } = props;
  const { t } = useTranslation();
  const [hasPermission, setHasPermission] = useState(true);
  const [barcode, setBarcode] = useState<string>();

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status == "granted");
    })();
  }, []);

  if (!hasPermission)
    return (
      <View>
        <Text variant="heading">{t("modals.barCodeNoPermission")}</Text>
      </View>
    );

  function handleBarCodeScanned(scanningResult: BarcodeScanningResult) {
    setBarcode(scanningResult.data);
  }

  function handleBarCodeAccepted() {
    if (barcode) onBarCodeRead(barcode);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      className="justify-center items-center border border-red-50"
    >
      <SafeAreaView className="bg-primary-50 dark:bg-primary-950 w-full h-full pt-0">
        <View className="flex-row mt-4 px-5 mb-2.5 justify-between">
          <View className="flex-row items-center">
            <Icon
              icon="barcode-outline"
              variant="ionicon"
              className="text-3xl ml-1"
            />
            <Text className="ml-2" variant="heading">
              {t("modals.barCodeTitle")}
            </Text>
          </View>
          <Button
            variant="ghost"
            LeftAccessory={() => (
              <Icon
                icon={"close"}
                variant={"ionicon"}
                className="text-2xl text-neutral-800 dark:text-neutral-200"
              />
            )}
            className="p-2 py-1 self-end rounded-full z-20"
            onPressed={onCanceled}
          />
        </View>
        <View className="p-5 py-0 mb-2.5 flex-row">
          <TextField
            readonly={true}
            text={barcode ?? ""}
            placeholder={t("modals.formBarCodePlaceholder")}
            title={t("modals.formBarCodeLabel")}
            className="flex-1"
          />
          <Button
            variant="ghost"
            LeftAccessory={() => (
              <Icon
                icon={"checkcircle"}
                variant={"antdesign"}
                className="text-2xl text-primary-500 dark:text-primary-500"
              />
            )}
            className="p-2.5 py-1.5 self-end rounded-full z-20"
            onPressed={handleBarCodeAccepted}
          />
        </View>
        <View className="w-full flex-1 items-stretch justify-end p-5 pt-2 pb-6">
          <View className="rounded-2xl overflow-hidden">
            <CameraView
              facing={"back"}
              className="z-10 w-full h-full self-center items-center justify-center "
              //   barcodeScannerSettings={{
              //     barcodeTypes: ["upc_a", "upc_e", "qr", "codabar", ],
              //   }}
              onBarcodeScanned={handleBarCodeScanned}
            >
              <View className="border-2 border-neutral-600 dark:border-neutral-400 rounded-2xl flex-1 w-full" />
            </CameraView>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default BarCodeScanner;
