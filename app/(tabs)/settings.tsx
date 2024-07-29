import { Button } from "@/components/ui/Button";
import {
  $horizontalPaddingClassName,
  SafeScreen,
} from "@/components/ui/Screen";
import React, { useEffect, useState } from "react";
import { useColorScheme, View } from "react-native";
import RadioGroup from "@/components/ui/RadioGroup";
import { reloadAppAsync } from "expo";
import { cn } from "@/utils/tw";
import SettingsHeading from "@/components/screens/settings/SettingsHeading";
import { clearDatabase } from "@/storage/StorageProvider";
import { useSQLiteContext } from "expo-sqlite";
import { showToast } from "@/utils/toast";
import { useTranslation } from "react-i18next";
import { SaveSettingsDTO } from "@/storage/models/settings";
import {
  getSettings,
  saveSettings,
} from "@/storage/repositories/settings-repository";
import { Text } from "@/components/ui/Text";
import { Icon } from "@/components/ui/Icon";

export default function SettingsScreen() {
  const { t, i18n } = useTranslation();
  const db = useSQLiteContext();
  const scheme = useColorScheme();

  const [language, setLanguage] = useState<string>(i18n.language);
  const [lastDataWipe, setLastDataWipe] = useState<string>();

  useEffect(() => {
    getSettings().then((data) => {
      setLanguage(data?.language ?? i18n.language);
      setLastDataWipe(data?.lastDataWipe);
    });
  }, []);

  async function handleChangeSettings(id: string) {
    var request: SaveSettingsDTO = {
      language: id,
    };
    await saveSettings(request);
    i18n.changeLanguage(id);
    setLanguage(id);
  }
  async function handleClearData() {
    clearDatabase(db).then(() => {
      var request: SaveSettingsDTO = {
        language: language,
        lastDataWipe: new Date().getTime().toString(),
      };
      saveSettings(request).finally(() => {
        showToast(t("settings.clearedDataMessage"), scheme);
      });
    });
    await reloadAppAsync();
  }

  return (
    <SafeScreen
      variant="auto"
      className="h-full w-full"
      contentContainerClassName="flex-1"
    >
      <View
        className={cn(
          "pt-3.5 mb-1.5 items-stretch flex-1",
          $horizontalPaddingClassName
        )}
      >
        <SettingsHeading />
        <View className="mx-0.5 mt-3">
          <RadioGroup
            selectedId={language}
            onSelectionChange={handleChangeSettings}
            title={t("settings.displayLanguageLabel")}
            options={[
              {
                id: "en",
                value: "en",
                label: t("settings.displayLanguageEn"),
              },
              {
                id: "sr",
                value: "sr",
                label: t("settings.displayLanguageSr"),
              },
            ]}
          />
        </View>
        <View className="mx-0.5 mt-3">
          <View className="flex-row items-center gap-1 mb-1.5">
            <Text className="font-pmedium text-base">
              {t("settings.factoryResetText")}
            </Text>
            <Icon
              icon="warning"
              variant="fontawesome"
              size={20}
              className="text-red-600 dark:text-red-400 pb-0.5"
            />
          </View>

          <Button
            variant="primary-outline"
            text={t("settings.clearDataLabel")}
            onPressed={handleClearData}
            className="w-auto self-stretch"
            textClassName="py-1.5 h-auto text-xs"
            loading={false}
          />
          <Text className="text-[11px] mx-1 my-1" variant="muted">
            {t("settings.lastDataWipeLabel")}:{" "}
            <Text className="text-xs font-pmedium">
              {lastDataWipe
                ? new Date(parseInt(lastDataWipe)).toLocaleString()
                : t("settings.neverLabel")}
            </Text>
          </Text>
        </View>
      </View>
    </SafeScreen>
  );
}
