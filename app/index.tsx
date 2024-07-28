import React from "react";
import { SafeScreen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";
import { View } from "react-native";
import LandingDashboard from "@/components/screens/landing/LandingDashboard";

import LandingFooter from "@/components/screens/landing/LandingFooter";
import LandingHeading from "@/components/screens/landing/LandingHeading";
import LandingActions from "@/components/screens/landing/LandingActions";
import { useTranslation } from "react-i18next";

const LandingScreen = () => {
  const { t } = useTranslation();

  return (
    <SafeScreen
      className="p-3 h-[80vh] w-full"
      variant="fixed"
      contentContainerClassName="h-full"
    >
      <LandingHeading />
      <View className="mt-4 mx-4 mb-3">
        <LandingActions />
      </View>

      <View className="flex-1 w-full px-2 my-2 mb-0 mt-5 items-center">
        <Text className="text-xl font-pbold text-center tracking-tight pt-2 pb-0.5 text-neutral-800 dark:text-neutral-200">
          {t("landing.dashboard")}
        </Text>
        <LandingDashboard />
      </View>

      <LandingFooter />
    </SafeScreen>
  );
};

export default LandingScreen;
