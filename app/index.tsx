import React from "react";
import { router } from "expo-router";
import { SafeScreen } from "@/components/ui/Screen";
import { Text } from "@/components/ui/Text";
import { Image, useColorScheme, View } from "react-native";
import LandingDashboard from "@/components/LandingDashboard";
import logoLight from "@/assets/images/logo-light.png";
import logoDark from "@/assets/images/logo-dark.png";
import { Button } from "@/components/ui/Button";

const WelcomeScreen = () => {
  function handleGoToMainPage() {
    router.push("/locations");
  }

  return (
    <SafeScreen
      className="p-4 pt-6 h-full w-full"
      variant="auto"
      ScrollViewProps={{ contentContainerStyle: { flex: 1 } }}
    >
      <LandingHeading />
      <View className="flex-1 w-full px-2 my-2 mt-2 mb-5 items-center">
        <Button
          text="Explore Now"
          className="mt-2 mx-4 mb-6"
          variant="primary-outline"
          onPressed={handleGoToMainPage}
        />
        <LandingDashboard />
      </View>
      <LandingFooter />
    </SafeScreen>
  );
};

export default WelcomeScreen;

const LandingHeading = () => {
  const scheme = useColorScheme();

  return (
    <View className="items-center gap-0 justify-start mt-2 mx-2">
      <View className="items-center gap-0">
        <Image
          source={scheme == "dark" ? logoDark : logoLight}
          resizeMode="contain"
          className="h-[100px] w-[180px]"
        />
        <Text className="text-xl font-pmedium text-center leading-5 tracking-tight pt-3 text-neutral-800 dark:text-neutral-200">
          <HeadingAccentLetter letter={"F"} />
          ixed <HeadingAccentLetter letter={"A"} />
          sset <HeadingAccentLetter letter={"M"} />
          anagement
        </Text>
      </View>
      <View className="items-center justify-center pl-1 w-full pt-1">
        <Text className="font-pregular text-sm text-neutral-500 dark:text-neutral-400 text-center leading-4">
          Manage and track your assets and expenses in one place
        </Text>
      </View>
    </View>
  );
};
const HeadingAccentLetter = ({ letter }: { letter: string }) => {
  return (
    <Text className="text-3xl font-pbold text-primary-400 leading-7 dark:text-primary">
      {letter}
    </Text>
  );
};

const LandingFooter = () => {
  return (
    <View className="self-end justify-end mt-4">
      <Text className="font-pmedium -mt-1 self-end uppercase text-xs text-neutral-500 dark:text-neutral-400">
        ETFBL - 2024
      </Text>
      <Text className="font-plight -mt-1 self-end italic text-xs text-neutral-500 dark:text-neutral-400">
        All rights reserved@
      </Text>
    </View>
  );
};
