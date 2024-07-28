import { View } from "react-native";
import React from "react";
import { Text } from "@/components/ui/Text";
import { useTranslation } from "react-i18next";

const LandingFooter = () => {
  const { t } = useTranslation();

  return (
    <View className="self-end justify-end">
      <Text className="font-pmedium -mt-1 self-end uppercase text-xs text-neutral-500 dark:text-neutral-400">
        {t("landing.footerAuthor")}
      </Text>
      <Text className="font-plight -mt-1 self-end italic text-xs text-neutral-500 dark:text-neutral-400">
        {t("landing.copyright")}
      </Text>
    </View>
  );
};

export default LandingFooter;
