import ActionSelect from "@/components/ui/RadioGroup";
import { Button } from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import { Icon } from "@/components/ui/Icon";
import { SafeScreen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";
import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import RadioGroup from "@/components/ui/RadioGroup";
import translate, { i18n } from "@/i18n";
import { reloadAppAsync } from "expo";

export default function SettingsScreen() {
  const [language, setLanguage] = useState<string>(i18n.locale);
  const [key, setKey] = useState(0);

  async function handleSaveSettings() {
    i18n.locale = language;
    await reloadAppAsync();
    setKey((prevKey) => prevKey + 1);
  }

  return (
    <SafeScreen
      variant="auto"
      className="h-full w-full p-3 py-4"
      contentContainerClassName="flex-1"
    >
      <View key={key}>
        <View className="mx-2">
          <View className="flex-1 flex-row w-full items-center gap-2 -ml-px justify-start">
            <Icon
              icon="gear"
              variant="fontawesome"
              className="text-xl mt-0.5 text-neutral-800 dark:text-neutral-200"
            />
            <Text className="text-2xl font-psemibold tracking-tighter pt-0.5">
              {translate("settings.title")}
            </Text>
          </View>
          <Text className="font-pregular text-xs text-neutral-500 dark:text-neutral-400 text-left leading-5 mt-px">
            {translate("settings.description")}
          </Text>
          <View className="h-px my-2.5 flex-1 bg-neutral-400/30 dark:bg-neutral-700/30" />
        </View>
        <View className="mx-2.5 mt-3">
          <RadioGroup
            selectedId={language}
            onSelectionChange={setLanguage}
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
            variant="secondary"
            text={translate("settings.saveChangesLabel")}
            onPressed={handleSaveSettings}
            className="mt-6"
            loading={false}
          />
        </View>
      </View>
    </SafeScreen>
  );
}
