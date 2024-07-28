import { Button } from "@/components/ui/Button";
import {
  $horizontalPaddingClassName,
  SafeScreen,
} from "@/components/ui/Screen";
import React, { useState } from "react";
import { useColorScheme, View } from "react-native";
import RadioGroup from "@/components/ui/RadioGroup";
import { reloadAppAsync } from "expo";
import { cn } from "@/utils/tw";
import SettingsHeading from "@/components/screens/settings/SettingsHeading";
import { clearDatabase } from "@/storage/StorageProvider";
import { useSQLiteContext } from "expo-sqlite";
import { showToast } from "@/utils/toast";
import { useTranslation } from "react-i18next";

export default function SettingsScreen() {
  const { t, i18n } = useTranslation();

  const [language, setLanguage] = useState<string>(i18n.language);
  const db = useSQLiteContext();
  const scheme = useColorScheme();

  async function handleChangeSettings(id: string) {
    i18n.changeLanguage(id);
    setLanguage(id);
  }
  async function handleClearData() {
    clearDatabase(db).then((_) => {
      showToast(t("settings.clearedDataMessage"), scheme);
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
          <Button
            variant="primary"
            text={t("settings.clearDataLabel")}
            onPressed={handleClearData}
            className="mt-6 flex-1"
            loading={false}
          />
        </View>
      </View>
    </SafeScreen>
  );
}
