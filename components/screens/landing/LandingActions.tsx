import { View } from "react-native";
import React from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { router } from "expo-router";

const LandingActions = () => {
  function handleGoToMainPage() {
    router.push("/assets");
  }

  return (
    <View className="flex-row gap-1.5 items-center justify-center">
      <Button
        text="Scan Now"
        className="self-center py-0"
        variant="primary-outline"
        onPressed={handleGoToMainPage}
        textClassName="pt-2 px-0 text-sm pb-1.5 text-[12px]"
        LeftAccessory={() => (
          <Icon
            icon="qr-code-scanner"
            variant="material"
            className="mr-1.5 text-xl text-gray-600 dark:text-gray-300"
          />
        )}
      />

      <Button
        text="Create List"
        className="self-center py-0"
        variant="secondary-outline"
        onPressed={handleGoToMainPage}
        textClassName="pt-2 px-0 text-sm pb-1.5 text-[12px]"
        LeftAccessory={() => (
          <Icon
            icon="add-to-list"
            variant="entypo"
            className="mr-1.5 text-xl text-gray-600 dark:text-gray-300"
          />
        )}
      />
    </View>
  );
};

export default LandingActions;
