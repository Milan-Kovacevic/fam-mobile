import { Button } from "@/components/ui/Button";
import {
  $horizontalPaddingClassName,
  SafeScreen,
} from "@/components/ui/Screen";
import React, { useState } from "react";
import { useColorScheme, View } from "react-native";
import RadioGroup from "@/components/ui/RadioGroup";
import translate, { i18n } from "@/i18n";
import { reloadAppAsync } from "expo";
import { cn } from "@/utils/tw";
import SettingsHeading from "@/components/screens/settings/SettingsHeading";
import { clearDatabase } from "@/storage/StorageProvider";
import { useSQLiteContext } from "expo-sqlite";
import { showToast } from "@/utils/toast";

export default function SettingsScreen() {
  const [language, setLanguage] = useState<string>(i18n.locale);
  const [key, setKey] = useState(0);
  const db = useSQLiteContext();
  const scheme = useColorScheme();

  async function handleChangeSettings(id: string) {
    i18n.locale = id;
    setLanguage(id);
    await reloadAppAsync();
  }

  async function handleClearData() {
    clearDatabase(db).then((_) => {
      showToast(translate("settings.clearedDataMessage"), scheme);
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
        key={key}
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
            title={translate("settings.displayLanguageLabel")}
            options={[
              {
                id: "en",
                value: "en",
                label: translate("settings.displayLanguageEn"),
              },
              {
                id: "sr",
                value: "sr",
                label: translate("settings.displayLanguageSr"),
              },
            ]}
          />
          <Button
            variant="primary"
            text={translate("settings.clearDataLabel")}
            onPressed={handleClearData}
            className="mt-6 flex-1"
            loading={false}
          />
        </View>
      </View>
    </SafeScreen>
  );
}
